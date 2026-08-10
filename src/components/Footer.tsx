"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight, MessageCircle,
} from "lucide-react";

// TikTok SVG
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.18 8.18 0 004.78 1.52V6.92a4.85 4.85 0 01-1.01-.23z"/>
    </svg>
  );
}

const services = [
  { label: "Student Immigration", href: "/services#student" },
  { label: "Work Permits",        href: "/services#work"    },
  { label: "Visitor Visa",        href: "/services#visitor" },
  { label: "Profile Evaluation",  href: "/#evaluation"     },
  { label: "Document Assistance", href: "/services"         },
];

const destinations = [
  { label: "🇫🇷 France",    href: "/france"    },
  { label: "🇨🇦 Canada",    href: "/canada"    },
  { label: "🇱🇺 Luxembourg", href: "/luxembourg" },
];

const quickLinks = [
  { label: "About Us",    href: "/about"        },
  { label: "Our Services", href: "/services"    },
  { label: "Destinations", href: "/destinations" },
  { label: "Pricing",      href: "/pricing"     },
  { label: "Blog",         href: "/blog"        },
  { label: "FAQ",          href: "/faq"         },
  { label: "Contact",      href: "/contact"     },
];

const legal = [
  { label: "Privacy Policy",      href: "/privacy-policy"  },
  { label: "Terms & Conditions",  href: "/terms"           },
  { label: "Cookie Policy",       href: "/privacy-policy#cookies" },
];

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/237650921917",
    color: "text-[#25D366]",
    hoverColor: "hover:stroke-[#25D366]",
    tooltipColor: "text-[#25D366]",
    icon: (
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.M157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/travelagency",
    color: "text-[#1877F2]",
    hoverColor: "hover:stroke-[#1877F2]",
    tooltipColor: "text-[#1877F2]",
    icon: (
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/travelagency",
    color: "text-[#E1306C]",
    hoverColor: "hover:stroke-[#E1306C]",
    tooltipColor: "text-[#E1306C]",
    icon: (
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@travelagency",
    color: "text-white",
    hoverColor: "hover:stroke-white",
    tooltipColor: "text-white",
    icon: <TikTokIcon size={24} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/travelagency",
    color: "text-[#0A66C2]",
    hoverColor: "hover:stroke-[#0A66C2]",
    tooltipColor: "text-[#0A66C2]",
    icon: (
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@travelagency",
    color: "text-[#FF0000]",
    hoverColor: "hover:stroke-[#FF0000]",
    tooltipColor: "text-[#FF0000]",
    icon: (
      <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white text-navy">
      {/* Newsletter band */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-3xl text-white mb-3">
              Stay Updated with Immigration News
            </h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Get the latest visa updates, policy changes, and success stories delivered directly to your inbox.
            </p>
          </div>
          <form className="max-w-xl mx-auto" onSubmit={handleSubscribe}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed || loading}
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-base focus:outline-none focus:border-gold focus:bg-white/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subscribed || loading || !email}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-yellow-50 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-base flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : subscribed ? "✓ Subscribed!" : "Subscribe Now"}
              </button>
            </div>
            {subscribed && (
              <p className="text-green-200 text-sm mt-3 text-center font-medium">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
          </form>
          <div className="flex items-center justify-center gap-6 mt-8 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No spam
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Unsubscribe anytime
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Weekly updates
            </span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="Travel Agency"
                width={100}
                height={100}
                className="object-contain drop-shadow-lg"
                priority
              />
              <div>
                <span className="font-heading font-bold text-lg text-navy block">
                  TRAVEL <span className="text-gold">AGENCY</span>
                </span>
                <span className="text-navy/60 text-xs">
                  Together toward your international success
                </span>
              </div>
            </Link>
            <p className="text-navy/70 text-sm leading-relaxed mb-6 max-w-sm">
              Premium immigration consulting firm with 10+ years of experience.
              We help students, professionals, and families achieve their
              international dreams in France, Canada, and Luxembourg.
            </p>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+237650921917"
                className="flex items-center gap-3 text-navy/70 hover:text-blue-600 transition-colors"
              >
                <Phone size={14} className="text-gold flex-shrink-0" />
                +237 650 921 917
              </a>
              <a
                href="https://wa.me/237650921917"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy/70 hover:text-[#25D366] transition-colors"
              >
                <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.M157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp: +237 650 921 917
              </a>
              <a
                href="mailto:tessohmanuel@gmail.com"
                className="flex items-center gap-3 text-navy/70 hover:text-blue-600 transition-colors"
              >
                <Mail size={14} className="text-gold flex-shrink-0" />
                tessohmanuel@gmail.com
              </a>
              <div className="flex items-start gap-3 text-navy/70">
                <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Yaoundé, Cameroon
                  <br />
                  & Montreal, QC, Canada
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {socials.map(({ icon, href, label, color, hoverColor, tooltipColor }) => (
                <div key={label} className="group relative">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex items-center justify-center transition-all duration-200 ${color} ${hoverColor}`}
                  >
                    <div className="hover:scale-125 duration-200">
                      {icon}
                    </div>
                  </a>
                  <span className={`absolute -top-14 left-[50%] -translate-x-[50%] 
                  z-20 origin-left scale-0 px-3 rounded-lg border 
                  border-gray-300 bg-white py-2 text-sm font-bold
                  shadow-md transition-all duration-300 ease-in-out 
                  group-hover:scale-100 ${tooltipColor}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-navy mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-navy/70 text-sm hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations + Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-navy mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Destinations
            </h4>
            <ul className="space-y-3 mb-8">
              {destinations.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="text-navy/70 text-sm hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading font-semibold text-navy mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-navy/70 text-sm hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications + Stats */}
          <div>
            <h4 className="font-heading font-semibold text-navy mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Certifications
            </h4>
            <div className="space-y-3">
              {["IATA Certified", "RCIC Registered", "ISO 9001:2015", "AIRC Member"].map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-sm text-navy/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {cert}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl border border-blue-200 bg-blue-50">
              <div className="text-gold font-heading font-bold text-2xl">97%</div>
              <div className="text-navy/60 text-xs mt-0.5">Success Rate</div>
              <div className="text-gold font-heading font-bold text-2xl mt-3">2500+</div>
              <div className="text-navy/60 text-xs mt-0.5">Cases Processed</div>
              <div className="text-gold font-heading font-bold text-2xl mt-3">10+</div>
              <div className="text-navy/60 text-xs mt-0.5">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy/50 text-sm text-center md:text-left">
            © 2026 Travel Agency. All rights reserved. |{" "}
            <span className="text-gold">Together toward your international success</span>
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-navy/50 text-xs hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
