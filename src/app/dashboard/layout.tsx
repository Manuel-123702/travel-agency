"use client";

import React from "react";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <aside className="col-span-3 bg-white rounded-xl p-4 shadow-sm">
          <nav className="space-y-2">
            <a className="block font-semibold text-sm text-navy">Overview</a>
            <a className="block text-sm text-gray-600">Applications</a>
            <a className="block text-sm text-gray-600">Documents</a>
            <a className="block text-sm text-gray-600">Messages</a>
          </nav>
        </aside>

        <section className="col-span-9">{children}</section>
      </div>
    </div>
  );
}
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <DashboardLayout>{children}</DashboardLayout>;
}
