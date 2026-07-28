"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, CheckCircle, Clock, AlertCircle, Search, Filter, Download } from "lucide-react";

type Payment = {
  id: string;
  clientName: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  method: "stripe" | "paypal" | "orange-money" | "mtn-momo";
  description: string;
  date: string;
  invoiceId?: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/payments`);
    if (!res.ok) return;
    const data = await res.json();
    setPayments(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Payments</h1>
          <p className="text-gray-500 mt-1">Manage all payment transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `${payments[0]?.currency || "$"}${totalRevenue.toLocaleString()}`, color: "bg-green-100 text-green-700" },
          { label: "Pending", value: `${payments[0]?.currency || "$"}${pendingAmount.toLocaleString()}`, color: "bg-yellow-100 text-yellow-700" },
          { label: "Transactions", value: payments.length, color: "bg-blue-100 text-blue-700" },
          { label: "Success Rate", value: "94%", color: "bg-purple-100 text-purple-700" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className={`font-heading font-bold text-2xl mt-1 ${stat.color.split(" ")[1]}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">All Transactions</h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No payment transactions</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment, i) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy">{payment.clientName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-navy">{payment.currency} {payment.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 capitalize">{payment.method.replace("-", " ")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{payment.description}</p>
                      {payment.invoiceId && (
                        <p className="text-blue-700 text-xs">#{payment.invoiceId}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
