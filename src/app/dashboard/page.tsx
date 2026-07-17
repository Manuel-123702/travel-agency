import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      <p className="text-gray-600">Overview of your applications, appointments, and documents.</p>
    </div>
  );
}
"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText, MessageSquare, Bell, ClipboardList,
  CheckCircle, Clock, AlertCircle, ArrowRight,
  TrendingUp, Globe, Calendar, Star,
} from "lucide-react";

const caseSteps = [
  { step: "Profile Evaluation", status: "completed", date: "June 10, 2026", detail: "Approved for Canada Express Entry + France Student pathway" },
  { step: "File Preparation", status: "in-progress", date: "June 15 – July 2, 2026", detail: "4 of 9 documents collected. Missing: bank statement, reference letter." },
  { step: "Application Submission", status: "pending", date: "Est. July 5, 2026", detail: "Pending document completion" },
  { step: "Interview Preparation", status: "pending", date: "Est. July 15, 2026", detail: "Consular interview coaching sessions" },
  { step: "Visa Obtained", status: "pending", date: "Est. Aug–Sept 2026", detail: "Final approval and travel preparation" },
];

const quickActions = [
  { icon: FileText, label: "Upload Documents", href: "/dashboard/documents", color: "bg-blue-100 text-blue-700", desc: "4 files pending" },
  { icon: MessageSquare, label: "Message Advisor", href: "/dashboard/messages", color: "bg-green-100 text-green-700", desc: "2 unread messages" },
  { icon: ClipboardList, label: "View Full Case", href: "/dashboard/case", color: "bg-purple-100 text-purple-700", desc: "Step 2 of 5" },
  { icon: Calendar, label: "Book a Call", href: "/contact", color: "bg-gold/20 text-yellow-700", desc: "Schedule with advisor" },
];

const recentActivity = [
  { icon: CheckCircle, color: "text-green-600", text: "Your evaluation report was approved", time: "2 days ago" },
  { icon: MessageSquare, color: "text-blue-600", text: "Advisor Aminata sent you a message", time: "3 days ago" },
  { icon: Bell, color: "text-orange-500", text: "Reminder: Bank statement due July 2", time: "5 days ago" },
  { icon: FileText, color: "text-purple-600", text: "Passport copy uploaded successfully", time: "1 week ago" },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const name = user?.firstName || "Client";

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">
              Good morning, {name}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's your immigration case overview — June 29, 2026</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-700 text-sm font-semibold">Case Active</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: "Case Step", value: "2 / 5", sub: "File Preparation", color: "blue" },
          { icon: TrendingUp, label: "Completion", value: "40%", sub: "On track", color: "green" },
          { icon: FileText, label: "Documents", value: "4 / 9", sub: "Missing 5", color: "orange" },
          { icon: Clock, label: "Est. Approval", value: "~9 wks", sub: "On schedule", color: "purple" },
        ].map(({ icon: Icon, label, value, sub, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" : color === "orange" ? "bg-orange-100" : "bg-purple-100"
            }`}>
              <Icon size={18} className={
                color === "blue" ? "text-blue-700" : color === "green" ? "text-green-600" : color === "orange" ? "text-orange-600" : "text-purple-600"
              } />
            </div>
            <p className="text-gray-500 text-xs font-medium">{label}</p>
            <p className="font-heading font-bold text-navy text-xl mt-0.5">{value}</p>
            <p className="text-gray-400 text-xs">{sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Case Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-navy text-lg">Case Progress</h2>
            <Link href="/dashboard/case" className="text-blue-700 text-sm font-semibold hover:underline flex items-center gap-1">
              Full details <ArrowRight size={13} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gray-200" />
            <div className="space-y-5">
              {caseSteps.map(({ step, status, date, detail }) => (
                <div key={step} className="flex gap-4 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${
                    status === "completed" ? "bg-green-100 border-green-500" :
                    status === "in-progress" ? "bg-blue-100 border-blue-500" :
                    "bg-gray-100 border-gray-200"
                  }`}>
                    {status === "completed" ? <CheckCircle size={18} className="text-green-600" /> :
                     status === "in-progress" ? <Clock size={18} className="text-blue-600 animate-pulse" /> :
                     <div className="w-3 h-3 rounded-full bg-gray-300" />}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold text-sm ${
                        status === "completed" ? "text-green-700" :
                        status === "in-progress" ? "text-blue-700" : "text-gray-400"
                      }`}>{step}</p>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        status === "completed" ? "bg-green-100 text-green-700" :
                        status === "in-progress" ? "bg-blue-100 text-blue-700 animate-pulse" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {status === "completed" ? "✓ Done" : status === "in-progress" ? "● Active" : "Pending"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{date}</p>
                    {status !== "pending" && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Advisor card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h3 className="font-heading font-bold text-navy text-base mb-4">Your Advisor</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Advisor" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-navy text-sm">Aminata Coulibaly</p>
                <p className="text-blue-700 text-xs font-medium">Senior Immigration Specialist</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-gold fill-gold" />)}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/dashboard/messages" className="w-full flex items-center justify-center gap-2 bg-navy text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-800 transition-colors">
                <MessageSquare size={14} /> Send Message
              </Link>
              <a href="https://wa.me/15140000000" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Next deadline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-50 border border-red-100 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-red-500" />
              <h3 className="font-heading font-bold text-red-700 text-sm">Next Deadline</h3>
            </div>
            <p className="font-heading font-bold text-red-800 text-lg">July 2, 2026</p>
            <p className="text-red-600 text-sm mt-1">Bank Statement required</p>
            <p className="text-red-400 text-xs mt-2">3 days remaining</p>
            <Link href="/dashboard/documents" className="mt-3 w-full flex items-center justify-center gap-1.5 bg-red-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors">
              Upload Now <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label, href, color, desc }) => (
              <Link key={href} href={href}
                className="flex flex-col gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="font-semibold text-navy text-sm group-hover:text-blue-700 transition-colors">{label}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-navy text-lg">Recent Activity</h2>
            <Link href="/dashboard/notifications" className="text-blue-700 text-sm font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map(({ icon: Icon, color, text, time }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className={color} />
                </div>
                <div className="flex-1">
                  <p className="text-navy text-sm leading-snug">{text}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Destination card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-navy to-blue-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Globe size={36} className="text-gold" />
          <div>
            <p className="font-heading font-bold text-white text-lg">Your Target Destinations</p>
            <p className="text-white/60 text-sm mt-0.5">Canada 🇨🇦 (Primary) · France 🇫🇷 (Secondary)</p>
          </div>
        </div>
        <Link href="/dashboard/case" className="flex-shrink-0 flex items-center gap-2 bg-gold text-navy font-heading font-bold px-6 py-3 rounded-full hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all text-sm">
          View Full Details <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
