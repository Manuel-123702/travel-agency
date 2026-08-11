"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

// ── Social icons with brand colors ──────────────────────────────────────────
const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/237650921917",
    bg: "bg-[#25D366]",
    icon: (
      <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/travelagency",
    bg: "bg-[#1877F2]",
    icon: (
      <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/travelagency",
    bg: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    icon: (
      <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@travelagency",
    bg: "bg-[#010101]",
    icon: (
      <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.18 8.18 0 004.78 1.52V6.92a4.85 4.85 0 01-1.01-.23z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@travelagency",
    bg: "bg-[#FF0000]",
    icon: (
      <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ── Navigation links ──────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Student Immigration", href: "/services#student" },
      { label: "Work Permits", href: "/services#work" },
      { label: "Visitor Visa", href: "/services#visitor" },
      { label: "Business Visa", href: "/services#business" },
      { label: "Family Reunification", href: "/services#family" },
    ],
  },
  {
    label: "Countries",
    href: "/countries",
    children: [
      { label: "🇫🇷 France", href: "/france" },
      { label: "🇨🇦 Canada", href: "/canada" },
      { label: "🇱🇺 Luxembourg", href: "/luxembourg" },
      { divider: true },
      { label: "📚 Universities", href: "/universities" },
      { label: "💼 Jobs Abroad", href: "/jobs-abroad" },
      { label: "🎓 Scholarships", href: "/scholarships" },
    ],
  },
  {
    label: "Discover",
    href: "/success-stories",
    children: [
      { label: "🏆 Success Stories", href: "/success-stories" },
      { label: "👥 Our Team", href: "/team" },
      { label: "📸 Gallery", href: "/gallery" },
      { label: "📅 Events", href: "/events" },
      { label: "✍️ Careers", href: "/careers" },
      { label: "📰 Blog", href: "/blog" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "📖 Resources Hub", href: "/resources" },
      { label: "⬇️ Downloads", href: "/downloads" },
      { label: "💳 Pricing", href: "/pricing" },
      { label: "❓ FAQ", href: "/faq" },
      { label: "📜 Privacy Policy", href: "/privacy-policy" },
      { label: "🍪 Cookie Policy", href: "/cookie-policy" },
      { label: "💸 Refund Policy", href: "/refund-policy" },
      { label: "⚖️ Terms of Service", href: "/terms" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdminEmail, setIsAdminEmail] = useState(false);

  // Admin email for Sanity CMS access
  const ADMIN_EMAIL = "tessohmanuel@gmail.com";

  useEffect(() => {
    // fetch current user's role for conditional admin buttons
    async function fetchRole() {
      if (!isSignedIn) {
        setUserRole(null);
        setIsAdminEmail(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          setUserRole(null);
          setIsAdminEmail(false);
          return;
        }
        const data = await res.json();
        setUserRole(data?.role ?? null);
        // Check if user email matches admin email for CMS access
        setIsAdminEmail(user?.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL);
      } catch (err) {
        setUserRole(null);
        setIsAdminEmail(false);
      }
    }

    fetchRole();
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSignedIn, user]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200"
          : "bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-md border-b border-gray-100"
        }`}
    >
      {/* ── Top info bar ───────────────────────────────────────────────────── */}
      <div
        className={`hidden lg:block transition-all duration-300 overflow-hidden ${scrolled ? "h-0 opacity-0" : "h-10 opacity-100"
          } bg-gradient-to-r from-navy via-navy-800 to-navy`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          {/* Left: contact */}
          <div className="flex items-center gap-5 text-white/70 text-xs">
            <a
              href="tel:+237650921917"
              className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
            >
              <Phone size={11} />
              +237 650 921 917
            </a>
            <span className="text-white/20">|</span>
            <a
              href="mailto:tessohmanuel@gmail.com"
              className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
            >
              <Mail size={11} />
              tessohmanuel@gmail.com
            </a>
          </div>

          {/* Right: socials + language + hours */}
          <div className="flex items-center gap-4">
            {/* Social icons with brand-color backgrounds */}
            <div className="flex items-center gap-1.5">
              {socials.map(({ label, href, bg, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${bg} text-white w-6 h-6 rounded-md flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-200`}
                >
                  {icon}
                </a>
              ))}
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white/50 text-xs">Mon–Fri: 9AM–6PM</span>
            <span className="text-gold font-semibold text-xs">
              24/7 WhatsApp
            </span>
          </div>
        </div>
      </div>

      {/* ── Main nav ───────────────────────────────────────────────────────── */}
      <nav className="w-full px-4 lg:px-8 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Travel Agency Logo"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span
              className={`font-heading font-black text-xl leading-none block tracking-wide transition-colors duration-300 ${scrolled ? "text-navy" : "text-blue"
                }`}
            >
              TRAVEL <span className="text-gold">AGENCY</span>
            </span>
            <span
              className={`text-xs transition-colors text-orange-900 duration-300 ${scrolled ? "text-orange-900" : "text-orange-800"
                }`}
            >
              Together toward your international success
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() =>
                link.children && setActiveDropdown(link.label)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`relative flex items-center text-navy-700 font-semibold gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 group  ${isActive(link.href)
                    ? "text-gold"
                    : scrolled
                      ? "text-navy hover:text-gold"
                      : "text-white/90 hover:text-gold"
                  }`}
              >
                {link.label}
                {link.children && (
                  <ChevronDown size={12} className="opacity-60" />
                )}
                {/* Animated underline */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[210px] z-50 overflow-hidden"
                  >
                    {/* Gold accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-yellow-400" />
                    {link.children.map((child, index) => {
                      if (child.divider) {
                        return <div key={`divider-${index}`} className="my-2 border-t border-gray-100" />;
                      }
                      if (!child.href) return null;
                      return (
                        <Link
                          key={child.href || index}
                          href={child.href}
                          className={`block px-5 py-2.5 text-sm font-medium transition-all duration-150 hover:bg-navy/5 hover:text-gold hover:pl-6 whitespace-nowrap ${pathname === child.href
                              ? "text-gold bg-gold/5"
                              : "text-navy"
                            }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA area */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              {/* CMS button - only visible for admin email */}
              {isAdminEmail && (
                <Link
                  href="/studio"
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${scrolled
                      ? "bg-gradient-to-r from-gold to-yellow-500 text-navy hover:shadow-lg hover:shadow-gold/30"
                      : "bg-gradient-to-r from-gold to-yellow-500 text-navy hover:shadow-lg hover:shadow-gold/30"
                    }`}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  CMS Admin
                </Link>
              )}
              {/* Atlas button - visible for all signed-in users */}
              <Link
                href="/dashboard"
                className="relative group cursor-pointer mx-4"
              >
                <div
                  className="cursor-pointer transition-all text-xl font-bold flex items-center gap-4 bg-blue-500 text-white px-8 py-3 rounded-lg
                border-blue-600
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                   Atlas 🌍
                </div>
              </Link>
              <div className="ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <button
                  className={`cursor-pointer text-white font-bold relative w-[7em] h-[3em] text-[16px] 
                    text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 
                    to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] 
                    before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] 
                    before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 
                    before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl 
                    before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 
                    hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] ${scrolled
                      ? "text-navy hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                    }`}
                >
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/contact"
                className="relative rounded-full bg-blue-500 px-4 py-4 text-white transition-colors w-[12em] h-[4em] font-bold text-center
                duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 text-[16px]
                before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full 
                before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700 whitespace-nowrap"
              >
                <span>Free Consultation</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-full transition-all ${scrolled
              ? "text-navy hover:bg-gray-100"
              : "text-white hover:bg-white/10"
            }`}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.href)
                        ? "bg-gold/10 text-gold font-bold"
                        : "text-navy hover:bg-gray-50 hover:text-gold"
                      }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {link.children.map((child) => (
                        child.href ? (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-500 hover:text-gold rounded-lg hover:bg-gray-50 transition-all"
                          >
                            {child.label}
                          </Link>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile socials */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest px-4 mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2 px-4 flex-wrap">
                  {socials.map(({ label, href, bg, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`${bg} text-white w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-200 shadow-md`}
                    >
                      <span className="scale-125">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                {isSignedIn ? (
                  <div className="flex items-center gap-3 px-4">
                    <UserButton afterSignOutUrl="/" />
                    {/* CMS button - only visible for admin email */}
                    {isAdminEmail && (
                      <Link
                        href="/studio"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-bold bg-gradient-to-r from-gold to-yellow-500 text-navy px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        CMS Admin
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="relative group cursor-pointer"
                    >
                      <div
                        className="relative px-8 py-4 border-2 text-gold border-gold font-bold text-lg rounded-lg transform transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-1 shadow-[6px_6px_10px_rgba(0,0,0,0.6),-6px_-6px_10px_rgba(255,255,255,0.1)] group-hover:shadow-[8px_8px_15px_rgba(0,0,0,0.8),-8px_-8px_15px_rgba(255,255,255,0.15)]"
                      >
                        🌍 Atlas
                      </div>

                      <div
                        className="absolute inset-0 border-2 border-dashed border-gold rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>

                      <div
                        className="absolute -top-2 -right-2 w-4 h-4 bg-gold rounded-full animate-ping shadow-lg"
                      ></div>
                      <div
                        className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold rounded-full animate-ping shadow-lg"
                      ></div>
                      <div
                        className="absolute top-1/3 left-3 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-70"
                      ></div>
                      <div
                        className="absolute top-2/3 right-3 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-70"
                      ></div>
                    </Link>
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="w-full text-center text-sm font-bold text-navy py-3 rounded-2xl border-2 border-navy hover:bg-navy hover:text-white transition-all">
                        Sign In
                      </button>
                    </SignInButton>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center text-sm font-bold bg-gold text-navy py-3 rounded-2xl hover:shadow-lg hover:shadow-gold/30 transition-all"
                    >
                      Free Consultation
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
