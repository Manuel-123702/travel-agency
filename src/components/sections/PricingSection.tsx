"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Shield, Zap, CheckCircle2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";

import { pricingData as defaultPricingData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { pricingQuery } from "@/sanity/queries/pricing";

type Pricing = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  timeline?: string;
  color?: string;
};

const packageColors: Record<string, string> = {
  "Student Visa": "from-blue-500 to-indigo-600",
  "Work Permit": "from-amber-400 to-amber-500",
  "Visitor Visa": "from-slate-600 to-slate-800",
  "Business Visa": "from-emerald-500 to-teal-600",
  "Family Reunification": "from-purple-500 to-violet-600",
};

export default function PricingSection() {
  const [pricing, setPricing] = useState<Pricing[]>(defaultPricingData);

  useEffect(() => {
    async function fetchPricingData() {
      try {
        const data = await client.fetch(pricingQuery);
        if (data && data.length > 0) {
          setPricing(data);
        }
      } catch (error) {
        console.error("Failed to fetch pricing data:", error);
      }
    }
    fetchPricingData();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-blue-700 font-semibold text-sm uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-blue-100"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-navy mb-4"
          >
            Choose Your Immigration <span className="text-gold">Package</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            No hidden fees. Full expert guidance from profile evaluation to visa approval.
          </motion.p>
        </div>

        {/* Pricing Grid - 5 Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricing.map((plan, index: number) => {
            const gradientColor = packageColors[plan.name] || "from-blue-600 to-navy";
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-3xl bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isPopular
                    ? "border-2 border-gold shadow-2xl scale-[1.02] z-10"
                    : "border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Popular Badge Header */}
                {isPopular && (
                  <div className="bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-navy font-heading font-bold text-xs uppercase tracking-widest text-center py-2 px-4 flex items-center justify-center gap-1.5">
                    <Star size={14} className="fill-navy" /> Most Popular Choice
                  </div>
                )}

                {/* Card Header Gradient */}
                <div className={`p-8 bg-gradient-to-r ${gradientColor} text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-2xl">{plan.name}</h3>
                    {isPopular && (
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Best Value
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-white/80">From</span>
                    <span className="text-4xl font-heading font-extrabold">${plan.price}</span>
                    <span className="text-xs text-white/70">USD / full case</span>
                  </div>
                  {plan.timeline && (
                    <div className="mt-3 text-xs text-white/90 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Estimated Timeline: {plan.timeline}
                    </div>
                  )}
                </div>

                {/* Card Body & Features */}
                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-4 mb-8">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Included In Package:
                    </p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/pricing?package=${encodeURIComponent(plan.name.toLowerCase().replace(" ", "-"))}`}
                    className={`w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      isPopular
                        ? "bg-navy text-white hover:bg-blue-950 hover:shadow-xl hover:scale-[1.02]"
                        : "bg-gray-100 text-navy hover:bg-navy hover:text-white"
                    }`}
                  >
                    Select {plan.name} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Guarantee Bar */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 shadow-md flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-bold">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-navy text-lg">100% Transparent Service Agreement</h4>
              <p className="text-gray-500 text-sm">No hidden costs or unexpected charges during your application processing.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-50 text-blue-700 font-heading font-bold rounded-xl hover:bg-blue-100 transition-colors text-sm"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </section>
  );
}