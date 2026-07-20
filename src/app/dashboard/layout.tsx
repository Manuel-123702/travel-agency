import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <DashboardLayout>{children}</DashboardLayout>;
}
