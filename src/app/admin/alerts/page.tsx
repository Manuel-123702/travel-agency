"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Bell, CheckCheck, Clock, FileText, MessageSquare, Trash2, Users } from "lucide-react";

const allAlerts = [
  { id: 1, type: "deadline", title: "Document deadline tomorrow", body: "Marcus Johnson — Bank Statement due July 2, 2026", time: "30 min ago", read: false, urgent: true },
  { id: 2, type: "new-client", title: "New client intake: Priya Nair", body: "File TA-2026-04541 opened. No advisor assigned yet.", time: "3 hours ago", read: false, urgent: true },
  { id: 3, type: "deadline", title: "Unassigned client — 24h elapsed", body: "Nadia Okonkwo (TA-2026-03821) still has no assigned advisor.", time: "6 hours ago", read: false, urgent: true },
  { id: 4, type: "document", title: "Document rejected — follow up needed", body: "Amara Diallo's passport copy was rejected (too blurry). Client notified.", time: "Yesterday", read: true, urgent: false },
  { id: 5, type: "message", title: "Unanswered message — 48h", body: "Fatima Al-Rashidi's last message has not received a reply.", time: "Yesterday", read: true, urgent: false },
  { id: 6, type: "system", title: "New Express Entry draw — Canada", body: "IRCC issued draw #264. Minimum CRS: 451. 2 clients above threshold.", time: "2 days ago", read: true, urgent: false },
  { id: 7, type: "system", title: "CampusFrance portal scheduled maintenance", body: "France student visa submissions unavailable June 30, 2–4 AM EST.", time: "3 days ago", read: true, urgent: false },
];

const typeConfig = {
  deadline: { icon: Clock, bg: "bg-red-100", color: "text-red-600" },
  "new-client": { icon: Users, bg: "bg-blue-100", color: "text-blue-600" },
  document: { icon: FileText, bg: "bg-purple-100", color: "text-purple-600" },
  message: { icon: MessageSquare, bg: "bg-green-100", color: "text-green-600" },
  system: { icon: Bell, bg: "bg-gray-100", color: "text-gray-600" },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts);
  const unread = alerts.filter((a) => !a.read).length;

  const markRead = (id: number) => setAlerts((a) => a.map((x) => x.id === id ? { ...x, read: true } : x));
  const markAllRead = () => setAlerts((a) => a.map((x) => ({ ...x, read: true })));
  const remove = (id: number) => setAlerts((a) => a.filter((x) => x.id !== id));

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Agency Alerts</h1>
          <p className="text-gray-500">{unread > 0 ? <><span className="text-red-500 font-bold">{unread} urgent</span> items require attention</> : "All clear — no pending alerts"}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </motion.div>

      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const cfg = typeConfig[alert.type as keyof typeof typeConfig] ?? typeConfig.system;
          const Icon = cfg.icon;
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl p-5 border shadow-sm transition-all ${
                !alert.read ? "border-red-100 bg-red-50/20" : "border-gray-100"
              }`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <Icon size={18} className={cfg.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-heading font-bold text-sm ${!alert.read ? "text-gray-900" : "text-gray-600"}`}>{alert.title}</p>
                    {!alert.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                    {alert.urgent && !alert.read && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">URGENT</span>}
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">{alert.body}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {!alert.read && (
                    <button onClick={() => markRead(alert.id)} className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <button onClick={() => remove(alert.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
