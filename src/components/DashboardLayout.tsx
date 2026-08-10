"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Bell,
  User,
  ClipboardList,
  Menu,
  X,
  ChevronRight,
  LogOut,
  HelpCircle,
  Phone,
  Calendar,
  CreditCard,
  Receipt,
  Download,
  Settings,
  Ticket,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Case Tracker", href: "/dashboard/case", icon: ClipboardList },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 2 },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 3 },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { label: "Downloads", href: "/dashboard/downloads", icon: Download },
  { label: "Support Tickets", href: "/dashboard/tickets", icon: Ticket },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = () => (
    <aside className="w-64 bg-navy h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Travel Agency"
            width={36}
            height={36}
            className="object-contain brightness-0 invert"
          />
          <div>
            <p className="font-heading font-bold text-white text-sm leading-none">
              TRAVEL <span className="text-gold">AGENCY</span>
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse" />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-[10px] font-bold uppercase tracking-wider">VoyageurHub</p>
            </div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-white/40 text-xs truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <div className="mt-3 px-3 py-1.5 bg-green-500/20 rounded-lg">
          <p className="text-green-400 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Case Active — In Progress
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active
                ? "bg-white/15 text-white"
                : "text-white/50 hover:bg-white/8 hover:text-white"
                }`}
            >
              <Icon size={18} className={active ? "text-gold" : "group-hover:text-white/80"} />
              <span className="flex-1 text-sm font-medium">{label}</span>
              {badge && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
              {active && <ChevronRight size={14} className="text-gold" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <a
          href="https://wa.me/237650921917"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all group"
        >
          <Phone size={16} className="group-hover:text-[#25D366]" />
          <span className="text-sm font-medium">WhatsApp Advisor</span>
        </a>
        <Link
          href="/faq"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all"
        >
          <HelpCircle size={16} />
          <span className="text-sm font-medium">Help & FAQ</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Back to Website</span>
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
          <button title="Menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-navy hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Travel Agency" width={28} height={28} className="object-contain"  priority />
            <span className="font-heading font-bold text-navy text-sm">
              TRAVEL <span className="text-gold">AGENCY</span>
            </span>
          </div>
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
