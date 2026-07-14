# Manuel Immigration Agency - Production Platform Setup Guide

## 🚀 Project Overview

This is a complete, production-ready immigration agency platform built with modern technologies. The platform includes:

- **Public Website**: Marketing pages, blog, FAQ, pricing
- **Client Portal**: Dashboard, applications, document management, messaging, booking
- **Admin Dashboard**: Full CMS, user management, analytics
- **Database**: PostgreSQL with Prisma ORM
- **CMS**: Sanity for content management
- **Authentication**: Clerk
- **Payments**: Stripe integration
- **Email**: Resend
- **Multilingual**: next-intl support

## 📋 Technology Stack

```
Frontend:          Next.js 15 + TypeScript + Tailwind CSS + Framer Motion
Database:          PostgreSQL + Prisma ORM
CMS:               Sanity
Authentication:    Clerk
Storage:           UploadThing
Payments:          Stripe
Email:             Resend
Forms:             React Hook Form + Zod
State Management:  Zustand
Data Fetching:     TanStack Query
Deployment:        Vercel
```

## 🔧 Phase 1: Foundation Setup

### Step 1: Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all required environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=...
SANITY_API_TOKEN=...

# UploadThing (File Uploads)
UPLOADTHING_SECRET=...
NEXT_PUBLIC_UPLOADTHING_APP_ID=...

# Stripe
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Resend (Email)
RESEND_API_KEY=...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Database Setup

#### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`
4. Run migrations:

```bash
npx prisma migrate dev --name init
```

#### Option B: Neon

1. Go to [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to `DATABASE_URL`
4. Run migrations:

```bash
npx prisma migrate dev --name init
```

#### Option C: Local PostgreSQL

```bash
# Create database
createdb immigration_agency

# Set DATABASE_URL
DATABASE_URL="postgresql://localhost/immigration_agency"

# Run migrations
npx prisma migrate dev --name init
```

### Step 3: Prisma Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database migrations
npx prisma migrate dev --name init

# View database in Prisma Studio (optional)
npx prisma studio
```

### Step 4: Sanity CMS Setup

```bash
# Create a Sanity project
npm install -g @sanity/cli
sanity init

# Or if you have an existing project:
# npm install @sanity/client @sanity/image-url

# Deploy schema to Sanity
npm run sanity:deploy

# Start Sanity Studio locally (for development)
npm run sanity:dev
```

### Step 5: Clerk Authentication Setup

1. Go to [clerk.com](https://clerk.com)
2. Create an application
3. Copy keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Configure redirect URLs:
   - Sign-in: `/sign-in`
   - Sign-up: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### Step 6: UploadThing Setup

1. Go to [uploadthing.com](https://uploadthing.com)
2. Create an app
3. Copy credentials to `.env.local`:
   - `UPLOADTHING_SECRET`
   - `NEXT_PUBLIC_UPLOADTHING_APP_ID`

### Step 7: Stripe Setup

1. Go to [stripe.com](https://stripe.com)
2. Create an account
3. Get keys from Dashboard → Developers → API Keys
4. Copy to `.env.local`:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Create products and copy price IDs:
   - `STRIPE_PRICE_STARTER`
   - `STRIPE_PRICE_PREMIUM`
   - `STRIPE_PRICE_VIP`
6. Setup webhook:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
   Copy `whsec_...` to `STRIPE_WEBHOOK_SECRET`

### Step 8: Resend Email Setup

1. Go to [resend.com](https://resend.com)
2. Create an account
3. Copy API key to `RESEND_API_KEY`
4. Verify your sending domain or use default `onboarding@resend.dev` for testing

## 🛠️ Local Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run prisma:studio   # Open Prisma Studio
npm run sanity:dev      # Start Sanity Studio
npm run sanity:deploy   # Deploy schema to Sanity
npm run sanity:build    # Build Sanity Studio
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── [locale]/          # Localized routes
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Client dashboard
│   └── layout.tsx
├── components/
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   ├── forms/             # Form components
│   └── navigation/        # Navigation components
├── lib/
│   ├── types.ts           # TypeScript types
│   ├── db.ts              # Database helpers
│   ├── sanity.ts          # Sanity CMS client
│   ├── email.ts           # Email templates
│   ├── validations.ts     # Zod schemas
│   ├── api.ts             # API utilities
│   ├── constants.ts       # App constants
│   └── utils.ts           # Utility functions
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── middleware.ts          # Next.js middleware (auth + i18n)
└── styles/                # Global styles

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations

sanity/
├── schemaTypes/           # Sanity content types
└── sanity.config.ts       # Sanity configuration

public/                    # Static assets
```

## 🔐 Environment Variables Explained

### Database

- `DATABASE_URL`: PostgreSQL connection string

### Authentication (Clerk)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key for Clerk
- `CLERK_SECRET_KEY`: Secret key for Clerk
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Sign-in page route
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Sign-up page route
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: Redirect after login
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: Redirect after signup

### Sanity CMS

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (e.g., "production")
- `NEXT_PUBLIC_SANITY_API_VERSION`: API version (e.g., "2024-01-01")
- `SANITY_API_TOKEN`: API token for writing to Sanity (server-only)

### File Uploads (UploadThing)

- `UPLOADTHING_SECRET`: UploadThing secret key
- `NEXT_PUBLIC_UPLOADTHING_APP_ID`: UploadThing app ID

### Payments (Stripe)

- `STRIPE_PUBLIC_KEY`: Stripe public key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Public key for browser

### Email (Resend)

- `RESEND_API_KEY`: Resend API key

### Application

- `NEXT_PUBLIC_APP_URL`: Your application URL
- `NEXT_PUBLIC_DEFAULT_LOCALE`: Default language (e.g., "en")
- `NEXT_PUBLIC_LOCALES`: Supported locales (comma-separated)

## 📚 Database Schema

Key tables created with Prisma:

- **User**: User accounts with roles (ADMIN, STAFF, CLIENT)
- **UserProfile**: Extended user information
- **Client**: Client-specific data
- **Application**: Visa applications with status tracking
- **Document**: File uploads for applications
- **Appointment**: Scheduled consultations
- **Message**: Messaging between clients and staff
- **Payment**: Payment records
- **Invoice**: Invoice generation
- **Notification**: System notifications
- **Country**: Country information
- **Statistic**: Platform statistics
- **AuditLog**: Activity logging for admin purposes

Run `npx prisma studio` to view the schema visually.

## 🎨 Design System

### Colors

- **Primary**: Navy Blue (#1a2d4d)
- **Secondary**: Gold (#d4af37)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

### Fonts

- **Headings**: Poppins
- **Body**: Inter

### Animations

- Framer Motion for smooth transitions
- Tailwind CSS for utility animations

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Using Git

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Auto-deploy on push

## 📝 API Documentation

All API endpoints follow RESTful conventions:

- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application
- `POST /api/documents` - Upload document
- `POST /api/appointments` - Create appointment
- `POST /api/messages` - Send message
- `POST /api/payments` - Create payment

See individual route files for detailed documentation.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Reset database
npx prisma migrate reset
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate

# Clear cache
rm -rf node_modules/.prisma
npm install
```

### Sanity Issues

```bash
# Clear cache
rm -rf .sanity

# Reinstall
npm install @sanity/client
```

## 📞 Support

For issues and questions, contact: support@manuelimmigration.com

## 📄 License

Proprietary - Manuel Immigration Agency

---

**Next Steps:**

1. Complete environment setup
2. Run database migrations
3. Start development server
4. Begin building components (see Phase 2 guide)
