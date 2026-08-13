"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, CheckCircle2, Award, Sparkles } from "lucide-react";
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full mb-3 border border-blue-100"
          >
            <Award size={14} className="text-gold" /> Client Wall of Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-navy mb-4"
          >
            Trusted by Thousands of <span className="text-blue-700">Successful Applicants</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Real stories from students, skilled professionals, and families who achieved their dreams abroad.
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {[
              { id: "all", label: "All Destinations" },
              { id: "france", label: "🇫🇷 France" },
              { id: "canada", label: "🇨🇦 Canada" },
              { id: "luxembourg", label: "🇱🇺 Luxembourg" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all ${
                  activeFilter === filter.id
                    ? "bg-navy text-gold shadow-md scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-navy"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials 2x3 Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between relative group"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 text-gray-100 group-hover:text-blue-100 transition-colors w-12 h-12 -z-0" />

                <div className="relative z-10">
                  {/* Star Rating & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={12} className="text-emerald-600" /> Verified Visa Approval
                    </span>
                  </div>

                  {/* Visa Category Tag */}
                  {item.visaType && (
                    <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
                      {item.visaType}
                    </span>
                  )}

                  {/* Message Quote */}
                  <p className="text-gray-700 text-base leading-relaxed italic mb-6">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Client Profile Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 relative z-10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0 shadow-md">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy text-gold flex items-center justify-center font-bold text-lg">
                        {item.avatar}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy text-base flex items-center gap-1.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.role} · <span className="font-bold text-navy">{item.country}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}