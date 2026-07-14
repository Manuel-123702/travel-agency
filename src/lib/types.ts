// lib/types.ts - Complete type definitions for the immigration platform

// ===== User Types =====
export type UserRole = 'ADMIN' | 'STAFF' | 'CLIENT' | 'SUPER_ADMIN';

export interface User {
    id: string;
    clerkId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    id: string;
    userId: string;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
    dateOfBirth: Date | null;
    nationality: string | null;
    languagesSpoken: string[];
}

export interface StaffProfile {
    id: string;
    userId: string;
    department: string | null;
    position: string | null;
    specialization: string[];
    bio: string | null;
    officeNumber: string | null;
    availability: Record<string, any> | null;
}

// ===== Client Types =====
export interface Client {
    id: string;
    userId: string;
    referralCode: string | null;
    visaType: VisaType | null;
    targetCountry: string | null;
    applicationDeadline: Date | null;
}

export type VisaType =
    | 'STUDENT'
    | 'WORK'
    | 'FAMILY'
    | 'SKILLED_MIGRATION'
    | 'BUSINESS'
    | 'TOURIST'
    | 'PERMANENT_RESIDENCY'
    | 'TEMPORARY';

export type ApplicationStatus =
    | 'DRAFT'
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'APPROVED'
    | 'REJECTED'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'CANCELLED';

export interface Application {
    id: string;
    userId: string;
    visaType: VisaType;
    country: string;
    status: ApplicationStatus;
    appliedDate: Date | null;
    approvalDate: Date | null;
    completionDate: Date | null;
    rejectionReason: string | null;
    progressPercentage: number;
    currentStep: number;
    notes: string | null;
    internalNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// ===== Document Types =====
export type DocumentType =
    | 'PASSPORT'
    | 'BIRTH_CERTIFICATE'
    | 'MARRIAGE_CERTIFICATE'
    | 'DIVORCE_CERTIFICATE'
    | 'CV'
    | 'COVER_LETTER'
    | 'ACADEMIC_CERTIFICATE'
    | 'WORK_EXPERIENCE_LETTER'
    | 'BANK_STATEMENT'
    | 'ADMISSION_LETTER'
    | 'EMPLOYMENT_OFFER'
    | 'POLICE_CLEARANCE'
    | 'MEDICAL_CERTIFICATE'
    | 'VACCINATION_CERTIFICATE'
    | 'POLICE_REPORT'
    | 'SCHOOL_CERTIFICATE'
    | 'TRANSCRIPT'
    | 'DEGREE'
    | 'DIPLOMA'
    | 'OTHER';

export interface Document {
    id: string;
    userId: string;
    applicationId: string | null;
    type: DocumentType;
    fileName: string;
    fileUrl: string;
    fileKey: string;
    fileSize: number;
    mimeType: string;
    expiryDate: Date | null;
    isExpired: boolean;
    notes: string | null;
    uploadedAt: Date;
    updatedAt: Date;
}

// ===== Appointment Types =====
export type AppointmentStatus =
    | 'SCHEDULED'
    | 'CONFIRMED'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'NO_SHOW'
    | 'RESCHEDULED';

export interface Appointment {
    id: string;
    userId: string;
    applicationId: string | null;
    title: string;
    description: string | null;
    scheduledAt: Date;
    duration: number;
    status: AppointmentStatus;
    meetingType: string;
    meetingLink: string | null;
    location: string | null;
    notes: string | null;
    reminderSent: boolean;
    whatsappReminder: boolean;
    emailReminder: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ===== Messaging Types =====
export type MessageStatus = 'SENT' | 'DELIVERED' | 'SEEN';

export interface Conversation {
    id: string;
    participantIds: string[];
    subject: string | null;
    lastMessage: string | null;
    lastMessageAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    attachmentUrl: string | null;
    attachmentName: string | null;
    status: MessageStatus;
    seenAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

// ===== Notification Types =====
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'APPLICATION_UPDATE' | 'MESSAGE' | 'APPOINTMENT' | 'PAYMENT' | 'DOCUMENT';
    link: string | null;
    isRead: boolean;
    readAt: Date | null;
    createdAt: Date;
}

// ===== Payment Types =====
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface Payment {
    id: string;
    applicationId: string;
    userId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    stripePaymentId: string | null;
    stripeCustomerId: string | null;
    stripeInvoiceId: string | null;
    description: string | null;
    paymentMethod: string | null;
    paidAt: Date | null;
    refundedAt: Date | null;
    refundReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Invoice {
    id: string;
    applicationId: string;
    userId: string;
    paymentId: string | null;
    invoiceNumber: string;
    amount: number;
    currency: string;
    description: string | null;
    services: string[];
    issueDate: Date;
    dueDate: Date;
    paidDate: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// ===== Country Types =====
export interface Country {
    id: string;
    name: string;
    code: string;
    description: string | null;
    visaTypes: string[];
    requirements: string[];
    processingTime: string | null;
    featuredImageUrl: string | null;
    costOfLiving: string | null;
    averageSalary: string | null;
    universities: number;
    employers: number;
    successStories: number;
    isActive: boolean;
}

// ===== Analytics Types =====
export interface Statistic {
    id: string;
    key: string;
    value: string;
    description: string | null;
    updatedAt: Date;
}

export interface DailyAnalytics {
    id: string;
    date: Date;
    newUsers: number;
    newApplications: number;
    approvedApplications: number;
    totalMessages: number;
    totalPayments: number;
    createdAt: Date;
}

// ===== Audit Types =====
export type AuditAction =
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'VIEW'
    | 'APPROVE'
    | 'REJECT'
    | 'SEND_EMAIL'
    | 'UPLOAD_FILE'
    | 'DELETE_FILE';

export interface AuditLog {
    id: string;
    userId: string;
    action: AuditAction;
    entityType: string;
    entityId: string;
    changes: Record<string, any> | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
}

// ===== Email Template Types =====
export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    variables: string[];
    isActive: boolean;
}

// ===== API Response Types =====
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
    timestamp?: Date;
}
export interface PaginatedResponse<T> {
    success?: boolean;
    data: T;
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
    message?: string;
    timestamp?: Date;
}
// ===== Form Types =====
export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface CreateApplicationData {
    visaType: VisaType;
    country: string;
    targetDeadline?: Date;
}

export interface UpdateApplicationData {
    status?: ApplicationStatus;
    notes?: string;
    currentStep?: number;
    progressPercentage?: number;
}

// ===== Dashboard Stats =====
export interface DashboardStats {
    totalApplications: number;
    activeApplications: number;
    approvedApplications: number;
    pendingDocuments: number;
    upcomingAppointments: number;
    unreadMessages: number;
    totalPayments: number;
}

export interface AdminDashboardStats extends DashboardStats {
    totalClients: number;
    totalStaff: number;
    totalCountries: number;
    averageProcessingTime: number;
    clientSatisfactionRate: number;
}
