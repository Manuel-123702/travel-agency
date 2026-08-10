"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cookie, Shield, Clock, User, Search, Target,
  ChevronRight, CheckCircle2, ArrowRight, Settings, Bell
} from "lucide-react";

const cookieCategories = [
  {
    title: "Strictly Necessary Cookies",
    icon: Shield,
    required: true,
    duration: "Session / Persistent",
    color: "from-blue-500 to-indigo-600",
    purpose: "Required for the website to function. Cannot be disabled.",
    examples: [
      "Authentication cookies (Clerk) to keep you signed in",
      "Load balancer session affinity cookies",
      "CSRF security tokens to prevent attacks",
      "Language preference cookies (next-intl)",
      "Shopping cart & payment state cookies",
    ],
  },
  {
    title: "Performance & Analytics Cookies",
    icon: Search,
    required: false,
    duration: "30 days - 2 years",
    color: "from-emerald-500 to-teal-600",
    purpose: "Help us understand how visitors interact with our website.",
    examples: [
      "Vercel Web Analytics (anonymous traffic data)",
      "Sentry error reporting (help us fix bugs)",
      "Lighthouse performance scores",
      "Page load time & error tracking",
      "Conversion funnel analysis (anonymized)",
    ],
  },
  {
    title: "Functional & Preference Cookies",
    icon: Settings,
    required: false,
    duration: "1 year",
    color: "from-purple-500 to-violet-600",
    purpose: "Enhance functionality and remember your preferences.",
    examples: [
      "Remembering your UI theme preferences",
      "Storing your Sanity CMS session",
      "Live chat support history (UploadThing)",
      "Recently viewed countries & services",
      "Notification banner dismissal states",
    ],
  },
  {
    title: "Marketing & Targeting Cookies",
    icon: Target,
    required: false,
    duration: "30 days - 2 years",
    color: "from-amber-500 to-orange-600",
    purpose: "Deliver relevant ads and marketing campaigns.",
    examples: [
      "Facebook/Instagram social media pixels",
      "Google Ads remarketing cookies",
      "LinkedIn conversion tracking",
      "Influencer campaign attribution",
      "Email open & click tracking (Resend)",
    ],
  },
];

const thirdParties = [
  { name: "Clerk", purpose: "Authentication & user sessions", type: "Auth" },
  { name: "Sanity", purpose: "Content management system sessions", type: "CMS" },
  { name: "UploadThing", purpose: "File uploads & chat storage", type: "Storage" },
  { name: "Stripe", purpose: "Secure payment processing", type: "Payments" },
  { name: "Vercel", purpose: "Hosting, analytics, edge functions", type: "Hosting" },
  { name: "Google", purpose: "Fonts, Maps, Ads, Analytics (opt-in)", type: "3rd Party" },
  { name: "Resend", purpose: "Transactional email delivery", type: "Email" },
  { name: "Meta", purpose: "Facebook/Instagram ads pixel (opt-in)", type: "Marketing" },
];

export default function CookiePolicyPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white py-20 px-6 mb-16">
        <div className="absolute inset-0 opacity-10">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Cookie size={14} /> Cookie Policy
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl mb-4">
              Our Commitment to Your <span className="text-yellow-200">Privacy</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              This policy explains what cookies we use, why, and how you can control them.
              Effective from August 1, 2026. We respect GDPR, CCPA, and Cameroonian data protection law.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8 text-sm">
              <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full">
                <Clock size={14} /> Updated: Aug 1, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full">
                <User size={14} /> Applies to: All users
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full">
                <Bell size={14} /> Changes: Minor — rebranded from Manuel to Travel Agency
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { label: "Total Categories", value: "4", color: "from-blue-500 to-indigo-600" },
            { label: "Required (Always On)", value: "1", color: "from-emerald-500 to-teal-600" },
            { label: "Optional (Your Choice)", value: "3", color: "from-amber-500 to-orange-600" },
          ].map(({ label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <p className={`font-heading font-black text-5xl mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cookie Categories */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-heading font-bold text-3xl text-navy mb-2">Cookie Categories We Use</h2>
        <p className="text-gray-500 mb-8 text-lg">You can manage non-essential cookies via the banner or your browser settings.</p>
        <div className="space-y-5">
          {cookieCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.article
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-navy text-2xl">{cat.title}</h3>
                        <p className="text-gray-400 text-xs mt-1 flex items-center gap-3">
                          <Clock size={12} /> {cat.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {cat.required ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold">
                            <CheckCircle2 size={11} /> Always Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                            <Settings size={11} /> Optional
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{cat.purpose}</p>
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <p className="text-xs font-heading font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Examples of Cookies Used
                      </p>
                      <ul className="space-y-2">
                        {cat.examples.map(e => (
                          <li key={e} className="flex items-start gap-2 text-sm text-gray-700">
                            <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" /> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3rd Party Table */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-heading font-bold text-3xl text-navy mb-2">Third-Party Processors</h2>
        <p className="text-gray-500 mb-8 text-lg">Companies we work with that may place cookies.</p>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-navy to-blue-900 text-white">
                <tr>
                  <th className="text-left p-5 font-heading font-bold">Service</th>
                  <th className="text-left p-5 font-heading font-bold">Purpose</th>
                  <th className="text-left p-5 font-heading font-bold">Type</th>
                  <th className="text-left p-5 font-heading font-bold">Policy Link</th>
                </tr>
              </thead>
              <tbody>
                {thirdParties.map((tp, i) => (
                  <motion.tr
                    key={tp.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="p-5 font-semibold text-navy">{tp.name}</td>
                    <td className="p-5 text-gray-600">{tp.purpose}</td>
                    <td className="p-5">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{tp.type}</span>
                    </td>
                    <td className="p-5">
                      <a href={`https://www.google.com/search?q=${encodeURIComponent(tp.name + " privacy policy")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 text-xs font-bold hover:underline">
                        View Policy →
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Manage */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy mb-2">How to Manage & Disable Cookies</h2>
          <p className="text-gray-500 mb-10 text-lg">You can control cookies via your browser or our banner.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { browser: "Chrome", url: "chrome://settings/cookies", color: "from-amber-500 to-orange-600" },
              { browser: "Safari", url: "#", color: "from-slate-500 to-slate-700" },
              { browser: "Firefox", url: "#", color: "from-orange-500 to-red-600" },
              { browser: "Edge", url: "#", color: "from-blue-500 to-cyan-600" },
            ].map(({ browser, color }, i) => (
              <motion.div
                key={browser}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-heading font-black text-xl mb-4 shadow-md`}>
                  {browser[0]}
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{browser}</h3>
                <p className="text-gray-400 text-xs mb-4">Settings → Privacy & Security → Cookies</p>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">
                  Open Instructions →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy to-blue-900 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-yellow-300 blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">Still Have Cookie Questions?</h2>
              <p className="text-white/85 text-lg mb-6">
                Our DPO (Data Protection Officer) is happy to answer. Email us and we'll respond within 72 hours.
              </p>
              <p className="text-white/70 text-sm font-semibold">DPO Contact: tessohmanuel@gmail.com</p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-navy font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Contact Our DPO <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
