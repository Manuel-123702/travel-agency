"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase, MapPin, Clock, ArrowRight, DollarSign,
  Users, Award, ChevronRight, Building2, Sparkles, Star
} from "lucide-react";

const jobs = [
  {
    title: "Senior Immigration Consultant",
    department: "Operations",
    location: "Hybrid · Douala, Cameroon",
    type: "Full-time",
    salary: "₦800K - ₦1.5M",
    tags: ["5+ years", "Licensed", "RCIC"],
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Student Visa Specialist",
    department: "Client Services",
    location: "Remote · Worldwide",
    type: "Full-time",
    salary: "₦500K - ₦800K",
    tags: ["3+ years", "France/Canada", "Bilingual"],
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "On-site · Douala HQ",
    type: "Full-time",
    salary: "₦700K - ₦1.2M",
    tags: ["5+ years", "Digital", "B2C"],
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Document Verification Officer",
    department: "Compliance",
    location: "On-site · Douala HQ",
    type: "Full-time",
    salary: "₦350K - ₦500K",
    tags: ["2+ years", "Detail-oriented", "Languages"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Customer Success Associate",
    department: "Client Success",
    location: "Remote · Africa",
    type: "Contract",
    salary: "₦300K - ₦450K",
    tags: ["1+ year", "CRM", "English/French"],
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Content Writer (Immigration)",
    department: "Content",
    location: "Remote · Worldwide",
    type: "Part-time",
    salary: "₦250K - ₦400K",
    tags: ["SEO", "Research", "Blog"],
    color: "from-cyan-500 to-sky-600",
  },
];

const perks = [
  { icon: DollarSign, label: "Competitive Salary", desc: "Above industry-standard compensation", color: "bg-amber-100 text-amber-700" },
  { icon: Users, label: "Remote Work", desc: "Flexible location & hours", color: "bg-blue-100 text-blue-700" },
  { icon: Award, label: "Career Growth", desc: "Annual training & promotions", color: "bg-purple-100 text-purple-700" },
  { icon: Building2, label: "Health Insurance", desc: "Full medical coverage", color: "bg-emerald-100 text-emerald-700" },
];

export default function CareersPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
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
              <Sparkles size={14} className="text-yellow-300" />
              Join Our Amazing Team
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Build the Future of <span className="text-yellow-300">Immigration</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
              Work with passionate experts transforming lives through successful immigration journeys.
              We're always looking for exceptional talent to join our growing family.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              {[
                { n: "50+", l: "Team Members" },
                { n: "8", l: "Countries" },
                { n: "100%", l: "Remote Friendly" },
                { n: "4.9★", l: "Glassdoor Rating" },
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

      {/* Perks */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Why Work With Us?</h2>
          <p className="text-gray-500 text-lg">We invest in our people and create an environment where you can thrive</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map(({ icon: Icon, label, desc, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={26} />
              </div>
              <h3 className="font-heading font-bold text-navy text-lg mb-2">{label}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Open Positions</h2>
            <p className="text-gray-500 text-lg">{jobs.length} opportunities available right now</p>
          </motion.div>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 6 }}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white shadow-lg`}>
                    <Briefcase size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-gray-500 text-sm">{job.department}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                        {[...Array(5)].map((_, s) => <Star key={s} size={13} className="fill-current" />)}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-600"><DollarSign size={13} /> {job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link href={`mailto:tessohmanuel@gmail.com?subject=Application: ${job.title}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-navy to-blue-800 text-white font-semibold px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm">
                      Apply Now <ChevronRight size={15} />
                    </Link>
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>
                </div>
              </motion.div>
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 p-12 text-white text-center"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-yellow-300 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-pink-300 blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">Don't see the perfect fit?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              We're always open to meeting extraordinary people. Send us your resume and let's create a role together.
            </p>
            <a
              href="mailto:tessohmanuel@gmail.com?subject=Spontaneous Application"
              className="inline-flex items-center gap-2 bg-white text-rose-600 font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Send Spontaneous Application <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
