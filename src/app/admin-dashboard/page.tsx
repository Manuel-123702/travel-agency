"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  DollarSign,
  Calendar,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  Shield,
  Edit3,
  ChevronRight,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "tessohmanuel@gmail.com";

const adminSections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin-dashboard", color: "from-blue-500 to-blue-600" },
  { id: "clients", label: "Clients & Cases", icon: Users, href: "/admin-dashboard/clients", color: "from-green-500 to-green-600" },
  { id: "staff", label: "Staff Management", icon: Briefcase, href: "/admin-dashboard/staff", color: "from-purple-500 to-purple-600" },
  { id: "applications", label: "Applications", icon: FileText, href: "/admin-dashboard/applications", color: "from-orange-500 to-orange-600" },
  { id: "documents", label: "Document Review", icon: FileText, href: "/admin-dashboard/documents", color: "from-cyan-500 to-cyan-600" },
  { id: "countries", label: "Countries", icon: Globe, href: "/admin-dashboard/countries", color: "from-indigo-500 to-indigo-600" },
  { id: "universities", label: "Universities", icon: GraduationCap, href: "/admin-dashboard/universities", color: "from-pink-500 to-pink-600" },
  { id: "payments", label: "Payments", icon: DollarSign, href: "/admin-dashboard/payments", color: "from-emerald-500 to-emerald-600" },
  { id: "appointments", label: "Appointments", icon: Calendar, href: "/admin-dashboard/appointments", color: "from-amber-500 to-amber-600" },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/admin-dashboard/messages", color: "from-sky-500 to-sky-600" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/admin-dashboard/notifications", color: "from-rose-500 to-rose-600" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin-dashboard/analytics", color: "from-violet-500 to-violet-600" },
  { id: "roles", label: "Roles & Permissions", icon: Shield, href: "/admin-dashboard/roles", color: "from-red-500 to-red-600" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin-dashboard/settings", color: "from-gray-500 to-gray-600" },
];

export default function AdminDashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  if (userEmail !== ADMIN_EMAIL) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-navy to-blue-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-navy">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Super Admin Control Center</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-yellow-500 text-navy rounded-full font-semibold text-sm hover:shadow-lg transition-all"
              >
                <Edit3 size={16} />
                CMS Admin
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-100 rounded-full transition-all text-sm font-medium"
              >
                <LogOut size={16} />
                Back to Website
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-16">
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {adminSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    onClick={() => {
                      setActiveSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      isActive
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                        : "text-gray-700 hover:bg-gray-100 hover:text-navy"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-navy"} />
                    <span className="font-medium">{section.label}</span>
                    <ChevronRight
                      size={16}
                      className={`ml-auto transition-transform ${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gradient-to-br from-navy to-blue-700 rounded-2xl p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Super Admin</p>
                    <p className="text-xs text-white/70">{userEmail}</p>
                  </div>
                </div>
                <p className="text-xs text-white/60">Full system access granted</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-navy mb-2">Admin Dashboard — Welcome back, Super Admin</h2>
              <p className="text-gray-600">Here's what's happening across your platform today.</p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Clients", value: "1,547", change: "+12%", color: "from-blue-500 to-blue-600", icon: Users },
                { label: "Active Applications", value: "342", change: "+8%", color: "from-green-500 to-green-600", icon: FileText },
                { label: "Revenue (MTD)", value: "$45,230", change: "+23%", color: "from-emerald-500 to-emerald-600", icon: DollarSign },
                { label: "Success Rate", value: "97%", change: "+2%", color: "from-purple-500 to-purple-600", icon: BarChart3 },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-navy mb-1">{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Access Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-navy mb-4">Quick Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminSections.slice(1).map((section, i) => {
                  const Icon = section.icon;
                  return (
                    <Link
                      key={section.id}
                      href={section.href}
                      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-navy mb-1">{section.label}</h4>
                      <p className="text-gray-500 text-sm">Manage {section.label.toLowerCase()}</p>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-3 group-hover:text-navy group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold text-navy mb-4">Recent Activity</h3>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {[
                  { action: "New application submitted", user: "John Doe", time: "2 minutes ago", type: "application" },
                  { action: "Payment received", user: "Jane Smith", time: "15 minutes ago", type: "payment" },
                  { action: "Document uploaded", user: "Mike Johnson", time: "1 hour ago", type: "document" },
                  { action: "Appointment scheduled", user: "Sarah Wilson", time: "2 hours ago", type: "appointment" },
                  { action: "Message sent", user: "Tom Brown", time: "3 hours ago", type: "message" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "application" ? "bg-blue-100 text-blue-600" :
                      activity.type === "payment" ? "bg-green-100 text-green-600" :
                      activity.type === "document" ? "bg-orange-100 text-orange-600" :
                      activity.type === "appointment" ? "bg-purple-100 text-purple-600" :
                      "bg-sky-100 text-sky-600"
                    }`}>
                      {activity.type === "application" && <FileText size={18} />}
                      {activity.type === "payment" && <DollarSign size={18} />}
                      {activity.type === "document" && <FileText size={18} />}
                      {activity.type === "appointment" && <Calendar size={18} />}
                      {activity.type === "message" && <MessageSquare size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-navy">{activity.action}</p>
                      <p className="text-sm text-gray-500">by {activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
