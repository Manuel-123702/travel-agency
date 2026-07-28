"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  Receipt,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface PortalStats {
  totalPaid: number;
  pendingPayments: number;
  completedPayments: number;
  pendingInvoices: number;
}

export default function ClientPortal() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [stats, setStats] = useState<PortalStats>({
    totalPaid: 0,
    pendingPayments: 0,
    completedPayments: 0,
    pendingInvoices: 0,
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "receipts", label: "Receipts", icon: Receipt },
  ];

  useEffect(() => {
    fetchPortalData();
  }, []);

  const fetchPortalData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, invoicesRes, receiptsRes] = await Promise.all([
        fetch("/api/portal/payments"),
        fetch("/api/portal/invoices"),
        fetch("/api/portal/receipts"),
      ]);

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData.payments || []);
        setStats((prev) => ({
          ...prev,
          totalPaid: paymentsData.stats?.totalPaid || 0,
          pendingPayments: paymentsData.stats?.pendingPayments || 0,
          completedPayments: paymentsData.stats?.completedPayments || 0,
        }));
      }

      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData.invoices || []);
        setStats((prev) => ({
          ...prev,
          pendingInvoices: invoicesData.stats?.pendingInvoices || 0,
        }));
      }

      if (receiptsRes.ok) {
        const receiptsData = await receiptsRes.json();
        setReceipts(receiptsData.receipts || []);
      }
    } catch (error) {
      console.error("Error fetching portal data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || "Client"}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your immigration journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Paid</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        ${stats.totalPaid.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Payments</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        ${stats.pendingPayments.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed Payments</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stats.completedPayments}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Invoices</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stats.pendingInvoices}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {payments.slice(0, 3).map((payment: any) => (
                    <div
                      key={payment.id}
                      className="p-6 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.application?.visaType || "Payment"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(payment.createdAt).toLocaleDateString()} • {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Link
                    href="/portal/payments"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Payments
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment History
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {payments.map((payment: any) => (
                  <div
                    key={payment.id}
                    className="p-6 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          payment.status === "COMPLETED"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {payment.status === "COMPLETED" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.application?.visaType || "Payment"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.createdAt).toLocaleDateString()} • {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          payment.status === "COMPLETED"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Invoices
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {invoices.map((invoice: any) => (
                  <div
                    key={invoice.id}
                    className="p-6 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          invoice.payment?.status === "COMPLETED"
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {invoice.payment?.status === "COMPLETED" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(invoice.createdAt).toLocaleDateString()} • {invoice.application?.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          invoice.payment?.status === "COMPLETED"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {invoice.payment?.status === "COMPLETED" ? "PAID" : "PENDING"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "receipts" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Receipts
                </h2>
              </div>
              {receipts.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {receipts.map((receipt: any) => (
                    <div
                      key={receipt.id}
                      className="p-6 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Receipt className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {receipt.invoiceNumber || `Receipt #${receipt.id.slice(-6)}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(receipt.createdAt).toLocaleDateString()} • {receipt.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${receipt.amount.toLocaleString()}
                        </p>
                        {receipt.receiptUrl && (
                          <a
                            href={receipt.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Receipts will be available after payment completion
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
