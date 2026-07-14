"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, TrendingUp, FileText, MessageSquare, CheckCircle,
  AlertCircle, Clock, Globe, ArrowRight, Star, ArrowUpRight, Zap,
} from "lucide-react";

const kpis = [
  { icon: Users, label: "Active Clients", value: "12", change: "+3 this month", color: "blue", up: true },
  { icon: CheckCircle, label: "Cases Approved", value: "847", change: "+28 this year", color: "green", up: true },
  { icon: TrendingUp, label: "Success Rate", value: "97%", change: "+2% vs last yr", color: "purple", up: true },
  { icon: Clock, label: "Avg. Processing", value: "11 wks", change: "-1 wk vs target", color: "orange", up: false },
];

const recentClients = [
  { id: "TA-2026-04721", name: "Marcus Johnson", destination: "🇨🇦 Canada", type: "Work Permit", step: 2, progress: 40, status: "in-progress", advisor: "Aminata C.", urgent: true },
  { id: "TA-2026-04695", name: "Fatima Al-Rashidi", destination: "🇫🇷 France", type: "Student Visa", step: 3, progress: 60, status: "in-progress", advisor: "Khadija B.", urgent: false },
  { id: "TA-2026-04612", name: "Yves Dupont", destination: "🇱🇺 Luxembourg", type: "Work Permit", step: 4, progress: 80, status: "in-progress", advisor: "Aminata C.", urgent: false },
  { id: "TA-2026-04588", name: "Aisha Mbeki", destination: "🇨🇦 Canada", type: "Express Entry", step: 5, progress: 100, status: "completed", advisor: "Khadija B.", urgent: false },
  { id: "TA-2026-04541", name: "Priya Nair", destination: "🇫🇷 France", type: "Student Visa", step: 1, progress: 15, status: "new", advisor: "Unassigned", urgent: true },
];

const pendingTasks = [
  { type: "document", text: "Review bank statement — Marcus Johnson", time: "Due today", urgent: true },
  { type: "message", text: "Reply to Fatima Al-Rashidi", time: "48h ago", urgent: true },
  { type: "document", text: "Approve police clearance — Yves Dupont", time: "Due tomorrow", urgent: false },
  { type: "client", text: "Assign advisor to Priya Nair", time: "New intake", urgent: true },
  { type: "document", text: "Send evaluation report — Omar Hassan", time: "2 days", urgent: false },
];

const destinations = [
  { flag: "🇨🇦", country: "Canada", active: 6, approved: 312, rate: "98%" },
  { flag: "🇫🇷", country: "France", active: 4, approved: 287, rate: "96%" },
  { flag: "🇱🇺", country: "Luxembourg", active: 2, approved: 248, rate: "97%" },
];

export default function AdminOverview() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
              Agency Overview
            </h1>
            <p className="text-gray-500 mt-1">Monday, June 29, 2026 · All systems operational</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs bg-green-50 border border-green-200 text-green-700 font-semibold px-3 py-1.5 rounded-full">
              <Zap size={11} /> Live Dashboard
            </span>
            <Link href="/admin/clients"
              className="flex items-center gap-2 bg-[#0A0F1E] text-white font-semibold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              <Users size={14} /> All Clients
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ icon: Icon, label, value, change, color, up }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" :
                color === "purple" ? "bg-purple-100" : "bg-orange-100"
              }`}>
                <Icon size={18} className={
                  color === "blue" ? "text-blue-700" : color === "green" ? "text-green-600" :
                  color === "purple" ? "text-purple-600" : "text-orange-600"
                } />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? "text-green-600" : "text-blue-600"}`}>
                <ArrowUpRight size={12} className={up ? "" : "rotate-90"} />{change}
              </span>
            </div>
            <p className="font-heading font-black text-gray-900 text-3xl">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Client table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-heading font-bold text-gray-900">Active Cases</h2>
            <Link href="/admin/clients" className="text-blue-700 text-sm font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {["Client", "Destination", "Type", "Step", "Progress", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentClients.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-navy flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                            {c.urgent && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                          </div>
                          <p className="text-gray-400 text-xs">{c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">{c.destination}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{c.type}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{c.step}/5</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{c.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        c.status === "completed" ? "bg-green-100 text-green-700" :
                        c.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {c.status === "in-progress" ? "Active" : c.status === "completed" ? "✓ Done" : "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Tasks */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-heading font-bold text-gray-900">Pending Tasks</h2>
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-1 rounded-full">3 urgent</span>
          </div>
          <div className="p-4 space-y-2">
            {pendingTasks.map(({ type, text, time, urgent }) => (
              <div key={text}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all ${
                  urgent ? "border-red-100 bg-red-50/50" : "border-gray-100 hover:bg-gray-50"
                }`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  type === "document" ? "bg-purple-100" : type === "message" ? "bg-blue-100" : "bg-orange-100"
                }`}>
                  {type === "document" ? <FileText size={13} className="text-purple-600" /> :
                   type === "message" ? <MessageSquare size={13} className="text-blue-600" /> :
                   <Users size={13} className="text-orange-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-tight ${urgent ? "text-red-800 font-medium" : "text-gray-700"}`}>{text}</p>
                  <p className={`text-xs mt-0.5 ${urgent ? "text-red-500 font-semibold" : "text-gray-400"}`}>{time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Destination stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Globe size={20} className="text-blue-700" />
          <h2 className="font-heading font-bold text-gray-900">Performance by Destination</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {destinations.map(({ flag, country, active, approved, rate }) => (
            <div key={country} className="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="text-3xl mb-3">{flag}</div>
              <p className="font-heading font-bold text-gray-900 text-lg">{country}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active cases</span>
                  <span className="font-bold text-blue-700">{active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total approved</span>
                  <span className="font-bold text-gray-900">{approved}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Success rate</span>
                  <span className="font-bold text-green-600">{rate}</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: rate }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick nav shortcuts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Review Documents", icon: FileText, href: "/admin/documents", color: "bg-purple-600" },
          { label: "Messages Inbox", icon: MessageSquare, href: "/admin/messages", color: "bg-blue-600" },
          { label: "All Clients", icon: Users, href: "/admin/clients", color: "bg-[#0A0F1E]" },
          { label: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "bg-green-600" },
        ].map(({ label, icon: Icon, href, color }) => (
          <Link key={href} href={href}
            className={`${color} text-white rounded-2xl p-5 flex flex-col gap-3 hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-sm`}>
            <Icon size={22} />
            <span className="font-heading font-bold text-sm">{label}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
