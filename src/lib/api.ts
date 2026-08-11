// lib/api.ts - API utilities and helpers

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, PaginatedResponse } from './types';
import { initSentry, captureException } from '@/lib/sentry';

initSentry();

// ===== Success Responses =====

export function successResponse<T>(
    data: T,
    message = 'Success',
    statusCode = 200
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
            timestamp: new Date(),
        },
        { status: statusCode }
    );
}

export function createdResponse<T>(
    data: T,
    message = 'Created successfully'
): NextResponse<ApiResponse<T>> {
    return successResponse(data, message, 201);
}

// ===== Paginated Response =====

export function paginatedResponse<T>(
    data: T,
    total: number,
    page: number,
    pageSize: number,
    message = 'Success'
): NextResponse<PaginatedResponse<T>> {
    const hasMore =
        (page - 1) * pageSize +
        (Array.isArray(data) ? data.length : 0) <
        total;

    return NextResponse.json({
        success: true,
        data,
        total,
        page,
        pageSize,
        hasMore,
        message,
        timestamp: new Date(),
    });
}
// ===== Error Responses =====

export function errorResponse(
    message: string,
    statusCode = 400,
    error?: any
): NextResponse<ApiResponse<null>> {
    if (process.env.NODE_ENV === 'development' && error) {
        console.error('API Error:', error);
    }

    return NextResponse.json(
        {
            success: false,
            data: null,
            error: error?.message || message,
            message,
            timestamp: new Date(),
        },
        { status: statusCode }
    );
}

export function badRequestResponse(message: string): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 400);
}

export function unauthorizedResponse(message = 'Unauthorized'): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 401);
}

export function forbiddenResponse(message = 'Forbidden'): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 403);
}

export function notFoundResponse(message = 'Not found'): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 404);
}

export function conflictResponse(message = 'Conflict'): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 409);
}

export function internalErrorResponse(
    message = 'Internal server error',
    error?: any
): NextResponse<ApiResponse<null>> {
    return errorResponse(message, 500, error);
}

// ===== Request Parsing =====

export async function getJsonBody<T>(request: NextRequest): Promise<T> {
    try {
        return await request.json();
    } catch (error) {
        throw new Error('Invalid JSON in request body');
    }
}

export function getSearchParams(request: NextRequest) {
    return request.nextUrl.searchParams;
}

export function getPaginationParams(request: NextRequest) {
    const searchParams = getSearchParams(request);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));

    return { page, limit, skip: (page - 1) * limit };
}

// ===== Authentication Helpers =====

export function getAuthHeader(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice(7);
}

export function requireAuth(request: NextRequest): string {
    const token = getAuthHeader(request);
    if (!token) throw new Error('Unauthorized');
    return token;
}

// ===== CORS Headers =====

export function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

// ===== Query Utilities =====

export async function parseQueryParams(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const params: Record<string, any> = {};
    for (const [key, value] of searchParams) {
        if (value === 'true') params[key] = true;
        else if (value === 'false') params[key] = false;
        else if (!isNaN(Number(value))) params[key] = Number(value);
        else params[key] = value;
    }

    return params;
}

// ===== Error Handler =====

export async function handleApiError(error: any) {
    console.error('API Error:', error);
    try { captureException(error); } catch (_) {}

    if (error.message === 'Unauthorized') {
        return unauthorizedResponse();
    }

    if (error.message === 'Forbidden') {
        return forbiddenResponse();
    }

    if (error.message === 'Not found') {
        return notFoundResponse();
    }

    if (error.name === 'ZodError') {
        return badRequestResponse(
            error.errors?.[0]?.message || 'Validation error'
        );
    }

    if (error.code === 'P2025') {
        return notFoundResponse('Resource not found');
    }

    if (error.code === 'P2002') {
        return conflictResponse('This resource already exists');
    }

    return internalErrorResponse('An unexpected error occurred', error);
}

// ===== Rate Limiting Helpers =====

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
    identifier: string,
    limit: number = 60,
    windowMs: number = 60000
): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (record.count >= limit) {
        return false;
    }

    record.count++;
    return true;
}

export function rateLimitResponse(retryAfter = 60) {
    return NextResponse.json(
        { error: 'Too many requests' },
        {
            status: 429,
            headers: { 'Retry-After': String(retryAfter) },
        }
    );
}

// ===== File Upload Helpers =====

export function validateFileUpload(
    file: File,
    maxSize: number = 10 * 1024 * 1024,
    allowedTypes: string[] = ['application/pdf', 'image/jpeg', 'image/png']
): { valid: boolean; error?: string } {
    if (file.size > maxSize) {
        return { valid: false, error: `File size exceeds ${maxSize / 1024 / 1024}MB limit` };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'File type not allowed' };
    }

    return { valid: true };
}

// ===== Logging =====

export function logApiCall(
    method: string,
    path: string,
    statusCode: number,
    duration: number
) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[${method}] ${path} - ${statusCode} (${duration}ms)`);
    }
}

// ===== Email Helpers =====

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
}

// ===== URL Helpers =====

export function buildAbsoluteUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
}

export function generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

// ===== Webhook Helpers =====

export async function verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
): Promise<boolean> {
    const crypto = await import('crypto');
    const hash = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    return hash === signature;
}

// ===== Type Guard =====

export function isApiResponse<T>(obj: any): obj is ApiResponse<T> {
    return obj && typeof obj === 'object' && 'success' in obj && 'timestamp' in obj;
}
