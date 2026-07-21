"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, ArrowRight, Users, GraduationCap, Briefcase, TrendingUp, Star, CheckCircle } from "lucide-react";

const countries = [
  {
    slug: "france",
    flag: "🇫🇷",
    name: "France",
    capital: "Paris",
    tagline: "Art, Culture & Elite Education",
    color: "from-blue-600 via-white to-red-500",
    bg: "from-blue-900 to-blue-700",
    highlight: "#2563EB",
    stats: { visaRate: "94%", processingTime: "4–8 wks", universities: "85+", avgSalary: "€38k/yr" },
    tags: ["Student Visa", "Work Permit", "Talent Visa"],
    desc: "Discover the land of innovation, gastronomy, and world-class universities.",
  },
  {
    slug: "canada",
    flag: "🇨🇦",
    name: "Canada",
    capital: "Ottawa",
    tagline: "Multicultural & Career Opportunities",
    color: "from-red-600 to-red-400",
    bg: "from-red-900 to-red-700",
    highlight: "#DC2626",
    stats: { visaRate: "98%", processingTime: "6–12 wks", universities: "100+", avgSalary: "CAD 55k/yr" },
    tags: ["Express Entry", "Study Permit", "PR Pathway"],
    desc: "One of the world's top immigration destinations with a clear pathway to residency.",
  },
  {
    slug: "luxembourg",
    flag: "🇱🇺",
    name: "Luxembourg",
    capital: "Luxembourg City",
    tagline: "Financial Capital of Europe",
    color: "from-red-500 via-white to-blue-400",
    bg: "from-blue-800 to-red-700",
    highlight: "#EF4444",
    stats: { visaRate: "97%", processingTime: "6–10 wks", universities: "20+", avgSalary: "€58k/yr" },
    tags: ["Skilled Worker", "EU Blue Card", "Business Visa"],
    desc: "The richest country in the EU with excellent salaries and quality of life.",
  },
];

const overallStats = [
  { icon: Globe,      value: "3",      label: "Countries"          },
  { icon: Users,      value: "2,500+", label: "Clients Placed"     },
  { icon: Star,       value: "97%",    label: "Success Rate"       },
  { icon: TrendingUp, value: "10+",    label: "Years Experience"   },
];

export default function CountriesPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-navy via-blue-900 to-navy-800 pt-36 pb-24 overflow-hidden">
        {/* Animated globe rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          {[1, 1.6, 2.2].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute border border-gold rounded-full"
              style={{ width: 300 * scale, height: 300 * scale }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <Globe size={120} className="text-gold" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-6"
          >
            <Globe size={14} className="text-gold" />
            <span className="text-gold text-sm font-bold">3 Destinations Worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-6xl text-white mb-6"
          >
            Your Path to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300">
              World
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl max-w-2xl mx-auto mb-12"
          >
            Expert immigration assistance to France, Canada, and Luxembourg.
            Your dream destination is just a consultation away.
          </motion.p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {overallStats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-5 px-3"
              >
                <Icon size={20} className="text-gold mx-auto mb-2" />
                <p className="font-heading font-black text-2xl text-white">{value}</p>
                <p className="text-white/60 text-xs mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Countries Grid ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mb-4"
            >
              Choose Your Destination
            </motion.h2>
            <p className="section-subtitle">
              Each destination below includes visa types, universities, cost of living, job opportunities, and more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, i) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={`/countries/${country.slug}`}
                  className="block group card-premium overflow-hidden"
                >
                  {/* Card header with gradient */}
                  <div className={`relative bg-gradient-to-br ${country.bg} p-6 overflow-hidden`}>
                    {/* Background glow */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    <div className="relative flex items-start justify-between">
                      <div>
                        <span className="text-5xl mb-3 block">{country.flag}</span>
                        <h3 className="font-heading font-black text-2xl text-white">{country.name}</h3>
                        <p className="text-white/60 text-sm mt-1">{country.capital}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors"
                      >
                        <ArrowRight size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
                      </motion.div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {country.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{country.desc}</p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: CheckCircle, label: "Visa Success",       value: country.stats.visaRate,       color: "text-green-600" },
                        { icon: GraduationCap, label: "Universities",     value: country.stats.universities,   color: "text-blue-600"  },
                        { icon: Briefcase,  label: "Avg Salary",          value: country.stats.avgSalary,      color: "text-purple-600"},
                        { icon: TrendingUp, label: "Processing",          value: country.stats.processingTime, color: "text-orange-600"},
                      ].map(({ icon: Icon, label, value, color }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-3">
                          <Icon size={14} className={`${color} mb-1`} />
                          <p className="font-bold text-navy text-sm">{value}</p>
                          <p className="text-gray-400 text-xs">{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">View full details</span>
                      <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-navy to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">
              Not Sure Which Country is Right for You?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Our experts will analyze your profile and recommend the best immigration pathway — for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Free Evaluation
                <ArrowRight size={16} />
              </Link>
              <Link href="/faq" className="btn-outline inline-flex items-center gap-2">
                Read Our FAQ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
