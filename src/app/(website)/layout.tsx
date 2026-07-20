import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import CookieConsent from "@/components/CookieConsent";
import SocialProofToast from "@/components/SocialProofToast";
import LiveChat from "@/components/LiveChat";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <PageLoader />

      <Header />

      <main>{children}</main>

      <Footer />

      <WhatsAppButton />

      <BackToTop />

      <CookieConsent />

      <SocialProofToast />

      <LiveChat />
    </ClerkProvider>
  );
}
