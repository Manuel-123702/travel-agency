"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Download, FileDown, ChevronRight, BookCheck, Shield,
  Clock, CheckCircle2, ArrowRight, FileText, FileSpreadsheet, Presentation, Image
} from "lucide-react";

const downloads = [
  {
    category: "Application Forms",
    icon: FileText,
    color: "from-blue-500 to-indigo-700",
    items: [
      { title: "Canada Visa Application Form (IMM 5969)", size: "2.4 MB", ext: "PDF" },
      { title: "France Long-Stay Visa Cerfa Form", size: "1.1 MB", ext: "PDF" },
      { title: "Luxembourg Work Permit Application", size: "890 KB", ext: "PDF" },
      { title: "Campus France Etudes Enrollment Pack", size: "3.2 MB", ext: "ZIP" },
    ],
  },
  {
    category: "Document Templates",
    icon: FileSpreadsheet,
    color: "from-green-500 to-emerald-700",
    items: [
      { title: "SOP / Motivation Letter Template", size: "45 KB", ext: "DOCX" },
      { title: "Letter of Explanation (LOE) Pack", size: "120 KB", ext: "DOCX" },
      { title: "Bank Statement Format Guide", size: "1.2 MB", ext: "XLSX" },
      { title: "Budget Planner Spreadsheet", size: "210 KB", ext: "XLSX" },
    ],
  },
  {
    category: "Official Guides",
    icon: BookCheck,
    color: "from-purple-500 to-violet-700",
    items: [
      { title: "IRCC Immigration Refugees Citizenship Guide", size: "8.6 MB", ext: "PDF" },
      { title: "France-Visas Official Documentation", size: "4.3 MB", ext: "PDF" },
      { title: "Luxembourg Immigration Portal Manual", size: "2.1 MB", ext: "PDF" },
      { title: "Recognition of Qualifications EU Guide", size: "3.8 MB", ext: "PDF" },
    ],
  },
  {
    category: "Marketing & Brand Assets",
    icon: Presentation,
    color: "from-amber-500 to-orange-600",
    items: [
      { title: "Travel Agency Logo Pack (PNG+SVG)", size: "5.4 MB", ext: "ZIP" },
      { title: "Company Profile & Brochure", size: "12 MB", ext: "PDF" },
      { title: "Pitch Deck Template", size: "6.8 MB", ext: "PPTX" },
      { title: "Social Media Brand Kit", size: "18 MB", ext: "ZIP" },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 text-white py-24 px-6 mb-20">
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
              <FileDown size={14} /> Downloads Center
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Everything You Need, <span className="text-yellow-300">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Official forms, editable templates, and checklists. One-click downloads — no signup required for free files.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: downloads.length * 4, l: "Files Available" },
                { n: "100%", l: "Official & Verified" },
                { n: "Unlimited", l: "Free Downloads" },
                { n: "Weekly", l: "Updates" },
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

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "Verified & Official", desc: "Forms sourced directly from government websites", color: "bg-emerald-100 text-emerald-600" },
            { icon: Clock, title: "Updated Weekly", desc: "Every file checked monthly for latest revisions", color: "bg-blue-100 text-blue-600" },
            { icon: BookCheck, title: "Fillable & Editable", desc: "PDFs fillable; DOCX/XLSX fully customizable", color: "bg-purple-100 text-purple-600" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                <Icon size={26} />
              </div>
              <h3 className="font-heading font-bold text-navy text-xl mb-2">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20 space-y-14">
        {downloads.map((cat, ci) => {
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
                  <p className="text-gray-400 text-sm">{cat.items.length} files</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.items.map((item, ri) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ri * 0.03 }}
                    whileHover={{ scale: 1.01 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md`}>
                        <span className="font-heading font-black text-[10px]">{item.ext}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-navy text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{item.size}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            {item.ext === "ZIP" ? <Image size={11} /> : <FileText size={11} />} {item.ext}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`shrink-0 inline-flex items-center gap-1.5 font-bold text-sm px-4 py-2.5 rounded-xl text-white bg-gradient-to-r ${cat.color} hover:shadow-lg transition-all`}
                      >
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-blue-900 to-indigo-900 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
                Need Something Specific?
              </h2>
              <p className="text-white/85 text-lg mb-5">
                If you can't find the exact form, template, or guide you need — let us know. We'll source it for you within 24 hours, completely free.
              </p>
              <ul className="space-y-1.5 mb-6">
                {["Custom research requests", "Difficult-to-find forms", "Fillable version requests", "Multi-language help"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <CheckCircle2 size={15} className="text-yellow-300 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-navy font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Request a File <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
