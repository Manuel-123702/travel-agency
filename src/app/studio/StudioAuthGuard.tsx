"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function StudioAuthGuard({ children }: { children: ReactNode }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-900 to-black flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-heading font-semibold text-lg">Authenticating Sanity CMS Access...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-900 to-black flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-gold/20 text-gold rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/30">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3">Sanity Studio Protected</h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            Access to Sanity CMS is restricted to authorized administrators. Please sign in with your admin credentials to continue.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/sign-in?redirect_url=/studio")}
              className="w-full py-3.5 px-6 bg-gold text-navy font-heading font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-gold/20"
            >
              Sign In as Administrator
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} /> Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  if (userEmail !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-900 to-black flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3 text-red-400">Access Denied</h2>
          <p className="text-white/70 text-sm mb-4 leading-relaxed">
            Your account (<span className="text-gold font-semibold">{userEmail}</span>) does not have administrative permissions to access Sanity Studio.
          </p>
          <p className="text-white/50 text-xs mb-8">
            Only authorized email ({ADMIN_EMAIL}) can access this CMS portal.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-white text-navy font-heading font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <ArrowLeft size={16} /> Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
