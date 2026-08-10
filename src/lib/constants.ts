// lib/constants.ts - Application constants

// ===== Application Info =====
export const APP_NAME = 'TRAVEL AGENCY';
export const APP_DESCRIPTION = 'Premium immigration, study abroad, visa consulting and processing platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ===== Locales =====
export const LOCALES = (process.env.NEXT_PUBLIC_LOCALES || 'en,fr').split(',');
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export const LOCALE_LABELS: Record<string, string> = {
    en: 'English',
    fr: 'Français',
};

// ===== Routes =====
export const PUBLIC_ROUTES = [
    '/',
    '/about',
    '/services',
    '/countries',
    '/pricing',
    '/blog',
    '/faq',
    '/contact',
    '/terms',
    '/privacy-policy',
    '/cookie-policy',
    '/careers',
];

export const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export const PROTECTED_ROUTES = {
    CLIENT: ['/dashboard', '/applications', '/documents', '/appointments', '/messages', '/settings', '/profile'],
    STAFF: ['/staff/dashboard', '/staff/clients', '/staff/applications', '/staff/analytics', '/staff/settings'],
    ADMIN: ['/admin', '/admin/dashboard', '/admin/cms', '/admin/users', '/admin/analytics', '/admin/settings'],
};

// ===== Visa Types =====
export const VISA_TYPES = [
    { value: 'STUDENT', label: 'Student Visa' },
    { value: 'WORK', label: 'Work Visa' },
    { value: 'FAMILY', label: 'Family Visa' },
    { value: 'SKILLED_MIGRATION', label: 'Skilled Migration' },
    { value: 'BUSINESS', label: 'Business Visa' },
    { value: 'TOURIST', label: 'Tourist Visa' },
    { value: 'PERMANENT_RESIDENCY', label: 'Permanent Residency' },
    { value: 'TEMPORARY', label: 'Temporary Visa' },
];

// ===== Document Types =====
export const DOCUMENT_TYPES = [
    { value: 'PASSPORT', label: 'Passport' },
    { value: 'BIRTH_CERTIFICATE', label: 'Birth Certificate' },
    { value: 'MARRIAGE_CERTIFICATE', label: 'Marriage Certificate' },
    { value: 'DIVORCE_CERTIFICATE', label: 'Divorce Certificate' },
    { value: 'CV', label: 'CV / Resume' },
    { value: 'COVER_LETTER', label: 'Cover Letter' },
    { value: 'ACADEMIC_CERTIFICATE', label: 'Academic Certificate' },
    { value: 'WORK_EXPERIENCE_LETTER', label: 'Work Experience Letter' },
    { value: 'BANK_STATEMENT', label: 'Bank Statement' },
    { value: 'ADMISSION_LETTER', label: 'Admission Letter' },
    { value: 'EMPLOYMENT_OFFER', label: 'Employment Offer' },
    { value: 'POLICE_CLEARANCE', label: 'Police Clearance' },
    { value: 'MEDICAL_CERTIFICATE', label: 'Medical Certificate' },
    { value: 'VACCINATION_CERTIFICATE', label: 'Vaccination Certificate' },
    { value: 'POLICE_REPORT', label: 'Police Report' },
    { value: 'SCHOOL_CERTIFICATE', label: 'School Certificate' },
    { value: 'TRANSCRIPT', label: 'Transcript' },
    { value: 'DEGREE', label: 'Degree' },
    { value: 'DIPLOMA', label: 'Diploma' },
    { value: 'OTHER', label: 'Other' },
];

// ===== Application Status =====
export const APPLICATION_STATUS = [
    { value: 'DRAFT', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { value: 'SUBMITTED', label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
    { value: 'UNDER_REVIEW', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'APPROVED', label: 'Approved', color: 'bg-green-100 text-green-800' },
    { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-800' },
    { value: 'PROCESSING', label: 'Processing', color: 'bg-purple-100 text-purple-800' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-gray-200 text-gray-700' },
];

// ===== Appointment Status =====
export const APPOINTMENT_STATUS = [
    { value: 'SCHEDULED', label: 'Scheduled' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'NO_SHOW', label: 'No Show' },
    { value: 'RESCHEDULED', label: 'Rescheduled' },
];

// ===== Payment Status =====
export const PAYMENT_STATUS = [
    { value: 'PENDING', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'FAILED', label: 'Failed', color: 'bg-red-100 text-red-800' },
    { value: 'REFUNDED', label: 'Refunded', color: 'bg-blue-100 text-blue-800' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
];

// ===== Countries (Frontend Navigation) =====
export const COUNTRIES = [
    { name: 'Canada', code: 'CA', icon: '🇨🇦' },
    { name: 'France', code: 'FR', icon: '🇫🇷' },
    { name: 'Luxembourg', code: 'LU', icon: '🇱🇺' },
    { name: 'Germany', code: 'DE', icon: '🇩🇪' },
    { name: 'Belgium', code: 'BE', icon: '🇧🇪' },
    { name: 'Ireland', code: 'IE', icon: '🇮🇪' },
    { name: 'Finland', code: 'FI', icon: '🇫🇮' },
    { name: 'United Kingdom', code: 'GB', icon: '🇬🇧' },
    { name: 'United States', code: 'US', icon: '🇺🇸' },
    { name: 'Australia', code: 'AU', icon: '🇦🇺' },
];

// ===== Payment Pricing =====
export const PRICING_TIERS = [
    {
        name: 'Starter',
        priceMonthly: 49,
        priceAnnual: 490,
        description: 'Perfect for exploring visa options',
        features: [
            'Access to visa calculator',
            'Download immigration guides',
            'Email support',
            'Access to blog and resources',
        ],
    },
    {
        name: 'Premium',
        priceMonthly: 199,
        priceAnnual: 1990,
        description: 'Most popular for serious applicants',
        features: [
            'Everything in Starter',
            'One-on-one consultation',
            'Document template library',
            'Application tracking',
            'Priority email support',
            'Monthly check-ins',
        ],
        popular: true,
    },
    {
        name: 'VIP',
        priceMonthly: 499,
        priceAnnual: 4990,
        description: 'For complete visa journey support',
        features: [
            'Everything in Premium',
            'Unlimited consultations',
            'Full application management',
            'Unlimited document uploads',
            'Priority phone support',
            'WhatsApp support',
            'Personal visa advisor',
            'Success guarantee',
        ],
    },
];

// ===== UI Configuration =====
export const ITEMS_PER_PAGE = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

// ===== Email Configuration =====
export const EMAIL_FROM = 'noreply@travelagency.com';
export const EMAIL_FROM_NAME = 'TRAVEL AGENCY';
export const SUPER_ADMIN_EMAIL = 'tessohmanuel@gmail.com';
export const ADMIN_PHONE = '+237650921917';

// ===== Stripe =====
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// ===== API Base URL =====
export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ===== Navigation Links =====
export const NAVBAR_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/countries', label: 'Countries' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
];

// ===== Design Colors =====
export const BRAND_COLORS = {
    primary: '#1a2d4d', // Navy Blue
    secondary: '#d4af37', // Gold
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
};

// ===== Feature Flags =====
export const FEATURES = {
    MESSAGING_ENABLED: true,
    BOOKING_ENABLED: true,
    PAYMENTS_ENABLED: true,
    DOCUMENT_UPLOAD_ENABLED: true,
    WHATSAPP_ENABLED: false, // To be enabled with Twilio setup
    GOOGLE_MEET_ENABLED: false, // To be enabled with Google setup
    ZOOM_ENABLED: false, // To be enabled with Zoom setup
};
