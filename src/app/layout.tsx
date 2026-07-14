import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://travelagency.com"
  ),

  title:
    "Travel Agency | Your Trusted International Immigration Partner",

  description:
    "Travel Agency is a premium immigration consulting firm specializing in France, Canada, and Luxembourg. Expert guidance for students, professionals, and visitors.",

  keywords:
    "immigration agency, visa consultant, France immigration, Canada immigration, Luxembourg immigration, student visa, work permit",

  authors: [
    {
      name: "Travel Agency",
    },
  ],

  openGraph: {
    title: "Travel Agency | International Immigration Experts",

    description:
      "Premium immigration consulting for France, Canada & Luxembourg.",

    url: "https://travel-agency.com",

    siteName: "Travel Agency",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travel Agency",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Travel Agency | International Immigration Experts",

    description:
      "Premium immigration consulting for France, Canada & Luxembourg.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        data-scroll-behavior="smooth"
      >
        <head>
          <link rel="icon" href="/logo.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>

        <body className="font-body antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}