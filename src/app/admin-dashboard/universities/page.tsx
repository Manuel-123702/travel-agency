"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GraduationCap, Search, Filter, Plus } from "lucide-react";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function AdminUniversitiesPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Universities</h1>
          <p className="text-gray-500 mt-1">Manage partner universities and institutions</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors">
          <Plus size={18} /> Add University
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search universities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="p-8 text-center text-gray-500">
          <GraduationCap size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No universities configured</p>
          <p className="text-sm mt-1">Add universities to manage student applications</p>
        </div>
      </div>
    </div>
  );
}
