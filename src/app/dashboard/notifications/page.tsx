"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertCircle, MessageSquare, FileText, Calendar, Globe, Trash2, CheckCheck } from "lucide-react";

interface Notification {
  id: number;
  type: "success" | "warning" | "message" | "document" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "warning", title: "🚨 Document Due Tomorrow", body: "Your Bank Statement (3 months) is due on July 2, 2026. Please upload it to your Document Center as soon as possible to avoid delays in your file processing.", time: "2 hours ago", read: false },
  { id: 2, type: "message", title: "💬 New Message from Aminata", body: "Your advisor Aminata Coulibaly sent you 2 new messages. She has important updates about your IELTS test requirement.", time: "3 hours ago", read: false },
  { id: 3, type: "warning", title: "📋 Missing Documents Reminder", body: "You still have 5 documents pending upload. Deadline for all documents: July 5, 2026. Upload early to give your advisor time to review.", time: "1 day ago", read: false },
  { id: 4, type: "success", title: "✅ Evaluation Report Approved", body: "Your immigration profile evaluation has been reviewed and approved by our senior advisor. Your recommended pathway is Canada Express Entry. CRS Score: 468.", time: "2 days ago", read: true },
  { id: 5, type: "document", title: "📄 Passport Copy Accepted", body: "Your passport scan has been reviewed and accepted. No further action required for this document.", time: "1 week ago", read: true },
  { id: 6, type: "document", title: "📄 Employment Letter Accepted", body: "Your current employment letter has been verified and approved by our document team.", time: "1 week ago", read: true },
  { id: 7, type: "system", title: "🎉 Welcome to Travel Agency Portal!", body: "Your client portal account is now active. You can track your case, upload documents, and message your advisor here. We're excited to start your immigration journey!", time: "3 weeks ago", read: true },
  { id: 8, type: "success", title: "💳 Payment Confirmed", body: "Your initial service fee has been received and confirmed. Your file is now officially open. Case ID: TA-2026-04721.", time: "3 weeks ago", read: true },
  { id: 9, type: "system", title: "🌍 New Visa Policy Alert — Canada", body: "Canada's Immigration, Refugees and Citizenship Canada (IRCC) announced new Express Entry draw scores. Your current CRS of 468 remains above the recent threshold of 451. No action needed.", time: "1 month ago", read: true },
  { id: 10, type: "calendar", title: "📅 Upcoming: IELTS Test", body: "Reminder: Your IELTS General Training test is scheduled for July 1, 2026. Aim for a minimum band score of 6.0 in each section (CLB 7). Good luck!", time: "1 month ago", read: true } as unknown as Notification,
];

const typeConfig = {
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  warning: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100" },
  message: { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100" },
  document: { icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
  system: { icon: Globe, color: "text-gray-600", bg: "bg-gray-100" },
  calendar: { icon: Calendar, color: "text-orange-500", bg: "bg-orange-100" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifs.filter((n) => !n.read) : notifs;

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: number) => setNotifs((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));
  const deleteNotif = (id: number) => setNotifs((n) => n.filter((x) => x.id !== id));

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy mb-1">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? <><span className="text-red-500 font-bold">{unreadCount} unread</span> notifications</> : "All caught up! 🎉"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { label: "All", value: "all" as const, count: notifs.length },
          { label: "Unread", value: "unread" as const, count: unreadCount },
        ].map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === value ? "bg-navy text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {label}
            {count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                filter === value ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>{count}</span>
            )}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="text-center py-20">
          <Bell size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="font-heading font-bold text-gray-300 text-xl">No unread notifications</p>
          <p className="text-gray-300 text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((notif, i) => {
            const cfg = typeConfig[notif.type as keyof typeof typeConfig] ?? typeConfig.system;
            const Icon = cfg.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md ${
                  !notif.read ? "border-blue-100 bg-blue-50/30" : "border-gray-100"
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                    <Icon size={20} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-heading font-bold text-sm ${!notif.read ? "text-navy" : "text-gray-600"}`}>
                          {notif.title}
                        </p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notif.read && (
                          <button onClick={() => markRead(notif.id)} title="Mark as read"
                            className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                            <CheckCheck size={14} />
                          </button>
                        )}
                        <button onClick={() => deleteNotif(notif.id)} title="Delete"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{notif.body}</p>
                    <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
