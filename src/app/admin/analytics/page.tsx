"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, FileText, Globe, Calendar, Download, BarChart3, PieChart, LineChart } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights into your platform performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-navy transition-all"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: "$125,430", change: "+23.5%", positive: true, icon: DollarSign, color: "from-green-500 to-emerald-600" },
            { label: "New Clients", value: "234", change: "+12.3%", positive: true, icon: Users, color: "from-blue-500 to-blue-600" },
            { label: "Applications", value: "156", change: "-5.2%", positive: false, icon: FileText, color: "from-purple-500 to-purple-600" },
            { label: "Success Rate", value: "97.2%", change: "+2.1%", positive: true, icon: BarChart3, color: "from-orange-500 to-orange-600" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {metric.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-navy mb-1">{metric.value}</p>
              <p className="text-gray-500 text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-navy">Revenue Trend</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-navy text-white rounded-lg">Monthly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Weekly</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 45, 78, 52, 85, 60, 90, 75, 82, 68, 95, 88].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-navy to-blue-500 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Applications by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-navy">Applications by Country</h3>
              <Globe className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              {[
                { country: "Canada", count: 156, percentage: 52, flag: "🇨🇦", color: "bg-red-500" },
                { country: "France", count: 98, percentage: 33, flag: "🇫🇷", color: "bg-blue-500" },
                { country: "Luxembourg", count: 46, percentage: 15, flag: "🇱🇺", color: "bg-sky-500" },
              ].map((item) => (
                <div key={item.country} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.flag}</span>
                      <span className="font-medium text-navy">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{item.count} applications</span>
                      <span className="text-sm font-semibold text-navy">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visa Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-navy mb-4">Visa Types</h3>
            <div className="space-y-3">
              {[
                { type: "Student Visa", count: 89, color: "bg-blue-500" },
                { type: "Work Permit", count: 67, color: "bg-green-500" },
                { type: "Express Entry", count: 54, color: "bg-purple-500" },
                { type: "Family Sponsorship", count: 45, color: "bg-orange-500" },
                { type: "Business Visa", count: 32, color: "bg-pink-500" },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-700">{item.type}</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-navy mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {[
                { stage: "Website Visitors", count: 15000, rate: "100%" },
                { stage: "Consultation Booked", count: 3200, rate: "21%" },
                { stage: "Application Started", count: 1800, rate: "56%" },
                { stage: "Documents Submitted", count: 1200, rate: "67%" },
                { stage: "Visa Approved", count: 987, rate: "82%" },
              ].map((item, i) => (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.stage}</span>
                    <span className="font-semibold text-navy">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-navy to-blue-500 rounded-full"
                      style={{ width: item.rate }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Staff Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-navy mb-4">Staff Performance</h3>
            <div className="space-y-3">
              {[
                { name: "Aminata C.", cases: 45, success: "98%" },
                { name: "Jean-Pierre M.", cases: 38, success: "95%" },
                { name: "Marie L.", cases: 32, success: "97%" },
                { name: "Thomas D.", cases: 28, success: "94%" },
                { name: "Sophie R.", cases: 25, success: "96%" },
              ].map((staff) => (
                <div key={staff.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-navy text-sm">{staff.name}</p>
                    <p className="text-xs text-gray-500">{staff.cases} cases</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{staff.success}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
