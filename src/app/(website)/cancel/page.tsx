"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { XCircle, ArrowLeft, Phone, MessageSquare, RefreshCw } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle size={40} className="text-orange-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-heading font-black text-3xl text-navy mb-3">Payment Cancelled</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            No worries — your card was <strong>not charged</strong>.
            You can go back and try again whenever you're ready.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 text-left">
            <h3 className="font-heading font-bold text-navy mb-3">Need help choosing a package?</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-600">•</span> Our free consultation call takes just 15 minutes</li>
              <li className="flex items-start gap-2"><span className="text-blue-600">•</span> All prices include a visa denial refund guarantee</li>
              <li className="flex items-start gap-2"><span className="text-blue-600">•</span> You can pay in installments — just ask your advisor</li>
              <li className="flex items-start gap-2"><span className="text-blue-600">•</span> Bank transfer is available as an alternative to card</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/pricing"
              className="flex items-center justify-center gap-2 bg-navy text-white font-heading font-bold py-3.5 rounded-2xl hover:bg-blue-800 hover:-translate-y-0.5 transition-all text-sm">
              <RefreshCw size={14} /> Try Again
            </Link>
            <a href="https://wa.me/15140000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading font-bold py-3.5 rounded-2xl hover:-translate-y-0.5 transition-all text-sm">
              <MessageSquare size={14} /> WhatsApp
            </a>
            <Link href="/contact"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-navy font-heading font-bold py-3.5 rounded-2xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all shadow-sm text-sm">
              <Phone size={14} /> Call Us
            </Link>
          </div>

          <Link href="/" className="inline-flex items-center gap-1.5 mt-6 text-gray-400 hover:text-navy text-sm transition-colors">
            <ArrowLeft size={14} /> Back to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
