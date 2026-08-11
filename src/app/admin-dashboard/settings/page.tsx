"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Settings, Save } from "lucide-react";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

export default function AdminSettingsPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Settings</h1>
        <p className="text-gray-500 mt-1">Configure system settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="TRAVEL AGENCY"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="tessohmanuel@gmail.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+237 650 921 917"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-lg text-navy mb-4">Feature Flags</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Messaging System</p>
                <p className="text-sm text-gray-500">Enable client-staff messaging</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Appointment Booking</p>
                <p className="text-sm text-gray-500">Enable consultation booking</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Document Uploads</p>
                <p className="text-sm text-gray-500">Enable file upload feature</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
