"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Receipt, Download, Eye, DollarSign, Calendar, Search, Filter, Send } from "lucide-react";

type Invoice = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issuedDate: string;
  description: string;
};

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  async function load() {
    const res = await fetch(`/api/admin/invoices`);
    if (!res.ok) return;
    const data = await res.json();
    setInvoices(data);
  }

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const totalDue = invoices
    .filter(i => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Invoices</h1>
          <p className="text-gray-500 mt-1">Manage all client invoices</p>
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
          <button className="flex items-center gap-2 bg-navy text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
            <Receipt size={16} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-navy to-blue-900 rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Outstanding</p>
            <p className="font-heading font-bold text-3xl">{invoices[0]?.currency || "$"} {totalDue.toLocaleString()}</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Receipt size={32} className="text-gold" />
          </div>
        </div>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">All Invoices</h2>
        </div>

        {invoices.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No invoices available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice, i) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-navy">{invoice.invoiceNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{invoice.clientName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-heading font-bold text-navy">{invoice.currency} {invoice.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Calendar size={14} />
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <Download size={18} />
                        </button>
                        {invoice.status !== "paid" && (
                          <button className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors">
                            <Send size={12} />
                            Remind
                          </button>
                        )}
                      </div>
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
