"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, CheckCircle, Clock, Globe, Star, ArrowUpRight } from "lucide-react";

const monthlyData = [
  { month: "Jan", cases: 8, approved: 7, revenue: 22400 },
  { month: "Feb", cases: 10, approved: 9, revenue: 28000 },
  { month: "Mar", cases: 12, approved: 11, revenue: 33600 },
  { month: "Apr", cases: 9, approved: 9, revenue: 25200 },
  { month: "May", cases: 14, approved: 13, revenue: 39200 },
  { month: "Jun", cases: 16, approved: 15, revenue: 44800 },
];

const maxCases = Math.max(...monthlyData.map((d) => d.cases));

const advisors = [
  { name: "Aminata Coulibaly", cases: 28, rate: "98%", avg: "10 wks", rating: 4.9 },
  { name: "Khadija Benali", cases: 24, rate: "96%", avg: "11 wks", rating: 4.8 },
  { name: "Ibrahim Sow", cases: 19, rate: "95%", avg: "12 wks", rating: 4.7 },
];

const kpis = [
  { icon: Users, label: "Total Clients (2026)", value: "69", change: "+34% YoY", color: "blue" },
  { icon: CheckCircle, label: "Cases Approved", value: "64", change: "93% approval", color: "green" },
  { icon: TrendingUp, label: "Revenue (YTD)", value: "$193K", change: "+28% vs 2025", color: "purple" },
  { icon: Clock, label: "Avg. Processing", value: "11 wks", change: "Industry avg: 16", color: "orange" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">Analytics</h1>
        <p className="text-gray-500">Agency performance — January to June 2026</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(({ icon: Icon, label, value, change, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" : color === "purple" ? "bg-purple-100" : "bg-orange-100"
              }`}>
                <Icon size={18} className={
                  color === "blue" ? "text-blue-700" : color === "green" ? "text-green-600" : color === "purple" ? "text-purple-600" : "text-orange-600"
                } />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                <ArrowUpRight size={11} />{change}
              </span>
            </div>
            <p className="font-heading font-black text-3xl text-gray-900">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-gray-900">Monthly Cases</h2>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" />New Cases</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-green-500 inline-block" />Approved</span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {monthlyData.map(({ month, cases, approved }, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end gap-1 h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(cases / maxCases) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                    className="flex-1 bg-blue-200 rounded-t-lg"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(approved / maxCases) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.07, ease: "easeOut" }}
                    className="flex-1 bg-green-500 rounded-t-lg"
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">{month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Destination breakdown */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-heading font-bold text-gray-900 mb-5">By Destination</h2>
          <div className="space-y-4">
            {[
              { flag: "🇨🇦", name: "Canada", pct: 48, count: 33, color: "bg-red-500" },
              { flag: "🇫🇷", name: "France", pct: 33, count: 23, color: "bg-blue-600" },
              { flag: "🇱🇺", name: "Luxembourg", pct: 19, count: 13, color: "bg-sky-400" },
            ].map(({ flag, name, pct, count, color }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700">{flag} {name}</span>
                  <span className="text-sm font-bold text-gray-900">{count} <span className="text-gray-400 font-normal text-xs">({pct}%)</span></span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, delay: 0.5 }}
                    className={`h-full ${color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
            <h3 className="font-heading font-bold text-gray-900 text-sm mb-3">Visa Types</h3>
            {[
              { type: "Work Permit", count: 29, pct: 42 },
              { type: "Student Visa", count: 23, pct: 33 },
              { type: "Express Entry", count: 11, pct: 16 },
              { type: "Visitor Visa", count: 6, pct: 9 },
            ].map(({ type, count, pct }) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{type}</span>
                <span className="font-semibold text-gray-900">{count} <span className="text-gray-400 text-xs">({pct}%)</span></span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advisor performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-heading font-bold text-gray-900 mb-5">Advisor Performance (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Advisor", "Cases Handled", "Success Rate", "Avg. Processing", "Client Rating"].map((h) => (
                  <th key={h} className="text-left py-3 pr-6 text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {advisors.map(({ name, cases, rate, avg, rating }, i) => (
                <tr key={name} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-[#0A0F1E] flex items-center justify-center text-white text-xs font-bold">
                        {name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-gray-900 text-sm">{name}</p>
                        {i === 0 && <p className="text-gold text-xs font-semibold">Top Performer</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-6 font-bold text-gray-900">{cases}</td>
                  <td className="py-4 pr-6">
                    <span className="font-bold text-green-600">{rate}</span>
                  </td>
                  <td className="py-4 pr-6 text-gray-700">{avg}</td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="text-gold fill-gold" />
                      <span className="font-bold text-gray-900">{rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
