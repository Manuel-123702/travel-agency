import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

export const metadata = { title: "Admin Panel — Travel Agency" };

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <AdminLayout>{children}</AdminLayout>;
}
