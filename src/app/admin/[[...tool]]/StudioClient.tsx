"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function StudioClient() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    const authorized = userEmail === ADMIN_EMAIL;
    setIsAuthorized(authorized);
    setIsChecking(false);
  }, [isSignedIn, user, isLoaded]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-navy mb-3">Access Denied</h1>
          
          <p className="text-gray-600 mb-6">
            The Sanity CMS dashboard is restricted to authorized administrators only.
            You do not have permission to access this area.
          </p>

          <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
            <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Protected Resource
            </div>
            <p className="text-red-600 text-xs mt-1">
              Only authorized administrators can access the CMS
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-semibold hover:bg-navy-800 transition-all hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
