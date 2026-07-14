# Travel Agency — International Immigration Consulting Website

A premium, production-ready website for an international immigration consulting agency specializing in France, Canada, and Luxembourg.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Auth**: Clerk
- **Carousel**: Embla Carousel

---

## Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> **Get Clerk keys**: Create a free account at [clerk.com](https://clerk.com), create a new application, and copy your API keys.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page (all sections)
│   ├── about/              # About us page
│   ├── services/           # Services page
│   ├── destinations/       # Destinations overview
│   ├── france/             # France immigration page
│   ├── canada/             # Canada immigration page
│   ├── luxembourg/         # Luxembourg immigration page
│   ├── blog/               # Blog listing page
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── dashboard/          # Protected client dashboard
│   ├── sign-in/            # Clerk sign-in
│   ├── sign-up/            # Clerk sign-up
│   ├── privacy-policy/     # Legal page
│   └── terms/              # Legal page
├── components/
│   ├── Header.tsx          # Sticky navigation with dark mode
│   ├── Footer.tsx          # Full footer with newsletter
│   ├── PageLoader.tsx      # Animated loading screen
│   ├── WhatsAppButton.tsx  # Floating WhatsApp button
│   ├── BackToTop.tsx       # Back-to-top button
│   └── sections/           # Homepage sections
│       ├── Hero.tsx
│       ├── Stats.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Process.tsx
│       ├── Destinations.tsx
│       ├── SuccessStories.tsx
│       ├── Testimonials.tsx
│       ├── EvaluationForm.tsx
│       ├── FAQSection.tsx
│       └── BlogPreview.tsx
├── lib/
│   └── utils.ts            # Utility functions
└── middleware.ts            # Clerk auth middleware
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full homepage with all sections |
| `/about` | Agency story, team, and values |
| `/services` | All three service categories |
| `/destinations` | Destinations overview |
| `/france` | France immigration guide |
| `/canada` | Canada immigration guide |
| `/luxembourg` | Luxembourg immigration guide |
| `/blog` | Blog articles listing |
| `/contact` | Contact form, map, WhatsApp |
| `/faq` | Frequently asked questions |
| `/dashboard` | Protected client area (requires login) |
| `/sign-in` | Clerk authentication |
| `/sign-up` | Clerk registration |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms and conditions |

---

## Features

- ✅ **Clerk Authentication** — Secure sign-in/sign-up with dashboard access
- ✅ **Dark Mode** — Toggle in header
- ✅ **Framer Motion Animations** — Scroll-reveal, page transitions, floating elements
- ✅ **Animated Stats Counter** — Live counting with intersection observer
- ✅ **Auto-rotating Testimonials** — Embla carousel with autoplay
- ✅ **Elegant Page Loader** — Branded loading screen
- ✅ **Floating WhatsApp Button** — With pulse animation
- ✅ **Back to Top Button** — Appears after scrolling
- ✅ **SEO Optimized** — Full metadata, Open Graph, Twitter cards
- ✅ **Fully Responsive** — Mobile, tablet, and desktop
- ✅ **Free Evaluation Form** — With success state
- ✅ **Contact Form** — With validation and success state
- ✅ **Google Maps Embed** — Real location
- ✅ **Newsletter Signup** — In footer and blog page
- ✅ **WCAG Accessibility** — Proper aria labels, focus states

---

## Customization

### Update Contact Information
Search for `+1 (514) 000-0000` and `contact@travelagency.com` to replace with real details.

### Update WhatsApp Link
Find `wa.me/15140000000` and replace `15140000000` with your WhatsApp number (country code + number, no spaces).

### Update Office Address
Find `1000 De La Gauchetière` and replace with your real address.

### Replace Logo
Drop your new logo at `public/logo.png`.

### Update Colors
Edit `tailwind.config.ts` to change the color palette.

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
Any Node.js hosting platform works. Run `npm run build` then `npm run start`.

---

## License

© 2026 Travel Agency. All rights reserved.
