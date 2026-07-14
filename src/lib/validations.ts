// lib/validations.ts - Zod validation schemas

import { z } from 'zod';
import { VISA_TYPES, DOCUMENT_TYPES } from './constants';

// ===== User Schemas =====

export const userProfileSchema = z.object({
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),
    nationality: z.string().optional(),
    languagesSpoken: z.array(z.string()).optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// ===== Application Schemas =====

export const createApplicationSchema = z.object({
    visaType: z.enum(['STUDENT', 'WORK', 'FAMILY', 'SKILLED_MIGRATION', 'BUSINESS', 'TOURIST', 'PERMANENT_RESIDENCY', 'TEMPORARY']),
    country: z.string().min(2, 'Country is required'),
    targetDeadline: z.coerce.date().optional(),
    notes: z.string().optional(),
});

export type CreateApplication = z.infer<typeof createApplicationSchema>;

export const updateApplicationSchema = z.object({
    status: z.enum(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PROCESSING', 'COMPLETED', 'CANCELLED']).optional(),
    notes: z.string().optional(),
    currentStep: z.number().min(1).optional(),
    progressPercentage: z.number().min(0).max(100).optional(),
});

export type UpdateApplication = z.infer<typeof updateApplicationSchema>;

// ===== Document Schemas =====

export const uploadDocumentSchema = z.object({
    type: z.enum([
        'PASSPORT', 'BIRTH_CERTIFICATE', 'MARRIAGE_CERTIFICATE', 'DIVORCE_CERTIFICATE',
        'CV', 'COVER_LETTER', 'ACADEMIC_CERTIFICATE', 'WORK_EXPERIENCE_LETTER',
        'BANK_STATEMENT', 'ADMISSION_LETTER', 'EMPLOYMENT_OFFER', 'POLICE_CLEARANCE',
        'MEDICAL_CERTIFICATE', 'VACCINATION_CERTIFICATE', 'POLICE_REPORT',
        'SCHOOL_CERTIFICATE', 'TRANSCRIPT', 'DEGREE', 'DIPLOMA', 'OTHER'
    ]),
    fileName: z.string().min(1),
    fileSize: z.number().max(10 * 1024 * 1024, 'File must be less than 10MB'),
    mimeType: z.string(),
    expiryDate: z.coerce.date().optional(),
});

export type UploadDocument = z.infer<typeof uploadDocumentSchema>;

// ===== Appointment Schemas =====

export const createAppointmentSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional(),
    scheduledAt: z.coerce.date().refine(
        (date) => date > new Date(),
        'Appointment must be in the future'
    ),
    duration: z.number().min(15).max(240).default(30),
    meetingType: z.enum(['GOOGLE_MEET', 'ZOOM', 'IN_PERSON', 'PHONE']),
    meetingLink: z.string().url().optional(),
    location: z.string().optional(),
    notes: z.string().optional(),
});

export type CreateAppointment = z.infer<typeof createAppointmentSchema>;

// ===== Message Schemas =====

export const sendMessageSchema = z.object({
    conversationId: z.string().min(1),
    receiverId: z.string().min(1),
    content: z.string().min(1, 'Message cannot be empty').max(5000),
    attachmentUrl: z.string().url().optional(),
    attachmentName: z.string().optional(),
});

export type SendMessage = z.infer<typeof sendMessageSchema>;

// ===== Contact Form Schemas =====

export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Invalid phone number').optional(),
    subject: z.string().min(3, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    preferredCountry: z.string().optional(),
    visaType: z.string().optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// ===== Consultation Form Schemas =====

export const consultationFormSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10),
    targetCountry: z.string().min(2),
    visaType: z.string(),
    currentEducation: z.string().optional(),
    workExperience: z.string().optional(),
    budget: z.string().optional(),
    preferredDate: z.coerce.date(),
    additionalInfo: z.string().optional(),
});

export type ConsultationForm = z.infer<typeof consultationFormSchema>;

// ===== Newsletter Schema =====

export const newsletterSchema = z.object({
    email: z.string().email('Invalid email'),
    name: z.string().optional(),
});

export type Newsletter = z.infer<typeof newsletterSchema>;

// ===== Payment Schemas =====

export const createPaymentSchema = z.object({
    applicationId: z.string().min(1),
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().default('USD'),
    description: z.string().optional(),
    paymentMethod: z.enum(['STRIPE', 'PAYPAL', 'ORANGE_MONEY', 'MTN_MOMO']).optional(),
});

export type CreatePayment = z.infer<typeof createPaymentSchema>;

// ===== Pagination Schema =====

export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type Pagination = z.infer<typeof paginationSchema>;

// ===== Search Schema =====

export const searchSchema = z.object({
    query: z.string().min(1, 'Search query is required').max(100),
    type: z.enum(['BLOG', 'FAQ', 'SERVICE', 'COUNTRY', 'ALL']).default('ALL'),
    page: z.number().default(1),
    limit: z.number().default(10),
});

export type Search = z.infer<typeof searchSchema>;

// ===== Filter Schemas =====

export const applicationFilterSchema = z.object({
    status: z.enum(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PROCESSING', 'COMPLETED', 'CANCELLED']).optional(),
    country: z.string().optional(),
    visaType: z.string().optional(),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
});

export type ApplicationFilter = z.infer<typeof applicationFilterSchema>;

// ===== Settings Schema =====

export const updateSettingsSchema = z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    whatsappNotifications: z.boolean().default(false),
    language: z.enum(['en', 'fr', 'de', 'es', 'it', 'ar']),
    timezone: z.string().optional(),
    twoFactorEnabled: z.boolean().default(false),
});

export type UpdateSettings = z.infer<typeof updateSettingsSchema>;

// ===== Password Schema =====

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type PasswordChange = z.infer<typeof passwordSchema>;

// ===== Admin Schemas =====

export const createBlogPostSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    content: z.string().min(100),
    excerpt: z.string().min(20),
    category: z.string(),
    featured_image: z.string().url().optional(),
});

export type CreateBlogPost = z.infer<typeof createBlogPostSchema>;

export const updateCountrySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    visaTypes: z.array(z.string()).optional(),
    processingTime: z.string().optional(),
    costOfLiving: z.string().optional(),
    averageSalary: z.string().optional(),
    universities: z.number().optional(),
    employers: z.number().optional(),
});

export type UpdateCountry = z.infer<typeof updateCountrySchema>;
