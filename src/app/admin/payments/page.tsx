"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Eye, Download, Receipt, CreditCard, DollarSign, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");

  const payments = [
    { id: "PAY-001", client: "John Doe", amount: 2500, currency: "USD", method: "Stripe", status: "completed", date: "2024-01-15", invoice: "INV-001" },
    { id: "PAY-002", client: "Jane Smith", amount: 1800, currency: "USD", method: "PayPal", status: "completed", date: "2024-02-20", invoice: "INV-002" },
    { id: "PAY-003", client: "Mike Johnson", amount: 3200, currency: "USD", method: "Orange Money", status: "pending", date: "2024-03-10", invoice: "INV-003" },
    { id: "PAY-004", client: "Sarah Wilson", amount: 1500, currency: "USD", method: "MTN MoMo", status: "completed", date: "2024-01-05", invoice: "INV-004" },
    { id: "PAY-005", client: "Tom Brown", amount: 4200, currency: "USD", method: "Stripe", status: "failed", date: "2024-02-28", invoice: "INV-005" },
  ];

  const statusConfig = {
    completed: { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    failed: { label: "Failed", color: "bg-red-100 text-red-700", icon: XCircle },
    refunded: { label: "Refunded", color: "bg-gray-100 text-gray-700", icon: AlertCircle },
  };

  const methodConfig = {
    Stripe: { color: "bg-purple-100 text-purple-700", icon: CreditCard },
    PayPal: { color: "bg-blue-100 text-blue-700", icon: CreditCard },
    "Orange Money": { color: "bg-orange-100 text-orange-700", icon: CreditCard },
    "MTN MoMo": { color: "bg-yellow-100 text-yellow-700", icon: CreditCard },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Payments</h1>
            <p className="text-gray-600">Track and manage all payment transactions</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <Receipt size={20} />
            Generate Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: "$125,430", color: "from-green-500 to-emerald-600" },
            { label: "This Month", value: "$45,230", color: "from-blue-500 to-blue-600" },
            { label: "Pending", value: "$8,500", color: "from-yellow-500 to-yellow-600" },
            { label: "Refunded", value: "$2,100", color: "from-red-500 to-red-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
            >
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { method: "Stripe", amount: "$75,000", percentage: 60, color: "from-purple-500 to-purple-600" },
            { method: "PayPal", amount: "$32,000", percentage: 25, color: "from-blue-500 to-blue-600" },
            { method: "Orange Money", amount: "$12,000", percentage: 10, color: "from-orange-500 to-orange-600" },
            { method: "MTN MoMo", amount: "$6,430", percentage: 5, color: "from-yellow-500 to-yellow-600" },
          ].map((item, i) => (
            <motion.div
              key={item.method}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white`}
            >
              <p className="text-2xl font-bold mb-1">{item.amount}</p>
              <p className="text-white/80 text-sm mb-2">{item.method}</p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
              <p className="text-xs text-white/60 mt-1">{item.percentage}% of total</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search payments by ID, client, or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy transition-all"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-navy transition-all"
            >
              <option value="all">All Methods</option>
              <option value="Stripe">Stripe</option>
              <option value="PayPal">PayPal</option>
              <option value="Orange Money">Orange Money</option>
              <option value="MTN MoMo">MTN MoMo</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Payment ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Client</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Method</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Invoice</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, i) => {
                  const status = statusConfig[payment.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  const method = methodConfig[payment.method as keyof typeof methodConfig];
                  return (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-navy">{payment.id}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{payment.client}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-navy">${payment.amount.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm ml-1">{payment.currency}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${method.color}`}>
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600">{payment.invoice}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Download Receipt">
                            <Download size={18} />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
