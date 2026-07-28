"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Receipt, Download, Eye, DollarSign, Calendar, FileText, Search, Filter } from "lucide-react";

type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  issuedDate: string;
  description: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  async function load() {
    const res = await fetch(`/api/invoices`);
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
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Invoices</h1>
          <p className="text-gray-500 mt-1">View and download your invoices</p>
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

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-navy to-blue-900 rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Amount Due</p>
            <p className="font-heading font-bold text-3xl">{invoices[0]?.currency || "$"} {totalDue.toLocaleString()}</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Receipt size={32} className="text-gold" />
          </div>
        </div>
        {totalDue > 0 && (
          <button className="mt-4 flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-gold/30 transition-all">
            <DollarSign size={18} />
            Pay Now
          </button>
        )}
      </motion.div>

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
          <div className="divide-y divide-gray-100">
            {invoices.map((invoice, i) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-navy">{invoice.invoiceNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{invoice.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText size={14} />
                        Issued: {new Date(invoice.issuedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-heading font-bold text-xl text-navy">
                      {invoice.currency} {invoice.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                        <Eye size={14} />
                        View
                      </button>
                      <button className="flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
