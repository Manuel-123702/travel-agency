"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function AdminAnalyticsPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    router.push("/sign-in");
    return null;
  }

  const stats = [
    { label: "Total Clients", value: "0", icon: Users, color: "bg-blue-500" },
    { label: "Active Applications", value: "0", icon: FileText, color: "bg-green-500" },
    { label: "Completed Cases", value: "0", icon: TrendingUp, color: "bg-amber-500" },
    { label: "Success Rate", value: "0%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Analytics</h1>
        <p className="text-gray-500 mt-1">Track performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="font-heading font-bold text-2xl text-navy">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center text-gray-500">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No analytics data yet</p>
          <p className="text-sm mt-1">Analytics will populate as you get clients and applications</p>
        </div>
      </div>
    </div>
  );
}
