// ======================================================
// src/lib/db.ts
// Prisma Database Helpers
// ======================================================

import {
  PrismaClient,
  UserRole,
  PaymentStatus,
  ApplicationStatus,
  AppointmentStatus,
  DocumentType,
  AuditAction,
} from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// ======================================================
// USER HELPERS
// ======================================================

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
  });
}

export async function getUserByClerkId(clerkId: string) {
  return db.user.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getAllUsers() {
  return db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createUser(data: {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  role?: UserRole;
}) {
  return db.user.create({
    data: {
      clerkId: data.clerkId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      role: data.role ?? UserRole.CLIENT,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role?: UserRole;
    isActive?: boolean;
  }
) {
  return db.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUser(id: string) {
  return db.user.delete({
    where: {
      id,
    },
  });
}

export async function getUserWithProfile(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      client: true,
      staffProfile: true,
      applications: true,
      payments: true,
      invoices: true,
      notifications: true,
      appointments: true,
      documents: true,
    },
  });
}

// ======================================================
// APPLICATION HELPERS
// ======================================================

export async function createApplication(
  userId: string,
  data: {
    visaType: any;
    country: string;
    status?: ApplicationStatus;
    notes?: string;
    internalNotes?: string;
  }
) {
  return db.application.create({
    data: {
      userId,
      visaType: data.visaType,
      country: data.country,
      status: data.status ?? ApplicationStatus.DRAFT,
      notes: data.notes,
      internalNotes: data.internalNotes,
    },
  });
}

export async function getApplicationById(id: string) {
  return db.application.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      documents: true,
      appointments: true,
      payments: true,
      invoices: true,
      timeline: true,
    },
  });
}

export async function getUserApplications(userId: string) {
  return db.application.findMany({
    where: {
      userId,
    },
    include: {
      documents: true,
      payments: true,
      appointments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateApplication(
  id: string,
  data: Partial<{
    status: ApplicationStatus;
    progressPercentage: number;
    currentStep: number;
    notes: string;
    internalNotes: string;
    rejectionReason: string;
    completionDate: Date;
    approvalDate: Date;
  }>
) {
  return db.application.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteApplication(id: string) {
  return db.application.delete({
    where: {
      id,
    },
  });
}
// ======================================================
// DOCUMENT HELPERS
// ======================================================

export async function uploadDocument(
  userId: string,
  applicationId: string | null,
  data: {
    type: DocumentType;
    fileName: string;
    fileUrl: string;
    fileKey: string;
    fileSize: number;
    mimeType: string;
  }
) {
  return db.document.create({
    data: {
      userId,
      applicationId,
      type: data.type,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileKey: data.fileKey,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
    },
  });
}

export async function getDocumentById(id: string) {
  return db.document.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      application: true,
    },
  });
}

export async function getUserDocuments(userId: string) {
  return db.document.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getApplicationDocuments(
  applicationId: string
) {
  return db.document.findMany({
    where: {
      applicationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteDocument(id: string) {
  return db.document.delete({
    where: {
      id,
    },
  });
}

// ======================================================
// APPOINTMENT HELPERS
// ======================================================

export async function createAppointment(data: {
  userId: string;
  applicationId?: string;
  title: string;
  scheduledAt: Date;
  duration?: number;
  meetingType: string;
  meetingLink?: string;
  location?: string;
}) {
  return db.appointment.create({
    data: {
      userId: data.userId,
      applicationId: data.applicationId,
      title: data.title,
      scheduledAt: data.scheduledAt,
      duration: data.duration ?? 30,
      meetingType: data.meetingType,
      meetingLink: data.meetingLink,
      location: data.location,
    },
  });
}

export async function getAppointmentById(id: string) {
  return db.appointment.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      application: true,
    },
  });
}

export async function getUserAppointments(userId: string) {
  return db.appointment.findMany({
    where: {
      userId,
    },
    include: {
      application: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

export async function getUpcomingAppointments(userId: string) {
  return db.appointment.findMany({
    where: {
      userId,
      scheduledAt: {
        gte: new Date(),
      },
      status: AppointmentStatus.SCHEDULED,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

export async function updateAppointment(
  id: string,
  data: Partial<{
    title: string;
    scheduledAt: Date;
    duration: number;
    meetingLink: string;
    location: string;
    meetingType: string;
    status: AppointmentStatus;
  }>
) {
  return db.appointment.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAppointment(id: string) {
  return db.appointment.delete({
    where: {
      id,
    },
  });
}

// ======================================================
// CONVERSATION HELPERS
// ======================================================

export async function createConversation(
  participantIds: string[],
  subject?: string
) {
  return db.conversation.create({
    data: {
      participantIds,
      subject,
    },
  });
}

export async function getConversationById(id: string) {
  return db.conversation.findUnique({
    where: {
      id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

export async function getUserConversations(userId: string) {
  return db.conversation.findMany({
    where: {
      participantIds: {
        has: userId,
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  });
}

// ======================================================
// MESSAGE HELPERS
// ======================================================

export async function createMessage(data: {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
}) {
  return db.message.create({
    data,
  });
}

export async function getConversationMessages(
  conversationId: string
) {
  return db.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: true,
      receiver: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function deleteMessage(id: string) {
  return db.message.delete({
    where: {
      id,
    },
  });
}
// ======================================================
// PAYMENT HELPERS
// ======================================================

export async function createPayment(data: {
  applicationId: string;
  userId: string;
  amount: number;
  currency?: string;
  stripePaymentId?: string;
  stripeCustomerId?: string;
  stripeInvoiceId?: string;
  status?: PaymentStatus;
}) {
  return db.payment.create({
    data: {
      applicationId: data.applicationId,
      userId: data.userId,
      amount: data.amount,
      currency: data.currency ?? "USD",
      stripePaymentId: data.stripePaymentId,
      stripeCustomerId: data.stripeCustomerId,
      stripeInvoiceId: data.stripeInvoiceId,
      status: data.status ?? PaymentStatus.PENDING,
    },
  });
}

export async function getPaymentById(id: string) {
  return db.payment.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      application: true,
      invoice: true,
    },
  });
}

export async function getPaymentByStripePaymentId(
  stripePaymentId: string
) {
  return db.payment.findUnique({
    where: {
      stripePaymentId,
    },
    include: {
      invoice: true,
    },
  });
}

export async function getApplicationPayments(
  applicationId: string
) {
  return db.payment.findMany({
    where: {
      applicationId,
    },
    include: {
      invoice: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserPayments(userId: string) {
  return db.payment.findMany({
    where: {
      userId,
    },
    include: {
      application: true,
      invoice: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  stripePaymentId?: string,
  stripeCustomerId?: string,
  stripeInvoiceId?: string
) {
  return db.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status,
      stripePaymentId,
      stripeCustomerId,
      stripeInvoiceId,
    },
  });
}

export async function deletePayment(id: string) {
  return db.payment.delete({
    where: {
      id,
    },
  });
}

// ======================================================
// INVOICE HELPERS
// ======================================================

export async function createInvoice(data: {
  applicationId: string;
  userId: string;
  paymentId?: string;
  amount: number;
  currency?: string;
}) {
  return db.invoice.create({
    data: {
      applicationId: data.applicationId,
      userId: data.userId,
      paymentId: data.paymentId,
      amount: data.amount,
      currency: data.currency ?? "USD",
      invoiceNumber: `INV-${Date.now()}`,
    },
  });
}

export async function getInvoiceById(id: string) {
  return db.invoice.findUnique({
    where: {
      id,
    },
    include: {
      payment: true,
      application: true,
      user: true,
    },
  });
}

export async function getUserInvoices(userId: string) {
  return db.invoice.findMany({
    where: {
      userId,
    },
    include: {
      payment: true,
      application: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteInvoice(id: string) {
  return db.invoice.delete({
    where: {
      id,
    },
  });
}

// ======================================================
// NOTIFICATION HELPERS
// ======================================================

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: string;
}) {
  return db.notification.create({
    data,
  });
}

export async function getUserNotifications(userId: string) {
  return db.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUnreadNotifications(
  userId: string
) {
  return db.notification.findMany({
    where: {
      userId,
      isRead: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function markNotificationAsRead(
  id: string
) {
  return db.notification.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
}

export async function markAllNotificationsAsRead(
  userId: string
) {
  return db.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}

export async function deleteNotification(id: string) {
  return db.notification.delete({
    where: {
      id,
    },
  });
}
// =====================================================
// PAYMENTS
// =====================================================

export async function createPayment(data: {
  applicationId: string;
  userId: string;
  amount: number;
  currency?: string;
}) {
  return db.payment.create({
    data: {
      applicationId: data.applicationId,
      userId: data.userId,
      amount: data.amount,
      currency: data.currency ?? "USD",
    },
  });
}

export async function getApplicationPayments(
  applicationId: string
) {
  return db.payment.findMany({
    where: {
      applicationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserPayments(userId: string) {
  return db.payment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updatePaymentStatus(
  paymentId: string,
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED",
  stripePaymentId?: string
) {
  return db.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status,
      stripePaymentId,
    },
  });
}

// =====================================================
// INVOICES
// =====================================================

export async function createInvoice(data: {
  applicationId: string;
  userId: string;
  paymentId?: string;
  amount: number;
  currency?: string;
}) {
  return db.invoice.create({
    data: {
      applicationId: data.applicationId,
      userId: data.userId,
      paymentId: data.paymentId,
      amount: data.amount,
      currency: data.currency ?? "USD",
      invoiceNumber: `INV-${Date.now()}`,
    },
  });
}

export async function getInvoice(id: string) {
  return db.invoice.findUnique({
    where: {
      id,
    },
    include: {
      payment: true,
      application: true,
      user: true,
    },
  });
}

export async function getUserInvoices(userId: string) {
  return db.invoice.findMany({
    where: {
      userId,
    },
    include: {
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// =====================================================
// NOTIFICATIONS
// =====================================================

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: string;
}) {
  return db.notification.create({
    data,
  });
}

export async function getUserNotifications(userId: string) {
  return db.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function markNotificationRead(id: string) {
  return db.notification.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
}

export async function markAllNotificationsRead(
  userId: string
) {
  return db.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}
// =====================================================
// AUDIT LOGS
// =====================================================

export async function createAuditLog(data: {
  userId: string;
  action:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "VIEW"
    | "APPROVE"
    | "REJECT"
    | "SEND_EMAIL"
    | "UPLOAD_FILE"
    | "DELETE_FILE";
  entityType: string;
  entityId: string;
}) {
  return db.auditLog.create({
    data,
  });
}

export async function getUserAuditLogs(userId: string) {
  return db.auditLog.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });
}

// =====================================================
// COUNTRIES
// =====================================================

export async function getCountries() {
  return db.country.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCountryByCode(code: string) {
  return db.country.findUnique({
    where: {
      code,
    },
  });
}

// =====================================================
// ADMIN DASHBOARD
// =====================================================

export async function getAdminDashboardStats() {
  const [
    totalUsers,
    totalApplications,
    approvedApplications,
    totalClients,
    totalStaff,
    totalCountries,
    totalPayments,
  ] = await Promise.all([
    db.user.count(),

    db.application.count(),

    db.application.count({
      where: {
        status: "APPROVED",
      },
    }),

    db.user.count({
      where: {
        role: "CLIENT",
      },
    }),

    db.user.count({
      where: {
        role: {
          in: ["ADMIN", "STAFF", "SUPER_ADMIN"],
        },
      },
    }),

    db.country.count(),

    db.payment.aggregate({
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,

    totalApplications,

    approvedApplications,

    totalClients,

    totalStaff,

    totalCountries,

    totalRevenue:
      totalPayments._sum.amount ?? 0,
  };
}

// =====================================================
// CLIENT DASHBOARD
// =====================================================

export async function getClientDashboardStats(
  userId: string
) {
  const [
    applications,

    documents,

    appointments,

    unreadNotifications,

    payments,
  ] = await Promise.all([
    db.application.findMany({
      where: {
        userId,
      },
    }),

    db.document.findMany({
      where: {
        userId,
      },
    }),

    db.appointment.findMany({
      where: {
        userId,
      },
    }),

    db.notification.count({
      where: {
        userId,
        isRead: false,
      },
    }),

    db.payment.findMany({
      where: {
        userId,
      },
    }),
  ]);

  const activeApplications =
    applications.filter((app) =>
      [
        "SUBMITTED",
        "UNDER_REVIEW",
        "PROCESSING",
      ].includes(app.status)
    ).length;

  const upcomingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.scheduledAt > new Date() &&
        appointment.status !== "CANCELLED"
    ).length;

  const totalPayments =
    payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

  return {
    totalApplications:
      applications.length,

    activeApplications,

    approvedApplications:
      applications.filter(
        (a) => a.status === "APPROVED"
      ).length,

    totalDocuments:
      documents.length,

    upcomingAppointments,

    unreadNotifications,

    totalPayments,
  };
}

// =====================================================
// SYSTEM SETTINGS
// =====================================================

export async function getSystemSetting(
  key: string
) {
  return db.systemSettings.findUnique({
    where: {
      key,
    },
  });
}

export async function updateSystemSetting(
  key: string,
  value: unknown
) {
  return db.systemSettings.upsert({
    where: {
      key,
    },
    update: {
      value,
    },
    create: {
      key,
      value,
    },
  });
}

// =====================================================
// EMAIL TEMPLATES
// =====================================================

export async function getEmailTemplate(
  name: string
) {
  return db.emailTemplate.findUnique({
    where: {
      name,
    },
  });
}

export async function saveEmailTemplate(data: {
  name: string;
  subject: string;
  body: string;
}) {
  return db.emailTemplate.upsert({
    where: {
      name: data.name,
    },
    update: {
      subject: data.subject,
      body: data.body,
    },
    create: data,
  });
}