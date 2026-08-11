"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Calendar, Search, Filter } from "lucide-react";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function AdminAppointmentsPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Appointments</h1>
        <p className="text-gray-500 mt-1">View and manage all consultation appointments</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="p-8 text-center text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No appointments yet</p>
          <p className="text-sm mt-1">Appointments will appear here when clients book consultations</p>
        </div>
      </div>
    </div>
  );
}
