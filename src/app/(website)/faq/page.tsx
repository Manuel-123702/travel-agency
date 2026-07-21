import type { Metadata } from "next";
import FAQSection from "@/components/sections/FAQSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | Travel Agency",
  description: "Answers to the most common questions about immigration to France, Canada, and Luxembourg.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">FAQ</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Everything you need to know about immigration with Travel Agency — answered by our certified experts.
          </p>
        </div>
      </section>
      <FAQSection />
      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/60 mb-8">
            Our experts are available 7 days a week to answer your specific questions.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy font-heading font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all">
            Contact Our Team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
