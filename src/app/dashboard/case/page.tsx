"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Circle, FileText, Calendar, Globe, Star, Download, ChevronDown } from "lucide-react";
import { useState } from "react";

const timeline = [
  {
    step: 1,
    title: "Profile Evaluation",
    status: "completed",
    date: "June 10, 2026",
    completedDate: "June 10, 2026",
    icon: Star,
    details: [
      "CRS Score calculated: 468 points",
      "Recommended pathway: Canada Express Entry + France Student Visa",
      "Profile strength: STRONG",
      "Estimated approval probability: 94%",
    ],
    doc: "Evaluation_Report_June2026.pdf",
  },
  {
    step: 2,
    title: "File Preparation",
    status: "in-progress",
    date: "June 15 – July 5, 2026",
    completedDate: null,
    icon: FileText,
    details: [
      "✅ Passport copy — uploaded June 16",
      "✅ Degree certificates — uploaded June 18",
      "✅ Employment letter — uploaded June 20",
      "✅ Police clearance — uploaded June 22",
      "⏳ Bank statement (3 months) — DUE JULY 2",
      "⏳ Reference letter (employer) — due July 3",
      "⏳ Medical examination results — due July 4",
      "⏳ Proof of accommodation — due July 5",
      "⏳ Language test results (IELTS/TEF) — due July 5",
    ],
    doc: null,
  },
  {
    step: 3,
    title: "Application Submission",
    status: "pending",
    date: "Est. July 8, 2026",
    completedDate: null,
    icon: Globe,
    details: [
      "Submit complete application to IRCC (Canada)",
      "Pay government filing fee ($1,365 CAD)",
      "Receive Application Reference Number",
      "Begin tracking with immigration authority",
    ],
    doc: null,
  },
  {
    step: 4,
    title: "Interview Preparation",
    status: "pending",
    date: "Est. July 15–25, 2026",
    completedDate: null,
    icon: Calendar,
    details: [
      "2 mock interview sessions with advisor",
      "Consular-style Q&A preparation",
      "Document presentation coaching",
      "Confidence and communication training",
    ],
    doc: null,
  },
  {
    step: 5,
    title: "Visa Obtained 🎉",
    status: "pending",
    date: "Est. Aug – Sept 2026",
    completedDate: null,
    icon: CheckCircle,
    details: [
      "Visa/permit collection",
      "Pre-departure checklist completion",
      "Travel and accommodation arrangement",
      "Local contacts and onboarding support",
    ],
    doc: null,
  },
];

const caseInfo = [
  { label: "Case ID", value: "TA-2026-04721" },
  { label: "Client", value: "Dashboard User" },
  { label: "Package", value: "Premium — Work Permit" },
  { label: "Primary Destination", value: "🇨🇦 Canada" },
  { label: "Secondary Destination", value: "🇫🇷 France" },
  { label: "Assigned Advisor", value: "Aminata Coulibaly" },
  { label: "Start Date", value: "June 10, 2026" },
  { label: "Est. Completion", value: "Sept 15, 2026" },
  { label: "Current Status", value: "In Progress — Step 2/5" },
  { label: "CRS Score", value: "468 / 1200" },
];

export default function CasePage() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const progress = 40;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-2xl text-navy mb-1">Case Tracker</h1>
        <p className="text-gray-500 mb-8">Real-time status of your immigration file — Case ID: TA-2026-04721</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-bold text-navy">Overall Progress</span>
          <span className="font-heading font-bold text-blue-700 text-lg">{progress}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full relative"
          >
            <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Started</span>
          <span>Step 2 of 5</span>
          <span>Visa Obtained</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {timeline.map(({ step, title, status, date, completedDate, details, doc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                status === "in-progress" ? "border-blue-200 ring-1 ring-blue-100" : "border-gray-100"
              }`}
            >
              <button
                onClick={() => setExpanded(expanded === step ? null : step)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
              >
                {/* Status icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === "completed" ? "bg-green-100" :
                  status === "in-progress" ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  {status === "completed" ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : status === "in-progress" ? (
                    <Clock size={20} className="text-blue-600" />
                  ) : (
                    <Circle size={20} className="text-gray-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      status === "completed" ? "bg-green-100 text-green-700" :
                      status === "in-progress" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      Step {step}
                    </span>
                    <span className={`font-heading font-bold text-base ${
                      status === "completed" ? "text-green-800" :
                      status === "in-progress" ? "text-navy" : "text-gray-400"
                    }`}>{title}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    {completedDate ? `✓ Completed ${completedDate}` : date}
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${expanded === step ? "rotate-180" : ""}`}
                />
              </button>

              {expanded === step && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5"
                >
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    {details.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="flex-shrink-0 mt-0.5">•</span>
                        <span className={d.includes("DUE") ? "text-red-600 font-semibold" : ""}>{d}</span>
                      </div>
                    ))}
                    {doc && (
                      <button className="flex items-center gap-2 mt-3 text-blue-700 text-sm font-semibold hover:underline">
                        <Download size={14} /> Download {doc}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Case info */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-navy mb-4">Case Information</h3>
            <dl className="space-y-3">
              {caseInfo.map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <dt className="text-gray-400 text-xs font-medium">{label}</dt>
                  <dd className="text-navy font-semibold text-sm mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-navy rounded-2xl p-5">
            <p className="text-gold font-heading font-bold mb-1">🎯 Success Probability</p>
            <div className="text-4xl font-heading font-black text-white mb-1">94%</div>
            <p className="text-white/60 text-xs">Based on your current profile strength and CRS score</p>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full" style={{ width: "94%" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
