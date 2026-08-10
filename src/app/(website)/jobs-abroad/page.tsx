"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase, MapPin, DollarSign, Clock, ChevronRight,
  Building2, ArrowRight, CheckCircle2, Languages, Sparkles, TrendingUp, Users, Star
} from "lucide-react";

const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Shopify",
    country: "🇨🇦 Canada",
    city: "Remote · Canada",
    salary: "CA$150K - 220K",
    type: "Full-time · Remote",
    requirements: ["5+ years Go/Ruby", "Distributed systems", "Product thinking"],
    sector: "Tech",
    visaSponsor: true,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Data Scientist (AI/ML)",
    company: "Ubisoft Montréal",
    country: "🇨🇦 Canada",
    city: "Montréal, QC",
    salary: "CA$120K - 180K",
    type: "Full-time · Hybrid",
    requirements: ["Python", "Deep Learning", "3+ years"],
    sector: "Gaming / AI",
    visaSponsor: true,
    color: "from-purple-500 to-violet-700",
  },
  {
    title: "Financial Analyst",
    company: "BNP Paribas",
    country: "🇫🇷 France",
    city: "Paris",
    salary: "€55K - 85K",
    type: "Full-time · On-site",
    requirements: ["MSc Finance", "French fluent", "Excel/VBA"],
    sector: "Banking",
    visaSponsor: true,
    color: "from-blue-500 to-indigo-700",
  },
  {
    title: "Investment Fund Manager",
    company: "BlackRock Luxembourg",
    country: "🇱🇺 Luxembourg",
    city: "Luxembourg City",
    salary: "€110K - 200K",
    type: "Full-time · On-site",
    requirements: ["CFA", "Private Equity", "6+ years"],
    sector: "Asset Management",
    visaSponsor: true,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Nurse Registered (RN)",
    company: "Ontario Health",
    country: "🇨🇦 Canada",
    city: "Toronto, ON",
    salary: "CA$75K - 105K",
    type: "Full-time",
    requirements: ["RN License", "IELTS 7.0", "1+ year"],
    sector: "Healthcare",
    visaSponsor: true,
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Cloud Architect",
    company: "OVHcloud",
    country: "🇫🇷 France",
    city: "Lille",
    salary: "€70K - 110K",
    type: "Full-time · Remote",
    requirements: ["AWS/GCP", "Kubernetes", "5+ years"],
    sector: "Cloud",
    visaSponsor: true,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Big 4 Audit Senior",
    company: "Deloitte Luxembourg",
    country: "🇱🇺 Luxembourg",
    city: "Luxembourg City",
    salary: "€65K - 90K",
    type: "Full-time · Hybrid",
    requirements: ["ACCA/CPA", "3+ years audit", "English fluent"],
    sector: "Accounting",
    visaSponsor: true,
    color: "from-teal-500 to-cyan-700",
  },
  {
    title: "ESG & Sustainability Consultant",
    company: "Suez",
    country: "🇫🇷 France",
    city: "Paris La Défense",
    salary: "€48K - 72K",
    type: "Full-time",
    requirements: ["MSc ESG", "French B2+", "2+ years"],
    sector: "Sustainability",
    visaSponsor: true,
    color: "from-lime-500 to-emerald-600",
  },
  {
    title: "Full Stack Developer",
    company: "Stripe Canada",
    country: "🇨🇦 Canada",
    city: "Toronto / Remote",
    salary: "CA$140K - 200K",
    type: "Full-time · Remote",
    requirements: ["React", "Node.js", "Fintech exp"],
    sector: "Fintech",
    visaSponsor: true,
    color: "from-indigo-500 to-purple-600",
  },
];

export default function JobsAbroadPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-500 via-emerald-600 to-teal-700 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 3,
                height: Math.random() * 10 + 3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Briefcase size={14} /> Jobs Abroad
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Land Your Dream <span className="text-yellow-200">Career</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Verified sponsored positions in Canada, France, and Luxembourg.
              We connect you directly with recruiters AND secure your work permit.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: jobs.length + "+", l: "Active Jobs" },
                { n: "100%", l: "Visa Sponsorship" },
                { n: "3", l: "Countries" },
                { n: "850+", l: "Placed Candidates" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <p className="font-heading font-black text-4xl text-white">{s.n}</p>
                  <p className="text-sm">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Users, title: "Direct to HR", desc: "CV goes straight to hiring managers", color: "bg-blue-100 text-blue-600" },
            { icon: Languages, title: "French Prep", desc: "Workplace French bootcamp included", color: "bg-pink-100 text-pink-600" },
            { icon: TrendingUp, title: "Salary Negotiation", desc: "We negotiate the best offer for you", color: "bg-emerald-100 text-emerald-600" },
            { icon: Sparkles, title: "Work Visa Included", desc: "Full work permit processing in service", color: "bg-amber-100 text-amber-600" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={26} />
              </div>
              <h3 className="font-heading font-bold text-navy text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Jobs List */}
      <section className="bg-gradient-to-b from-emerald-50/30 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Featured Sponsored Roles</h2>
            <p className="text-gray-500 text-lg">Updated daily — apply before positions close</p>
          </motion.div>
          <div className="space-y-5">
            {jobs.map((job, i) => (
              <motion.article
                key={job.title + job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ x: 6 }}
                className="group bg-white rounded-3xl p-6 md:p-7 shadow-sm border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white shadow-lg`}>
                    <Building2 size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-gray-500">{job.company} · <span className="font-semibold text-navy">{job.sector}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.visaSponsor && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 size={11} /> Visa Sponsorship
                          </span>
                        )}
                        <span className="text-lg">{job.country}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {job.city}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                      <span className="flex items-center gap-1 font-bold text-emerald-600"><DollarSign size={13} /> {job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map(r => (
                        <span key={r} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{r}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, s) => <Star key={s} size={12} className="fill-current" />)}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Featured role</p>
                    </div>
                    <Link
                      href="/contact"
                      className={`flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white bg-gradient-to-r ${job.color} hover:shadow-xl transition-all`}
                    >
                      Apply Now <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-300 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
                Can't Find Your Perfect Role?
              </h2>
              <p className="text-white/90 text-lg mb-5">
                Join our Talent Passport program and we'll HEADHUNT the right job for you. We actively pitch your profile to 50+ matching employers.
              </p>
              <ul className="space-y-1.5 mb-6">
                {["Headhunted by 50+ employers", "CV & LinkedIn makeover", "Interview coaching", "Work permit processing"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <CheckCircle2 size={15} className="text-yellow-200 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-600 font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Join Talent Passport <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
