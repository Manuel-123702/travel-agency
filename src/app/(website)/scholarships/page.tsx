"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap, DollarSign, MapPin, Globe, CalendarDays,
  ChevronRight, Award, BookOpen, CheckCircle2, ArrowRight, Sparkles, Filter
} from "lucide-react";

const scholarships = [
  {
    name: "Eiffel Excellence Scholarship",
    country: "🇫🇷 France",
    university: "Campus France",
    level: "Masters & PhD",
    amount: "€1,181 / month",
    deadline: "Jan 15, 2027",
    description: "Covers tuition, living expenses, health insurance, and international flights for high-achieving international students.",
    eligible: ["Africa", "Asia", "LATAM"],
    fields: ["Engineering", "Social Sciences", "Business"],
    color: "from-blue-600 to-indigo-700",
  },
  {
    name: "Vanier Canada Graduate Scholarship",
    country: "🇨🇦 Canada",
    university: "Government of Canada",
    level: "PhD",
    amount: "CA$50,000 / year",
    deadline: "Nov 1, 2026",
    description: "Prestigious award for doctoral students demonstrating leadership skills and high scholarly achievement.",
    eligible: ["Worldwide"],
    fields: ["All PhD Fields"],
    color: "from-red-500 to-orange-600",
  },
  {
    name: "Luxembourg State Scholarship",
    country: "🇱🇺 Luxembourg",
    university: "University of Luxembourg",
    level: "Bachelor - PhD",
    amount: "Up to €13,000 / year",
    deadline: "Mar 31, 2027",
    description: "Merit-based scholarships for international students enrolled full-time at Luxembourg higher education institutions.",
    eligible: ["EU + Non-EU"],
    fields: ["Finance", "Law", "CS", "Biology"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "DAAD Scholarship",
    country: "🇩🇪 Germany (via our network)",
    university: "DAAD Germany",
    level: "Masters",
    amount: "€861 - €1,200 / month",
    deadline: "Oct 15, 2026",
    description: "Study in Germany with full funding. Partner program with eligibility support from Travel Agency.",
    eligible: ["Developing Countries"],
    fields: ["All Fields"],
    color: "from-amber-500 to-yellow-600",
  },
  {
    name: "Pierre Elliott Trudeau Foundation Scholarship",
    country: "🇨🇦 Canada",
    university: "Canadian Universities",
    level: "PhD",
    amount: "CA$60,000 / year",
    deadline: "Dec 1, 2026",
    description: "For doctoral candidates focused on public policy, social justice, and international relations.",
    eligible: ["Worldwide"],
    fields: ["Policy", "Humanities", "Law"],
    color: "from-purple-500 to-violet-700",
  },
  {
    name: "Erasmus Mundus Joint Masters",
    country: "🇪🇺 EU + France",
    university: "EU Universities",
    level: "Joint Masters",
    amount: "€49,000 total",
    deadline: "Feb 15, 2027",
    description: "Study across multiple European countries with full tuition waiver + monthly allowance + travel costs.",
    eligible: ["Worldwide"],
    fields: ["Various Programs"],
    color: "from-cyan-500 to-blue-600",
  },
];

export default function ScholarshipsPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white py-24 px-6 mb-20">
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
              transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
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
              <Award size={14} className="text-yellow-200" /> Scholarships & Funding
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Fund Your <span className="text-yellow-200">Education</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Fully-funded, partial, and merit scholarships for studying abroad.
              We help you find, prepare, and apply for the perfect funding match.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: scholarships.length + "+", l: "Active Scholarships" },
                { n: "$5M+", l: "Total Funding Secured" },
                { n: "400+", l: "Students Awarded" },
                { n: "89%", l: "Application Success" },
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

      {/* How We Help */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Filter, title: "Smart Matching", desc: "AI scholarship matcher based on your profile", color: "bg-blue-100 text-blue-600" },
            { icon: BookOpen, title: "Essay Review", desc: "Unlimited SOP and motivation letter edits", color: "bg-purple-100 text-purple-600" },
            { icon: CalendarDays, title: "Deadline Alerts", desc: "Never miss a deadline with custom reminders", color: "bg-orange-100 text-orange-600" },
            { icon: Award, title: "Interview Prep", desc: "Scholarship committee interview coaching", color: "bg-emerald-100 text-emerald-600" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={26} />
              </div>
              <h3 className="font-heading font-bold text-navy text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Featured Scholarships</h2>
            <p className="text-gray-500 text-lg">Act fast — deadlines approaching</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s, i) => (
              <motion.article
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}>
                      <GraduationCap size={22} />
                    </div>
                    <span className="text-sm font-bold text-navy">{s.country}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-semibold mb-3">{s.university}</p>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-3">{s.description}</p>
                  <div className="space-y-2.5 mb-5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><BookOpen size={13} /> Level</span>
                      <span className="font-semibold text-gray-700">{s.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><DollarSign size={13} /> Value</span>
                      <span className="font-bold text-emerald-600">{s.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><CalendarDays size={13} /> Deadline</span>
                      <span className="font-bold text-red-500">{s.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><Globe size={13} /> Eligible</span>
                      <span className="font-semibold text-gray-700 text-xs">{s.eligible.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.fields.map(f => (
                      <span key={f} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-full">{f}</span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl text-white bg-gradient-to-r ${s.color} hover:shadow-lg transition-all`}
                  >
                    Get Help Applying <ChevronRight size={15} />
                  </Link>
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-12 text-navy"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
                Need a Custom Shortlist?
              </h2>
              <p className="text-navy/80 text-lg mb-5">
                Our advisors will handpick 10 scholarships perfectly matched to your profile, grades, and goals — plus templates for every essay.
              </p>
              <ul className="space-y-1.5 mb-6">
                {["Personalized scholarship list", "SOP & essay templates", "Application timeline", "1-on-1 review session"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-navy/90 text-sm font-medium">
                    <CheckCircle2 size={15} /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy text-white font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Book Scholarship Consult <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
