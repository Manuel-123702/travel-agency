import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Sanity Administration",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}