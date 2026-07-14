// lib/email.ts - Email utilities and templates

import { Resend } from 'resend';
import { EMAIL_FROM, EMAIL_FROM_NAME } from './constants';

const resend = new Resend(process.env.RESEND_API_KEY);

// ===== Email Templates =====

export const emailTemplates = {
    welcomeEmail: (name: string, email: string) => ({
        subject: 'Welcome to Manuel Immigration Agency',
        html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining Manuel Immigration Agency. We're excited to help you with your immigration journey.</p>
      <p>Your account has been successfully created. You can now:</p>
      <ul>
        <li>Track your visa applications</li>
        <li>Upload documents</li>
        <li>Book consultations with our experts</li>
        <li>Access resources and guides</li>
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Visit Your Dashboard</a></p>
    `,
    }),

    applicationSubmitted: (name: string, applicationId: string, country: string) => ({
        subject: `Your ${country} Visa Application Has Been Submitted`,
        html: `
      <h1>Application Submitted</h1>
      <p>Hi ${name},</p>
      <p>Your visa application for <strong>${country}</strong> has been successfully submitted.</p>
      <p><strong>Application ID:</strong> ${applicationId}</p>
      <p>You can track your application status anytime in your dashboard.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}">View Application</a></p>
    `,
    }),

    documentRequested: (name: string, documents: string[]) => ({
        subject: 'Required Documents for Your Application',
        html: `
      <h1>Documents Required</h1>
      <p>Hi ${name},</p>
      <p>Our team has reviewed your application and requires the following documents:</p>
      <ul>
        ${documents.map(doc => `<li>${doc}</li>`).join('')}
      </ul>
      <p>Please upload these documents as soon as possible to avoid delays.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/documents">Upload Documents</a></p>
    `,
    }),

    appointmentReminder: (name: string, appointmentDate: string, meetingLink?: string) => ({
        subject: 'Reminder: Your Consultation is Coming Up',
        html: `
      <h1>Appointment Reminder</h1>
      <p>Hi ${name},</p>
      <p>Your consultation is scheduled for <strong>${appointmentDate}</strong>.</p>
      ${meetingLink ? `<p><a href="${meetingLink}">Join Video Call</a></p>` : ''}
      <p>If you need to reschedule, please let us know at least 24 hours in advance.</p>
    `,
    }),

    paymentReceived: (name: string, invoiceNumber: string, amount: string) => ({
        subject: `Payment Received - Invoice ${invoiceNumber}`,
        html: `
      <h1>Payment Confirmation</h1>
      <p>Hi ${name},</p>
      <p>We have received your payment of <strong>${amount}</strong>.</p>
      <p><strong>Invoice #:</strong> ${invoiceNumber}</p>
      <p>Your receipt and invoice have been attached to this email.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invoices/${invoiceNumber}">View Invoice</a></p>
    `,
    }),

    applicationApproved: (name: string, country: string, applicationId: string) => ({
        subject: `Your ${country} Visa Application Has Been APPROVED!`,
        html: `
      <h1>Congratulations! Your Application Has Been Approved!</h1>
      <p>Hi ${name},</p>
      <p>Great news! Your visa application for <strong>${country}</strong> has been <strong style="color: green;">APPROVED</strong>.</p>
      <p>Our team will contact you shortly with the next steps.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}">View Application</a></p>
    `,
    }),

    applicationRejected: (name: string, country: string, reason: string) => ({
        subject: `Update on Your ${country} Visa Application`,
        html: `
      <h1>Application Update</h1>
      <p>Hi ${name},</p>
      <p>We have reviewed your application for <strong>${country}</strong>.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Our team would like to discuss your options. Please schedule a consultation with us.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/contact">Schedule Consultation</a></p>
    `,
    }),

    messageNotification: (name: string, senderName: string) => ({
        subject: `New Message from ${senderName}`,
        html: `
      <h1>New Message</h1>
      <p>Hi ${name},</p>
      <p>You have received a new message from <strong>${senderName}</strong>.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/messages">Read Message</a></p>
    `,
    }),

    passwordReset: (name: string, resetLink: string) => ({
        subject: 'Reset Your Password',
        html: `
      <h1>Password Reset Request</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the link below to set a new password.</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
    }),

    contactFormNotification: (name: string, email: string, phone: string, message: string) => ({
        subject: `New Contact Form Submission from ${name}`,
        html: `
      <h1>New Contact Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    }),

    weeklyReport: (name: string, stats: {
        newApplications: number;
        approvedApplications: number;
        activeClients: number;
    }) => ({
        subject: 'Weekly Report - Manuel Immigration Agency',
        html: `
      <h1>Weekly Report</h1>
      <p>Hi ${name},</p>
      <p><strong>This Week's Stats:</strong></p>
      <ul>
        <li>New Applications: ${stats.newApplications}</li>
        <li>Approved Applications: ${stats.approvedApplications}</li>
        <li>Active Clients: ${stats.activeClients}</li>
      </ul>
    `,
    }),

    consultationBooked: (name: string, date: string, time: string, advisorName: string) => ({
        subject: `Your Consultation is Confirmed`,
        html: `
      <h1>Consultation Confirmed</h1>
      <p>Hi ${name},</p>
      <p>Your consultation has been confirmed with <strong>${advisorName}</strong>.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/appointments">View Appointment</a></p>
    `,
    }),
};

// ===== Email Sending Functions =====

export async function sendEmail(
    to: string | string[],
    subject: string,
    html: string
) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured');
            return { success: false, error: 'Email service not configured' };
        }

        const result = await resend.emails.send({
            from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
            to: typeof to === 'string' ? to : to.join(','),
            subject,
            html,
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
    }
}

export async function sendWelcomeEmail(name: string, email: string) {
    const template = emailTemplates.welcomeEmail(name, email);
    return sendEmail(email, template.subject, template.html);
}

export async function sendApplicationSubmittedEmail(
    email: string,
    name: string,
    applicationId: string,
    country: string
) {
    const template = emailTemplates.applicationSubmitted(name, applicationId, country);
    return sendEmail(email, template.subject, template.html);
}

export async function sendDocumentRequestEmail(
    email: string,
    name: string,
    documents: string[]
) {
    const template = emailTemplates.documentRequested(name, documents);
    return sendEmail(email, template.subject, template.html);
}

export async function sendAppointmentReminderEmail(
    email: string,
    name: string,
    appointmentDate: string,
    meetingLink?: string
) {
    const template = emailTemplates.appointmentReminder(name, appointmentDate, meetingLink);
    return sendEmail(email, template.subject, template.html);
}

export async function sendPaymentReceivedEmail(
    email: string,
    name: string,
    invoiceNumber: string,
    amount: string
) {
    const template = emailTemplates.paymentReceived(name, invoiceNumber, amount);
    return sendEmail(email, template.subject, template.html);
}

export async function sendApplicationApprovedEmail(
    email: string,
    name: string,
    country: string,
    applicationId: string
) {
    const template = emailTemplates.applicationApproved(name, country, applicationId);
    return sendEmail(email, template.subject, template.html);
}

export async function sendApplicationRejectedEmail(
    email: string,
    name: string,
    country: string,
    reason: string
) {
    const template = emailTemplates.applicationRejected(name, country, reason);
    return sendEmail(email, template.subject, template.html);
}

export async function sendMessageNotificationEmail(
    email: string,
    name: string,
    senderName: string
) {
    const template = emailTemplates.messageNotification(name, senderName);
    return sendEmail(email, template.subject, template.html);
}

export async function sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string
) {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    const template = emailTemplates.passwordReset(name, resetLink);
    return sendEmail(email, template.subject, template.html);
}

export async function sendContactFormNotificationEmail(
    to: string,
    name: string,
    email: string,
    phone: string,
    message: string
) {
    const template = emailTemplates.contactFormNotification(name, email, phone, message);
    return sendEmail(to, template.subject, template.html);
}

export async function sendWeeklyReportEmail(
    email: string,
    name: string,
    stats: {
        newApplications: number;
        approvedApplications: number;
        activeClients: number;
    }
) {
    const template = emailTemplates.weeklyReport(name, stats);
    return sendEmail(email, template.subject, template.html);
}

export async function sendConsultationConfirmationEmail(
    email: string,
    name: string,
    date: string,
    time: string,
    advisorName: string
) {
    const template = emailTemplates.consultationBooked(name, date, time, advisorName);
    return sendEmail(email, template.subject, template.html);
}
