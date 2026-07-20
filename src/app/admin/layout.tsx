import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

export const metadata = { title: "Admin Panel — Travel Agency" };

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <AdminLayout>{children}</AdminLayout>;
}
