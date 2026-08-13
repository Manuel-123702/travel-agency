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
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
SENTRY_TRACES_RATE=0.1
```

> **Get Clerk keys**: Create a free account at [clerk.com](https://clerk.com), create a new application, and copy your API keys.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Verify runtime services

Visit the health endpoint to confirm Sentry, Redis, and database availability:

```bash
curl http://localhost:3000/api/health
```

This returns a JSON payload with `healthy`, `sentry.enabled`, `redis.enabled`, `redis.healthy`, and `database.healthy`. The endpoint returns `503` if Redis or database health checks fail.

Expose Prometheus metrics for scraping at:

```bash
curl http://localhost:3000/api/metrics
```

The metrics endpoint includes rate limiter counters and a service health gauge that can be consumed by your monitoring stack.

The project also exposes a daily analytics endpoint for admin dashboards:

```bash
curl http://localhost:3000/api/analytics/daily
```

This endpoint returns a 7-day series for daily applications, completed payments, and revenue totals.

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

-i saw you fix the different packages and design it well in the pricing page but in the homepage the pricing is not the same do same same packages and design and also in the option list of the resources the pricing is not having an icon
-remove/delete the tawk.to not important again and arrange the top buttom know and shift it down same level with the whatsapp button and abit right again 
-in the section of (Find Your Best Immigration Path) increase question useful question even 10
-in the section of testimonial re-design it professionally and increase the number of testimonial 6
-in this section (Real People.Real Results.) on those card i'm seeing an arrowright if it is a blog create it page then so when i click it should react 
-even the adnin-dashboard does pages you created some button there are just static not reacting when i click on it for those button of add ...
-In the services page in your option list i'm seeing 5 but 3 are having their pages arenot havingg the Business visa and  family reunification create their pages too
-I told you there are some card lacking images that is 
in the gallery page on the study abroad you implemented 3 card the first is lacking his images
-Delete/remove the event page not neccesary again
-When your done, the website will be finish so it is the last modification your are doing like that. So when done take a view to everything informations etc you insert ensure those information are real and actually good up to date informations since it is a travel agency website you we whre building so i don't know everything 
- Another problem the resend email you told it ia by a used of an API it should give but is not another way to implement that without using an APi so to receive email because when building the website w3agency and e-commerce the way i used there way no api so to have that result
-remove/delete the admin-dashboard, the staff dashboard and the client portal dashboard not neccessary again. Only the sanity CMS dashboard should remain and should be accessible by entring /studio
-and you see the protection i implement in the admin-dashboard do same in the sanity cms dashboard 
