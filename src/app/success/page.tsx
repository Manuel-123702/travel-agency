"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  MessageSquare,
  FileText,
  Star,
  Download,
} from "lucide-react";

const packageDetails: Record<
  string,
  { name: string; advisor: string; firstStep: string }
> = {
  starter: {
    name: "Starter Pack",
    advisor: "Khadija Benali",
    firstStep: "Check your email for your document checklist.",
  },
  premium: {
    name: "Premium Pack",
    advisor: "Aminata Coulibaly",
    firstStep:
      "Your advisor will contact you within 24 hours to begin your file.",
  },
  vip: {
    name: "VIP Prestige",
    advisor: "Ibrahim Sow (Senior)",
    firstStep:
      "Your dedicated senior advisor will call you within 2 hours.",
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();

  const packageKey = searchParams.get("package") || "premium";
  const sessionId = searchParams.get("session_id");

  const pkg = packageDetails[packageKey] || packageDetails.premium;

  const [loadingInvoice, setLoadingInvoice] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);

  const downloadInvoice = async () => {
    if (!sessionId) {
      alert("Invoice not available.");
      return;
    }

    try {
      setLoadingInvoice(true);

      const response = await fetch(
        `/api/invoice/${sessionId}`
      );

      if (!response.ok) {
        throw new Error("Invoice not found");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${sessionId.slice(0, 8)}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to download invoice.");
    } finally {
      setLoadingInvoice(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200"
        >
          <CheckCircle size={48} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🎉 Payment Successful
          </div>

          <h1 className="font-heading font-black text-3xl md:text-4xl text-navy mb-3">
            Welcome to Travel Agency!
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Your <strong>{pkg.name}</strong> has been confirmed.
          </p>

          {sessionId && (
            <p className="text-xs text-gray-400 mt-2">
              Reference: {sessionId}
            </p>
          )}
        </motion.div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mb-6">
          <h2 className="font-bold text-lg mb-5">
            What happens next
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <CheckCircle className="text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Payment confirmed
                </h3>
                <p className="text-sm text-gray-500">
                  Your payment has been securely processed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MessageSquare className="text-blue-600" />
              <div>
                <h3 className="font-semibold">
                  Confirmation email
                </h3>
                <p className="text-sm text-gray-500">
                  A confirmation email has been sent.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FileText className="text-orange-600" />
              <div>
                <h3 className="font-semibold">
                  Your application is now active
                </h3>
                <p className="text-sm text-gray-500">
                  Our team will begin processing your case.
                </p>
              </div>
            </div>

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="bg-navy rounded-3xl p-6 mb-6"
        >
          <p className="text-white/60 text-sm">
            Assigned Advisor
          </p>

          <h3 className="text-white text-xl font-bold mt-1">
            {pkg.advisor}
          </h3>

          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>

          <p className="text-white/70 mt-4">
            {pkg.firstStep}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-gold text-navy font-bold py-4 rounded-2xl"
          >
            Go to Dashboard
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={downloadInvoice}
            disabled={loadingInvoice}
            className="flex items-center justify-center gap-2 bg-white border rounded-2xl py-4 font-bold hover:bg-gray-50 disabled:opacity-60"
          >
            <Download size={18} />

            {loadingInvoice
              ? "Generating PDF..."
              : "Download Invoice"}
          </button>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Questions? Contact our support team anytime.
        </p>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}