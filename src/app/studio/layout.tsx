import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Sanity Administration",
};

// Admin email for Sanity CMS access
const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirectUrl=/studio");
  }

  // Get user's email from Clerk
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  });

  if (!response.ok) {
    redirect("/?error=unauthorized");
  }

  const userData = await response.json();

  // Check if user's email matches admin email
  if (userData.email !== ADMIN_EMAIL) {
    redirect("/?error=access_denied&message=Only admin users can access the CMS");
  }

  return <>{children}</>;
}