"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, CheckCircle, Clock, AlertCircle, Plus, ArrowRight, Download } from "lucide-react";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  method: "stripe" | "paypal" | "orange-money" | "mtn-momo";
  description: string;
  date: string;
  invoiceId?: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  async function load() {
    const res = await fetch(`/api/payments`);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "pending": return Clock;
      case "failed": return AlertCircle;
      default: return Clock;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "stripe": return "Credit Card";
      case "paypal": return "PayPal";
      case "orange-money": return "Orange Money";
      case "mtn-momo": return "MTN MoMo";
      default: return method;
    }
  };

  const totalPaid = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-navy">Payments</h1>
          <p className="text-gray-500 mt-1">Manage your payment history and methods</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors">
          <Plus size={18} />
          Make Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Paid</p>
              <p className="font-heading font-bold text-2xl text-navy">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="font-heading font-bold text-2xl text-navy">${pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Transactions</p>
              <p className="font-heading font-bold text-2xl text-navy">{payments.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
      >
        <h2 className="font-heading font-bold text-navy text-lg mb-4">Payment Methods</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: "Credit Card", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
            { name: "PayPal", icon: DollarSign, color: "bg-yellow-100 text-yellow-700" },
            { name: "Orange Money", icon: CreditCard, color: "bg-orange-100 text-orange-700" },
            { name: "MTN MoMo", icon: CreditCard, color: "bg-yellow-100 text-yellow-700" },
          ].map((method) => (
            <button
              key={method.name}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-navy hover:bg-navy/5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                <method.icon size={24} />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-navy">{method.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-heading font-bold text-navy text-lg">Payment History</h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-500">No payment history</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {payments.map((payment, i) => {
              const StatusIcon = getStatusIcon(payment.status);
              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-bold text-navy">{payment.description}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{getMethodLabel(payment.method)}</span>
                        <span>•</span>
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                        {payment.invoiceId && (
                          <>
                            <span>•</span>
                            <span className="text-blue-700">Invoice #{payment.invoiceId}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-heading font-bold text-xl text-navy">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </p>
                      {payment.status === "completed" && (
                        <button className="p-2 text-gray-400 hover:text-navy transition-colors">
                          <Download size={18} />
                        </button>
                      )}
                      <StatusIcon className={payment.status === "completed" ? "text-green-600" : payment.status === "failed" ? "text-red-600" : "text-yellow-600"} size={20} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
