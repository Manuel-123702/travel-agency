"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, MessageSquare, FileText,
  Bell, Settings, Menu, ChevronRight, LogOut,
  Globe, TrendingUp, Shield,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Clients & Cases", href: "/admin/clients", icon: Users, badge: 12 },
  { label: "Messages Inbox", href: "/admin/messages", icon: MessageSquare, badge: 5 },
  { label: "Document Review", href: "/admin/documents", icon: FileText, badge: 3 },
  { label: "Alerts", href: "/admin/alerts", icon: Bell, badge: 2 },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const Sidebar = () => (
    <aside className="w-64 bg-[#0A0F1E] h-full flex flex-col border-r border-white/5">
      {/* Logo */}
      <div className="p-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Travel Agency" width={32} height={32}  priority
            className="object-contain brightness-0 invert" />
          <div>
            <p className="font-heading font-bold text-white text-sm leading-none">
              TRAVEL <span className="text-gold">AGENCY</span>
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Shield size={9} className="text-red-400" />
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Staff info */}
      <div className="p-4 border-b border-white/8">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-white/30 text-xs truncate">Senior Advisor</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { v: "12", l: "Clients" },
            { v: "94%", l: "Success" },
            { v: "2", l: "Pending" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white/5 rounded-lg py-1.5">
              <p className="text-white font-bold text-sm">{v}</p>
              <p className="text-white/30 text-[10px]">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-3 py-2">Navigation</p>
        {navItems.map(({ label, href, icon: Icon, badge, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white/80"
              }`}>
              <Icon size={16} className={active ? "text-gold" : "group-hover:text-white/60"} />
              <span className="flex-1 text-sm font-medium">{label}</span>
              {badge && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
              {active && <ChevronRight size={12} className="text-gold" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/8 space-y-0.5">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:bg-white/5 hover:text-white/60 transition-all text-sm">
          <Globe size={15} /> Client Portal
        </Link>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:bg-white/5 hover:text-white/60 transition-all text-sm">
          <LogOut size={15} /> Main Website
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#F0F2F7]">
      <div className="hidden lg:block flex-shrink-0 h-screen sticky top-0"><Sidebar /></div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"><Sidebar /></motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0A0F1E] border-b border-white/8 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="p-2 text-white/60 hover:text-white transition-colors">
            <Menu size={20} />
          </button>
          <span className="font-heading font-bold text-white text-sm">
            TRAVEL <span className="text-gold">AGENCY</span>
            <span className="text-red-400 text-xs ml-2 font-normal">Admin</span>
          </span>
          <div className="ml-auto"><UserButton afterSignOutUrl="/" /></div>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
