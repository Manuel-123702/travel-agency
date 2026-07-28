"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Bell, Lock, Save, Eye, EyeOff } from "lucide-react";

export default function StaffSettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your staff profile preferences</p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <User className="text-blue-700" size={20} />
          </div>
          <h2 className="font-heading font-bold text-navy text-lg">Profile Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                defaultValue="Aminata"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Coulibaly"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="aminata@travelagency.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+237 650 921 917"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              rows={3}
              defaultValue="Senior Immigration Specialist with 8+ years of experience in Canadian and European immigration processes."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Bell className="text-green-700" size={20} />
          </div>
          <h2 className="font-heading font-bold text-navy text-lg">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Email notifications for new client messages", checked: true },
            { label: "Email notifications for document uploads", checked: true },
            { label: "Email notifications for appointment requests", checked: true },
            { label: "SMS notifications for urgent matters", checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-gray-700">{item.label}</span>
              <button
                className={`w-12 h-6 rounded-full transition-colors ${
                  item.checked ? "bg-navy" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    item.checked ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Lock className="text-purple-700" size={20} />
          </div>
          <h2 className="font-heading font-bold text-navy text-lg">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Eye size={18} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeOff size={18} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <button className="flex items-center gap-2 bg-navy text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}
