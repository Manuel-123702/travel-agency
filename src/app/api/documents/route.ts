import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import {
  successResponse,
  createdResponse,
  unauthorizedResponse,
  badRequestResponse,
  handleApiError,
  paginatedResponse,
  getPaginationParams,
} from "@/lib/api";

// GET /api/documents
export async function GET(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const { searchParams } = request.nextUrl;

    const applicationId = searchParams.get("applicationId");

    const { page, limit, skip } = getPaginationParams(request);

    const where = applicationId
      ? {
          userId: user.id,
          applicationId,
        }
      : {
          userId: user.id,
        };

    const [documents, total] = await Promise.all([
      db.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      db.document.count({
        where,
      }),
    ]);

    if (applicationId) {
      return successResponse(documents);
    }

    return paginatedResponse(documents, total, page, limit);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/documents
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const body = await request.json();

    const { fileUrl, fileName, fileSize, mimeType, type, applicationId } = body;

    if (!fileUrl || !fileName || !type) {
      return badRequestResponse("File URL, file name, and type are required.");
    }

    const document = await db.document.create({
      data: {
        userId: user.id,
        applicationId: applicationId || null,
        type: type as any,
        fileName,
        fileUrl,
        fileKey: fileUrl.split("/").pop() || fileName,
        fileSize,
        mimeType,
      },
    });

    await db.notification.create({
      data: {
        userId: user.id,
        title: "Document Uploaded",
        message: `${fileName} uploaded successfully.`,
        type: "DOCUMENT",
      },
    });

    return createdResponse(document, "Document uploaded successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
