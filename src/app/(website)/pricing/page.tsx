"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  AlertCircle,
} from "lucide-react";
import { Suspense } from "react";

const packages = [
  {
    key: "starter" as const,
    name: "Starter Pack",
    tagline: "Perfect for visitor visas & initial guidance",
    price: 490,
    badge: null,
    color: "border-gray-200",
    headerBg: "bg-gray-50",
    btnClass: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5",
    icon: Shield,
    features: [
      "Free profile evaluation",
      "Document checklist tailored to your case",
      "1 advisory call (45 minutes)",
      "Application form review",
      "Basic interview tips PDF",
      "Email support — 72h response",
      "Access to client portal",
      "Refund if visa denied*",
    ],
    notIncluded: [
      "Full file preparation",
      "Advisor-managed submissions",
      "Interview coaching sessions",
      "Priority support",
    ],
    ideal: "Visitor visa, short stays, simple cases",
    timeline: "Est. 4–6 weeks processing",
  },
  {
    key: "premium" as const,
    name: "Premium Pack",
    tagline: "Our most popular — student visa & work permit",
    price: 990,
    badge: "Most Popular",
    color: "border-blue-500",
    headerBg: "bg-navy",
    btnClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-navy hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5",
    icon: Star,
    features: [
      "Everything in Starter",
      "Full document collection & review",
      "Complete application preparation",
      "Advisor-managed submissions",
      "2 interview coaching sessions",
      "WhatsApp direct support line",
      "Priority email — 24h response",
      "Case tracker dashboard access",
      "Post-approval relocation guide",
      "Refund guarantee if visa denied*",
    ],
    notIncluded: [
      "Express Entry optimization",
      "Multiple destination filing",
      "Dedicated senior advisor",
    ],
    ideal: "Student visa, work permit, long-stay visa",
    timeline: "Est. 8–12 weeks processing",
  },
  {
    key: "vip" as const,
    name: "VIP Prestige",
    tagline: "White-glove, end-to-end premium service",
    price: 1990,
    badge: "Best Results",
    color: "border-gold",
    headerBg: "bg-gradient-to-br from-[#0A0F1E] to-blue-900",
    btnClass: "bg-gradient-to-r from-amber-400 to-amber-500 text-navy hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:-translate-y-0.5",
    icon: Zap,
    features: [
      "Everything in Premium",
      "Dedicated senior advisor (named)",
      "Express Entry CRS optimization",
      "Multiple destination strategy",
      "Unlimited advisory calls",
      "24/7 WhatsApp emergency line",
      "4 interview coaching sessions",
      "Family member included at 50% off",
      "Travel & accommodation guidance",
      "Post-arrival settlement support",
      "Full refund if visa denied*",
      "Priority processing — fast-track",
    ],
    notIncluded: [],
    ideal: "Express Entry, PR, complex cases, families",
    timeline: "Est. 10–16 weeks processing",
  },
];

const faqs = [
  {
    q: "When do I pay?",
    a: "Payment is due upfront to open your file. We accept all major credit/debit cards and bank transfers via Stripe — fully secure.",
  },
  {
    q: "What if my visa is denied?",
    a: "We offer a refund guarantee on all packages. If your visa is denied despite following our guidance, you receive a full refund of service fees (government fees excluded).",
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes — you can upgrade from Starter to Premium or VIP at any time. You'll only pay the difference.",
  },
  {
    q: "Are government fees included?",
    a: "No — government filing fees (e.g. $1,365 CAD for Express Entry) are separate and paid directly to the immigration authority. We guide you through every step.",
  },
  {
    q: "How do I get started after payment?",
    a: "Immediately after payment, you receive a welcome email with login access to your client portal. Your advisor contacts you within 24 hours.",
  },
];

function PricingContent() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const { isSignedIn, isLoaded } = useAuth();

  const handleCheckout = async (packageKey: "starter" | "premium" | "vip") => {
    setLoading(packageKey);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        // If no application exists, redirect to create one
        if (data.error === "Please create an application first.") {
          router.push("/dashboard?newApplication=true&package=" + packageKey);
          return;
        }
        throw new Error(data.error || "Something went wrong");
      }
      if (data.url) window.location.href = data.url;
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
      );
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gold/5" />{" "}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {cancelled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full px-5 py-2.5 text-sm font-medium mb-6"
            >
              <AlertCircle size={15} /> Payment was cancelled — your card was
              not charged.
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Star size={13} className="fill-gold" /> Transparent, one-time
              pricing
            </span>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-5 leading-tight">
              Choose Your <span className="text-gold">Immigration</span> Package
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Flat-fee service. No hidden costs. No surprises. Our advisors
              handle everything — you focus on your future.
            </p>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-white/50 text-sm"
          >
            {[
              { icon: Shield, text: "Visa denial refund guarantee" },
              { icon: CheckCircle, text: "97% success rate" },
              { icon: Clock, text: "2,500+ cases approved" },
              { icon: Star, text: "4.9/5 client rating" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold" /> {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 mb-8 max-w-lg mx-auto"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              const isLoading = loading === pkg.key;
              const isPopular = pkg.badge === "Most Popular";

              return (
                <motion.div
                  key={pkg.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-3xl border-2 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${pkg.color} ${
                    isPopular
                      ? "lg:-translate-y-4 lg:scale-[1.02] shadow-xl"
                      : ""
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                          pkg.badge === "Most Popular"
                            ? "bg-gold text-navy"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className={`${pkg.headerBg} p-7`}>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                        isPopular ? "bg-white/20" : "bg-navy/10"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={isPopular ? "text-white" : "text-navy"}
                      />
                    </div>
                    <h2
                      className={`font-heading font-black text-2xl mb-1 ${
                        pkg.key === "vip" || isPopular
                          ? "text-white"
                          : "text-navy"
                      }`}
                    >
                      {pkg.name}
                    </h2>
                    <p
                      className={`text-sm leading-snug mb-5 ${
                        pkg.key === "vip" || isPopular
                          ? "text-white/60"
                          : "text-gray-500"
                      }`}
                    >
                      {pkg.tagline}
                    </p>
                    <div className="flex items-end gap-2">
                      <span
                        className={`font-heading font-black text-4xl ${
                          pkg.key === "vip" || isPopular
                            ? "text-white"
                            : "text-navy"
                        }`}
                      >
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-sm pb-1 ${
                          pkg.key === "vip" || isPopular
                            ? "text-white/50"
                            : "text-gray-400"
                        }`}
                      >
                        USD · one-time
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        pkg.key === "vip" || isPopular
                          ? "text-white/40"
                          : "text-gray-400"
                      }`}
                    >
                      <Clock size={10} className="inline mr-1" />
                      {pkg.timeline}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="p-7">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      What's included
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-gray-700"
                        >
                          <CheckCircle
                            size={15}
                            className="text-green-500 flex-shrink-0 mt-0.5"
                          />
                          <span
                            className={
                              f.includes("guarantee") || f.includes("Refund")
                                ? "font-semibold"
                                : ""
                            }
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {pkg.notIncluded.length > 0 && (
                      <>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">
                          Not included
                        </p>
                        <ul className="space-y-2 mb-6">
                          {pkg.notIncluded.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2.5 text-sm text-gray-300"
                            >
                              <span className="mt-0.5 flex-shrink-0">✕</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="border-t border-gray-100 pt-5 mb-5">
                      <p className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-600">
                          Ideal for:
                        </span>{" "}
                        {pkg.ideal}
                      </p>
                    </div>
                    {!isLoaded ? (
                      <button
                        disabled
                        className="w-full py-4 rounded-2xl bg-gray-300"
                      >
                        Loading...
                      </button>
                    ) : !isSignedIn ? (
                      <SignInButton mode="modal">
                        <button
                          className={`w-full py-4 rounded-2xl font-heading font-bold ${pkg.btnClass}`}
                        >
                          Sign in to Continue
                        </button>
                      </SignInButton>
                    ) : (
                      <button
                        onClick={() => handleCheckout(pkg.key)}
                        disabled={!!loading}
                        className={`w-full py-4 rounded-2xl font-heading font-bold ${pkg.btnClass}`}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Proceed to Payment
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    )}{" "}
                    <p className="text-center text-xs text-gray-400 mt-3">
                      🔒 Secure checkout via Stripe
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-400 text-sm mt-8"
          >
            * Refund applies to agency service fees only. Government filing fees
            are non-refundable. Conditions apply — see our{" "}
            <a href="/terms" className="text-blue-700 hover:underline">
              Terms of Service
            </a>
            .
          </motion.p>
        </div>
      </section>

      {/* Custom quote CTA */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-navy text-xl">
              Not sure which package fits you?
            </h3>
            <p className="text-gray-500 mt-1">
              Book a free 15-minute call — we'll recommend the right path for
              your profile.
            </p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 flex items-center gap-2 bg-navy text-white font-heading font-bold px-7 py-4 rounded-2xl hover:bg-blue-800 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            <Phone size={16} /> Free Consultation
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-navy text-3xl text-center mb-10">
            Pricing FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-heading font-bold text-navy mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
