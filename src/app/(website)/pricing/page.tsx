"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Star,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Suspense } from "react";

const packages = [
  {
    key: "student" as const,
    name: "Student Visa",
    tagline: "Complete support for international students",
    price: 650,
    badge: null,
    color: "from-blue-500 to-blue-600",
    icon: Shield,
    features: [
      "University & college research",
      "Admissions application assistance",
      "Student dossier preparation",
      "Student visa application",
      "CAQ application for Quebec",
      "Study Permit application",
      "Scholarship research",
      "Pre-departure orientation",
    ],
    ideal: "Students pursuing education abroad",
    timeline: "8–12 weeks",
  },
  {
    key: "work" as const,
    name: "Work Permit",
    tagline: "Build your international career",
    price: 950,
    badge: "Popular",
    color: "from-amber-400 to-amber-500",
    icon: Star,
    features: [
      "Professional profile assessment",
      "Express Entry optimization",
      "Provincial Nominee Program guidance",
      "Talent Passport applications",
      "EU Blue Card applications",
      "Work permit applications",
      "Job market guidance",
      "Credential recognition",
    ],
    ideal: "Professionals seeking international work",
    timeline: "10–16 weeks",
  },
  {
    key: "visitor" as const,
    name: "Visitor Visa",
    tagline: "Travel with confidence",
    price: 350,
    badge: null,
    color: "from-gray-400 to-gray-500",
    icon: Zap,
    features: [
      "Schengen visa applications",
      "Canadian Temporary Resident Visa",
      "Tourist visa applications",
      "Family reunion visitor visas",
      "Business visitor applications",
      "Invitation letter preparation",
      "Financial documentation",
      "Refusal case recovery",
    ],
    ideal: "Tourists, business travelers",
    timeline: "4–8 weeks",
  },
  {
    key: "business" as const,
    name: "Business Visa",
    tagline: "Entrepreneur & investor immigration",
    price: 1500,
    badge: null,
    color: "from-green-500 to-green-600",
    icon: Shield,
    features: [
      "Business plan development",
      "Company registration",
      "Investor visa applications",
      "Entrepreneur visa applications",
      "Immigration pathway planning",
      "Financial documentation",
      "Market research",
      "Legal compliance guidance",
    ],
    ideal: "Entrepreneurs and investors",
    timeline: "12–20 weeks",
  },
  {
    key: "family" as const,
    name: "Family Reunification",
    tagline: "Bring your family together",
    price: 1200,
    badge: null,
    color: "from-purple-500 to-purple-600",
    icon: Star,
    features: [
      "Sponsorship eligibility assessment",
      "Spouse & partner applications",
      "Parent & grandparent sponsorship",
      "Dependent child visa applications",
      "EU family reunification",
      "Super visa applications",
      "Financial requirements assessment",
      "Relationship documentation",
    ],
    ideal: "Families seeking reunification",
    timeline: "12–24 weeks",
  },
];

const faqs = [
  {
    q: "How do I get started?",
    a: "Contact us via WhatsApp or fill out the contact form. We'll schedule a free consultation to discuss your needs and provide a personalized quote.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers and other secure payment methods. Payment details will be discussed during your consultation.",
  },
  {
    q: "Can I get a custom quote?",
    a: "Yes — every case is unique. Contact us for a personalized assessment and quote based on your specific situation.",
  },
  {
    q: "Are government fees included?",
    a: "No — government filing fees (e.g. $1,365 CAD for Express Entry) are separate and paid directly to the immigration authority. We guide you through every step.",
  },
  {
    q: "How long does the process take?",
    a: "Processing times vary by visa type and country. Student visas typically take 8-12 weeks, work permits 10-16 weeks, and family reunification 12-24 weeks.",
  },
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleContact = (packageKey: string, price: number) => {
    const whatsappNumber = "237650921917";
    const message = encodeURIComponent(`Hello, I'm interested in the ${packageKey} package ($${price}). I'd like to discuss pricing and details.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-navy mb-4">
            Choose Your Package
          </h1>
          <p className="text-gray-600 text-lg">
            Professional immigration services tailored to your needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              const isPopular = pkg.badge === "Popular";

              return (
                <motion.div
                  key={pkg.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${
                    isPopular ? "border-amber-400 shadow-lg" : "border-gray-200"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8 pt-12">
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-navy text-center mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-500 text-center text-sm mb-6">
                      {pkg.tagline}
                    </p>

                    <div className="text-center mb-8">
                      <span className="font-heading font-bold text-5xl text-navy">
                        ${pkg.price}
                      </span>
                      <span className="text-gray-400 text-sm">/one-time</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleContact(pkg.name, pkg.price)}
                      className={`w-full py-4 rounded-xl font-heading font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 ${
                        isPopular
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl"
                          : `bg-gradient-to-r ${pkg.color} hover:opacity-90`
                      }`}
                    >
                      Get Started
                    </button>

                    <div className="mt-6 text-center">
                      <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
                        <Clock size={12} />
                        {pkg.timeline} processing time
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-navy text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-heading font-bold text-navy mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-navy">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-heading font-bold text-3xl mb-4">
            Not sure which package is right for you?
          </h2>
          <p className="text-white/80 mb-8">
            Contact us for a free consultation and personalized recommendation
          </p>
          <button
            onClick={() => window.open("https://wa.me/237650921917", "_blank")}
            className="inline-flex items-center gap-2 bg-gold text-navy font-heading font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors"
          >
            <Phone size={20} />
            Contact on WhatsApp
          </button>
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
