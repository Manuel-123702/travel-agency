"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen, FileText, Video, Download, ChevronRight,
  ArrowRight, File, BookCheck, Newspaper, Lightbulb, PlayCircle
} from "lucide-react";

const resources = [
  {
    category: "Ebooks & Guides",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    items: [
      { title: "Canada Express Entry 2026 Playbook", pages: 142, pagesLabel: "pages", format: "PDF", free: false },
      { title: "France Student Visa Ultimate Guide", pages: 98, pagesLabel: "pages", format: "PDF", free: true },
      { title: "Luxembourg Investor Visa Handbook", pages: 64, pagesLabel: "pages", format: "PDF", free: false },
      { title: "SOP Writing Formula (25 Samples)", pages: 180, pagesLabel: "pages", format: "PDF", free: false },
    ],
  },
  {
    category: "Document Templates",
    icon: FileText,
    color: "from-purple-500 to-violet-700",
    items: [
      { title: "Statement of Purpose (SOP) Template", pages: "100% Editable", pagesLabel: "", format: "DOCX", free: true },
      { title: "Letter of Recommendation Pack", pages: "8 templates", pagesLabel: "", format: "DOCX", free: true },
      { title: "CV / Resume Template (EU+NA)", pages: "12 designs", pagesLabel: "", format: "DOCX", free: false },
      { title: "Cover Letter for Work Permit", pages: "15 samples", pagesLabel: "", format: "DOCX", free: true },
    ],
  },
  {
    category: "Video Masterclasses",
    icon: Video,
    color: "from-rose-500 to-pink-600",
    items: [
      { title: "IELTS Speaking 7+ Strategy", pages: "2.5 hours", pagesLabel: "", format: "VIDEO", free: false },
      { title: "Canada Visa Interview Prep", pages: "90 minutes", pagesLabel: "", format: "VIDEO", free: false },
      { title: "How to Ace Campus France Etudes", pages: "12 videos", pagesLabel: "", format: "COURSE", free: true },
      { title: "Job Interviews in French", pages: "6 sessions", pagesLabel: "", format: "VIDEO", free: false },
    ],
  },
  {
    category: "Checklists & Planners",
    icon: File,
    color: "from-amber-500 to-orange-600",
    items: [
      { title: "Visa Application Document Checklist", pages: "12 countries", pagesLabel: "", format: "XLSX", free: true },
      { title: "200-Day Study Abroad Timeline", pages: "Daily plan", pagesLabel: "", format: "SHEET", free: true },
      { title: "Packing & Relocation Checklist", pages: "300+ items", pagesLabel: "", format: "PDF", free: true },
      { title: "Pre-Departure Planner Spreadsheet", pages: "Budget + tasks", pagesLabel: "", format: "XLSX", free: false },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 text-white py-24 px-6 mb-20">
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
              <BookCheck size={14} /> Resources Library
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Resources to <span className="text-yellow-300">Make It Easy</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Ebooks, templates, checklists, and video courses from successful applicants and licensed consultants.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: "50+", l: "Free Resources" },
                { n: "120+", l: "Premium Tools" },
                { n: "50K+", l: "Downloads" },
                { n: "4.9★", l: "Avg. Rating" },
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

      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20 space-y-14">
        {resources.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-navy text-2xl">{cat.category}</h2>
                  <p className="text-gray-400 text-sm">{cat.items.length} resources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {cat.items.map((r, ri) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ri * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}>
                        {r.format === "VIDEO" || r.format === "COURSE" ? <PlayCircle size={18} /> : <FileText size={18} />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {r.free ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">FREE</span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold">PREMIUM</span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black tracking-wider">{r.format}</span>
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-navy text-base mb-2 leading-tight group-hover:text-blue-600 transition-colors">{r.title}</h3>
                    <p className="text-gray-400 text-xs mb-4">{r.pages}{r.pagesLabel ? ` ${r.pagesLabel}` : ""}</p>
                    <div className={`flex items-center justify-between pt-3 border-t border-gray-100 text-sm font-semibold bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                      <span>Access Resource</span>
                      <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Featured Free Guides */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Newspaper,
                title: "Weekly Immigration Bulletin",
                desc: "Stay ahead of policy changes with our 5-minute Monday digest — trusted by 15,000+ readers.",
                cta: "Subscribe Free",
                color: "from-cyan-500 to-blue-600",
              },
              {
                icon: Lightbulb,
                title: "Canada CRS Score Calculator",
                desc: "Know your Express Entry score in 60 seconds. Plus tips to add 50+ points fast.",
                cta: "Calculate Now",
                color: "from-red-500 to-rose-600",
              },
              {
                icon: BookOpen,
                title: "Study Abroad Pathfinder Quiz",
                desc: "Answer 8 questions and get your ideal country, university, & scholarship shortlist.",
                cta: "Take the Quiz",
                color: "from-emerald-500 to-teal-600",
              },
            ].map(({ icon: Icon, title, desc, cta, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${color} opacity-10`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">{title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{desc}</p>
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl text-white bg-gradient-to-r ${color} hover:shadow-lg transition-all`}
                >
                  {cta} <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
