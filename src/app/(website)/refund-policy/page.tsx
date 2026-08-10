"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign, RotateCcw, Clock, Shield, FileCheck,
  ChevronRight, CheckCircle2, XCircle, ArrowRight, HelpCircle, CalendarDays
} from "lucide-react";

const policyScenarios = [
  {
    scenario: "Before any work has started",
    timeframe: "Within 7 days of payment",
    refund: "100% Full Refund",
    processing: "2-3 business days",
    eligibility: true,
    notes: "No questions asked. Administrative fee of $50 may apply.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    scenario: "Work in progress (under 30%)",
    timeframe: "First 30 days",
    refund: "75% Partial Refund",
    processing: "3-5 business days",
    eligibility: true,
    notes: "Excludes 3rd-party fees paid (visas, universities, testing).",
    color: "from-blue-500 to-indigo-600",
  },
  {
    scenario: "Substantial work delivered (30-70%)",
    timeframe: "30 - 60 days",
    refund: "50% Partial Refund",
    processing: "5-7 business days",
    eligibility: true,
    notes: "Refund calculated based on completed milestones and hours.",
    color: "from-amber-500 to-orange-600",
  },
  {
    scenario: "Majority of work completed (>70%)",
    timeframe: "After 60 days",
    refund: "No Refund · Credit Note",
    processing: "Store credit only",
    eligibility: false,
    notes: "You'll receive a travel credit for future services valid 18 months.",
    color: "from-rose-500 to-red-600",
  },
  {
    scenario: "Visa application rejected (no fault)",
    timeframe: "Anytime during service",
    refund: "0% + Free Re-submission",
    processing: "Free redo",
    eligibility: true,
    notes: "If rejection not due to false client docs — full redo at NO extra cost.",
    color: "from-purple-500 to-violet-700",
  },
  {
    scenario: "Payment fraud / chargeback initiated",
    timeframe: "Anytime",
    refund: "Forfeited · Legal Action",
    processing: "N/A",
    eligibility: false,
    notes: "All services suspended; case passed to collections agency.",
    color: "from-red-600 to-rose-800",
  },
];

const paymentMethods = [
  { name: "Stripe (Cards)", processing: "Instant", fee: "2.9% + 30¢", refundable: true },
  { name: "PayPal", processing: "Instant", fee: "3.49% + fixed", refundable: true },
  { name: "Orange Money", processing: "Same-day", fee: "1.5%", refundable: true },
  { name: "MTN Mobile Money", processing: "Same-day", fee: "1.5%", refundable: true },
  { name: "Bank Transfer (Wire)", processing: "1-3 days", fee: "Sender pays", refundable: true },
  { name: "Cryptocurrency", processing: "30-60 min", fee: "Network gas", refundable: false },
];

export default function RefundPolicyPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white py-20 px-6 mb-16">
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
              <RotateCcw size={14} /> Refund Policy
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl mb-4">
              Fair & Transparent <span className="text-yellow-200">Refunds</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed mb-8">
              We stand behind our service. If we haven't delivered, you get your money back.
              This policy outlines every scenario clearly. Effective August 1, 2026.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/30 flex items-center justify-center"><Clock size={18} /></div>
                <div>
                  <p className="font-heading font-black text-2xl">7 Days</p>
                  <p className="text-xs text-white/75">100% money-back window</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-blue-400/30 flex items-center justify-center"><Shield size={18} /></div>
                <div>
                  <p className="font-heading font-black text-2xl">98%</p>
                  <p className="text-xs text-white/75">Clients never need refunds</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-purple-400/30 flex items-center justify-center"><DollarSign size={18} /></div>
                <div>
                  <p className="font-heading font-black text-2xl">3-7 Days</p>
                  <p className="text-xs text-white/75">Refund processing time</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-heading font-bold text-3xl text-navy mb-2">Refund Scenarios Explained</h2>
        <p className="text-gray-500 mb-8 text-lg">Every possible situation — clearly defined.</p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {policyScenarios.map((s, i) => (
            <motion.article
              key={s.scenario}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${s.color}`} />
              <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}>
                  {s.eligibility ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                </div>
                {s.eligibility ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
                    <FileCheck size={10} /> Eligible
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1">
                    <HelpCircle size={10} /> Conditions
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-navy text-lg leading-tight mb-2 relative z-10">{s.scenario}</h3>
              <div className="space-y-2.5 mb-4 relative z-10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Timeframe:</span>
                  <span className="font-semibold text-gray-600">{s.timeframe}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Processing:</span>
                  <span className="font-semibold text-gray-600">{s.processing}</span>
                </div>
              </div>
              <div className={`bg-gradient-to-r ${s.color} p-4 rounded-2xl text-white mb-4 relative z-10`}>
                <p className="text-[10px] uppercase tracking-wider font-black opacity-80">Refund Amount</p>
                <p className="font-heading font-black text-xl">{s.refund}</p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed relative z-10">{s.notes}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy mb-2">Refunds by Payment Method</h2>
          <p className="text-gray-500 mb-10 text-lg">How we refund based on how you paid.</p>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                  <tr>
                    <th className="text-left p-5 font-heading font-bold">Payment Method</th>
                    <th className="text-left p-5 font-heading font-bold">Refund Speed</th>
                    <th className="text-left p-5 font-heading font-bold">Fees</th>
                    <th className="text-left p-5 font-heading font-bold">Refundable</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((pm, i) => (
                    <motion.tr
                      key={pm.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="p-5 font-semibold text-navy">{pm.name}</td>
                      <td className="p-5 text-gray-600">{pm.processing}</td>
                      <td className="p-5 text-gray-600">{pm.fee}</td>
                      <td className="p-5">
                        {pm.refundable ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 size={11} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                            <XCircle size={11} /> No
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to Request */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="font-heading font-bold text-3xl text-navy mb-2">How to Request a Refund</h2>
        <p className="text-gray-500 mb-10 text-lg">4 simple steps. We'll keep you updated at every stage.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Send Email", desc: "Write to tessohmanuel@gmail.com with your invoice #", color: "from-blue-500 to-indigo-600", icon: CalendarDays },
            { step: "2", title: "Case Review", desc: "Team assesses milestones & completed work", color: "from-purple-500 to-violet-600", icon: FileCheck },
            { step: "3", title: "Calculation", desc: "Receive itemized breakdown & refund amount", color: "from-amber-500 to-orange-600", icon: DollarSign },
            { step: "4", title: "Payout", desc: "Refund sent to original method, receipt emailed", color: "from-emerald-500 to-teal-600", icon: RotateCcw },
          ].map(({ step, title, desc, color, icon: Icon }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-heading font-black shadow-lg`}>
                {step}
              </div>
              <div className="pt-6">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} opacity-10 flex items-center justify-center mb-4`}>
                  <Icon size={20} className={`bg-gradient-to-br ${color} bg-clip-text`} style={{ color: "#4f46e5" }} />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-blue-900 to-indigo-900 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-yellow-300 blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">Questions About Your Refund?</h2>
              <p className="text-white/85 text-lg mb-5">
                Talk to a human, not a bot. Our finance team will personally review your case within 1 business day.
              </p>
              <div className="space-y-2 text-white/80 text-sm">
                <p className="flex items-center gap-2"><ChevronRight size={14} className="text-yellow-300" /> Finance Dept: tessohmanuel@gmail.com</p>
                <p className="flex items-center gap-2"><ChevronRight size={14} className="text-yellow-300" /> WhatsApp/Call: +237 650 921 917</p>
                <p className="flex items-center gap-2"><ChevronRight size={14} className="text-yellow-300" /> Response time: 24h on business days</p>
              </div>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-navy font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Contact Finance Team <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
