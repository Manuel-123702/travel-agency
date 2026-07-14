"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle, Globe, Bell, Shield, Users, Mail } from "lucide-react";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    agencyName: "Travel Agency",
    tagline: "Together toward your international success",
    email: "contact@travelagency.com",
    phone: "+1 (514) 000-0000",
    whatsapp: "+1 (514) 000-0000",
    address: "1000 De La Gauchetière St W, Montreal, QC H3B 0A9",
    defaultAdvisor: "aminata",
    autoAssign: true,
    docReminders: true,
    reminderDays: "3",
    clientWelcomeEmail: true,
    adminNewClientAlert: true,
    adminDocUploadAlert: true,
    adminMessageAlert: true,
    deadlineWarningDays: "2",
    franceActive: true,
    canadaActive: true,
    luxembourgActive: true,
    maxClientsPerAdvisor: "15",
    sessionTimeout: "60",
    twoFactor: true,
    auditLog: true,
  });

  const set = (k: string, v: string | boolean) => setSettings((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ k }: { k: string }) => (
    <button onClick={() => set(k, !settings[k as keyof typeof settings])}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        settings[k as keyof typeof settings] ? "bg-blue-600" : "bg-gray-300"
      }`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        settings[k as keyof typeof settings] ? "translate-x-5" : "translate-x-0.5"
      }`} />
    </button>
  );

  const sections = [
    {
      icon: Globe,
      title: "Agency Information",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { l: "Agency Name", k: "agencyName" },
            { l: "Tagline", k: "tagline" },
            { l: "Contact Email", k: "email", type: "email" },
            { l: "Phone Number", k: "phone", type: "tel" },
            { l: "WhatsApp", k: "whatsapp", type: "tel" },
            { l: "Office Address", k: "address" },
          ].map(({ l, k, type }) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{l}</label>
              <input type={type || "text"} value={settings[k as keyof typeof settings] as string}
                onChange={(e) => set(k, e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Users,
      title: "Case Management",
      content: (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { l: "Max clients per advisor", k: "maxClientsPerAdvisor" },
              { l: "Deadline reminder (days before)", k: "deadlineWarningDays" },
              { l: "Document reminder (days before due)", k: "reminderDays" },
            ].map(({ l, k }) => (
              <div key={k}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{l}</label>
                <input type="number" value={settings[k as keyof typeof settings] as string}
                  onChange={(e) => set(k, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-all" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { k: "autoAssign", l: "Auto-assign advisor to new clients", d: "Round-robin assignment based on availability" },
              { k: "docReminders", l: "Automatic document reminders", d: "Send email/WhatsApp reminders before deadlines" },
            ].map(({ k, l, d }) => (
              <div key={k} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div><p className="font-semibold text-gray-900 text-sm">{l}</p><p className="text-gray-400 text-xs mt-0.5">{d}</p></div>
                <Toggle k={k} />
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Active Destinations</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { k: "canadaActive", l: "🇨🇦 Canada" },
                { k: "franceActive", l: "🇫🇷 France" },
                { k: "luxembourgActive", l: "🇱🇺 Luxembourg" },
              ].map(({ k, l }) => (
                <button key={k} onClick={() => set(k, !settings[k as keyof typeof settings])}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    settings[k as keyof typeof settings] ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-400"
                  }`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Bell,
      title: "Notifications",
      content: (
        <div className="space-y-3">
          {[
            { k: "clientWelcomeEmail", l: "Welcome email to new clients", d: "Auto-send on file creation" },
            { k: "adminNewClientAlert", l: "Alert on new client intake", d: "Notify admin when a new file is opened" },
            { k: "adminDocUploadAlert", l: "Alert on document upload", d: "Notify advisor when client uploads a file" },
            { k: "adminMessageAlert", l: "Alert on new client message", d: "Notify advisor of unread messages" },
          ].map(({ k, l, d }) => (
            <div key={k} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div><p className="font-semibold text-gray-900 text-sm">{l}</p><p className="text-gray-400 text-xs mt-0.5">{d}</p></div>
              <Toggle k={k} />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Shield,
      title: "Security",
      content: (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Session timeout (minutes)</label>
              <input type="number" value={settings.sessionTimeout} onChange={(e) => set("sessionTimeout", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-all" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { k: "twoFactor", l: "Two-factor authentication (2FA)", d: "Require 2FA for all admin accounts" },
              { k: "auditLog", l: "Audit log", d: "Log all admin actions (document approvals, status changes)" },
            ].map(({ k, l, d }) => (
              <div key={k} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div><p className="font-semibold text-gray-900 text-sm">{l}</p><p className="text-gray-400 text-xs mt-0.5">{d}</p></div>
                <Toggle k={k} />
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-blue-700 text-sm font-semibold">🔒 Authentication managed by Clerk</p>
            <p className="text-blue-600 text-xs mt-1">Password, SSO, and 2FA are handled by Clerk. Configure via your Clerk dashboard.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Admin Settings</h1>
        <p className="text-gray-500">Configure your agency portal and preferences.</p>
      </motion.div>

      <div className="space-y-6">
        {sections.map(({ icon: Icon, title, content }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-blue-700" />
              </div>
              <h2 className="font-heading font-bold text-gray-900">{title}</h2>
            </div>
            {content}
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          {saved ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
              <CheckCircle size={16} /> Settings saved successfully!
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Changes saved to agency configuration.</p>
          )}
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-[#0A0F1E] text-white font-heading font-bold px-8 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
