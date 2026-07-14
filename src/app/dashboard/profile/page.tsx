"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { CheckCircle, Save, User, Globe, GraduationCap, Briefcase, Shield, Bell } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: "+1 (514) 000-0000",
    whatsapp: "+1 (514) 000-0000",
    nationality: "Nigerian",
    currentCountry: "Nigeria",
    dob: "1995-03-15",
    education: "Master's Degree",
    fieldOfStudy: "Computer Science",
    workExperience: "5–10 years",
    currentOccupation: "Software Engineer",
    destination: "Canada",
    projectType: "Work Permit / Express Entry",
    targetDate: "2026-09-01",
    languages: "English (C1), French (B1)",
    ieltsBand: "7.0",
    notifEmail: true,
    notifWhatsapp: true,
    notifSMS: false,
    notifNewsletter: true,
  });

  const change = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    {
      icon: User,
      title: "Personal Information",
      fields: [
        { label: "First Name", key: "firstName", type: "text" },
        { label: "Last Name", key: "lastName", type: "text" },
        { label: "Date of Birth", key: "dob", type: "date" },
        { label: "Nationality", key: "nationality", type: "text" },
        { label: "Current Country of Residence", key: "currentCountry", type: "text" },
        { label: "Phone Number", key: "phone", type: "tel" },
        { label: "WhatsApp Number", key: "whatsapp", type: "tel" },
      ],
    },
    {
      icon: GraduationCap,
      title: "Education & Professional Background",
      fields: [
        { label: "Highest Education Level", key: "education", type: "select", options: ["High School", "Bachelor's Degree", "Master's Degree", "PhD / Doctorate", "Professional Certification"] },
        { label: "Field of Study", key: "fieldOfStudy", type: "text" },
        { label: "Years of Work Experience", key: "workExperience", type: "select", options: ["None", "Less than 2 years", "2–5 years", "5–10 years", "10+ years"] },
        { label: "Current Occupation / Job Title", key: "currentOccupation", type: "text" },
        { label: "Languages Spoken", key: "languages", type: "text" },
        { label: "IELTS / TEF Score (if available)", key: "ieltsBand", type: "text" },
      ],
    },
    {
      icon: Globe,
      title: "Immigration Project",
      fields: [
        { label: "Target Destination", key: "destination", type: "select", options: ["France 🇫🇷", "Canada 🇨🇦", "Luxembourg 🇱🇺", "Multiple destinations"] },
        { label: "Type of Project", key: "projectType", type: "select", options: ["Student Visa", "Work Permit / Express Entry", "Visitor Visa", "Permanent Residency", "Family Reunification"] },
        { label: "Target Departure Date", key: "targetDate", type: "date" },
      ],
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-navy mb-1">My Profile</h1>
        <p className="text-gray-500">Keep your information up to date so your advisor can best support you.</p>
      </motion.div>

      {/* Avatar section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-navy flex items-center justify-center text-white font-heading font-bold text-2xl">
              {(user?.firstName?.[0] || "U")}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle size={12} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-heading font-bold text-navy text-xl">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-500 text-sm">{user?.emailAddresses[0]?.emailAddress}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                Premium Client
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                ✓ Verified
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-semibold">
                Case Active
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {sections.map(({ icon: Icon, title, fields }, si) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + si * 0.08 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-blue-700" />
              </div>
              <h2 className="font-heading font-bold text-navy">{title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map(({ label, key, type, options }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  {type === "select" && options ? (
                    <select
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => change(key, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-navy"
                    >
                      {options.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) => change(key, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-navy"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell size={18} className="text-blue-700" />
            </div>
            <h2 className="font-heading font-bold text-navy">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: "notifEmail", label: "Email Notifications", desc: "Case updates, document reminders, messages" },
              { key: "notifWhatsapp", label: "WhatsApp Notifications", desc: "Urgent updates and advisor messages" },
              { key: "notifSMS", label: "SMS Notifications", desc: "Critical deadline reminders only" },
              { key: "notifNewsletter", label: "Immigration Newsletter", desc: "Weekly news, policy changes, and tips" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-navy text-sm">{label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => change(key, !form[key as keyof typeof form])}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    form[key as keyof typeof form] ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form[key as keyof typeof form] ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-blue-700" />
            </div>
            <h2 className="font-heading font-bold text-navy">Account Security</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Account Status", value: "✓ Verified & Active", color: "text-green-600" },
              { label: "Two-Factor Auth", value: "Managed by Clerk", color: "text-blue-700" },
              { label: "Last Sign In", value: "Today, June 29", color: "text-gray-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-400 text-xs">{label}</p>
                <p className={`font-semibold text-sm mt-1 ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">
            Your password and two-factor authentication are managed securely through Clerk. To update security settings, use the account button in the sidebar.
          </p>
        </motion.div>

        {/* Save */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          {saved ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle size={18} /> Changes saved successfully!
            </div>
          ) : (
            <p className="text-gray-400 text-sm">All changes are saved securely to your profile.</p>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-navy text-white font-heading font-bold px-8 py-3.5 rounded-xl hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
            ) : (
              <><Save size={16} /> Save Profile</>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
