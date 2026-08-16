"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, CheckCircle2, Award, Sparkles, Globe, Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { testimonialsData as defaultTestimonialsData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { testimonialsQuery } from "@/sanity/queries/testimonials";

type Testimonial = {
  name: string;
  role: string;
  country: string;
  visaType?: string;
  message: string;
  rating: number;
  avatar: string;
  image?: string;
  verified?: boolean;
};

const getVisaIcon = (visaType?: string) => {
  if (!visaType) return Globe;
  const lower = visaType.toLowerCase();
  if (lower.includes("student") || lower.includes("scholarship")) return GraduationCap;
  if (lower.includes("work") || lower.includes("blue card") || lower.includes("business")) return Briefcase;
  if (lower.includes("family") || lower.includes("reunification")) return Users;
  return Globe;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonialsData);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function fetchTestimonialsData() {
      try {
        const data = await client.fetch(testimonialsQuery);
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials data:", error);
      }
    }
    fetchTestimonialsData();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const filteredTestimonials = activeFilter === "all"
    ? testimonials
    : testimonials.filter((t) => t.country.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy bg-white px-5 py-2 rounded-full mb-6 border border-gray-200 shadow-sm"
          >
            <Award size={16} className="text-gold" /> Client Success Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-navy mb-6 leading-tight"
          >
            Real People. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Real Results.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Join thousands of successful applicants who trusted us with their immigration journey.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {[
              { id: "all", label: "All Destinations" },
              { id: "france", label: "🇫🇷 France" },
              { id: "canada", label: "🇨🇦 Canada" },
              { id: "luxembourg", label: "🇱🇺 Luxembourg" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-heading font-bold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-navy to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-navy hover:shadow-md"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Testimonials 2x3 Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => {
              const VisaIcon = getVisaIcon(item.visaType);
              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-bl-full -z-0" />
                  
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors w-14 h-14 -z-0" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 size={12} className="text-emerald-600" /> Verified
                      </span>
                    </div>

                    {/* Visa Category Tag */}
                    {item.visaType && (
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full mb-5 border border-blue-100">
                        <VisaIcon size={14} />
                        {item.visaType}
                      </div>
                    )}

                    {/* Message Quote */}
                    <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  {/* Client Profile Footer */}
                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100 relative z-10">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-gradient-to-br from-gold to-amber-500 flex-shrink-0 shadow-lg">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy to-blue-700 text-gold flex items-center justify-center font-bold text-xl">
                          {item.avatar}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-navy text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">
                        {item.role}
                      </p>
                      <p className="text-xs text-blue-600 font-bold mt-0.5">
                        {item.country}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "2,500+", label: "Success Stories" },
            { value: "97%", label: "Approval Rate" },
            { value: "3", label: "Destinations" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-md">
              <p className="font-heading font-black text-3xl text-navy">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}