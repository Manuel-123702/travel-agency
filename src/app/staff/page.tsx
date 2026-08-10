"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Users, MessageSquare, FileText, Calendar, CheckCircle, Clock, TrendingUp, ArrowRight } from "lucide-react";

export default function StaffOverviewPage() {
  const { user } = useUser();
  const name = user?.firstName || "Staff";
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/staff/stats");
        if (!res.ok) return;
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const recentActivity = [
    {
      icon: CheckCircle,
      color: "text-green-600",
      text: "Document approved for John Doe",
      time: "2 hours ago",
    },
    {
      icon: MessageSquare,
      color: "text-blue-600",
      text: "New message from Sarah Johnson",
      time: "3 hours ago",
    },
    {
      icon: Calendar,
      color: "text-purple-600",
      text: "Appointment scheduled with Michael Brown",
      time: "5 hours ago",
    },
    {
      icon: FileText,
      color: "text-orange-600",
      text: "Document review pending for Emily Davis",
      time: "1 day ago",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">
              Staff Dashboard — Welcome, {name}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here's your staff dashboard overview
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-700 text-sm font-semibold">
              Online
            </span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: Users,
            label: "My Clients",
            value: stats?.clients ?? "8",
            sub: "Active cases",
            color: "blue",
          },
          {
            icon: CheckCircle,
            label: "Completed",
            value: stats?.completed ?? "12",
            sub: "This month",
            color: "green",
          },
          {
            icon: FileText,
            label: "Pending Docs",
            value: stats?.pendingDocs ?? "3",
            sub: "Need review",
            color: "orange",
          },
          {
            icon: TrendingUp,
            label: "Success Rate",
            value: "96%",
            sub: "Above target",
            color: "purple",
          },
        ].map(({ icon: Icon, label, value, sub, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                color === "blue"
                  ? "bg-blue-100"
                  : color === "green"
                    ? "bg-green-100"
                    : color === "orange"
                      ? "bg-orange-100"
                      : "bg-purple-100"
              }`}
            >
              <Icon
                size={18}
                className={
                  color === "blue"
                    ? "text-blue-700"
                    : color === "green"
                      ? "text-green-600"
                      : color === "orange"
                        ? "text-orange-600"
                        : "text-purple-600"
                }
              />
            </div>
            <p className="text-gray-500 text-xs font-medium">{label}</p>
            <p className="font-heading font-bold text-navy text-xl mt-0.5">
              {value}
            </p>
            <p className="text-gray-400 text-xs">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="font-heading font-bold text-navy text-lg mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileText, label: "Review Documents", href: "/staff/documents", color: "bg-blue-100 text-blue-700" },
              { icon: MessageSquare, label: "Check Messages", href: "/staff/messages", color: "bg-green-100 text-green-700" },
              { icon: Calendar, label: "View Appointments", href: "/staff/appointments", color: "bg-purple-100 text-purple-700" },
              { icon: Users, label: "My Clients", href: "/staff/clients", color: "bg-orange-100 text-orange-700" },
            ].map(({ icon: Icon, label, href, color }) => (
              <button
                key={href}
                className="flex flex-col gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="font-semibold text-navy text-sm group-hover:text-blue-700 transition-colors">
                  {label}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-navy text-lg">
              Recent Activity
            </h2>
            <span className="text-blue-700 text-sm font-semibold hover:underline cursor-pointer">
              View all
            </span>
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

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-navy to-blue-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Calendar size={36} className="text-gold" />
          <div>
            <p className="font-heading font-bold text-white text-lg">
              Next Appointment
            </p>
            <p className="text-white/60 text-sm mt-0.5">
              Today at 3:00 PM with John Doe
            </p>
          </div>
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 bg-gold text-navy font-heading font-bold px-6 py-3 rounded-full hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all text-sm">
          View Details <ArrowRight size={14} />
        </button>
      </motion.div>
    </div>
  );
}
