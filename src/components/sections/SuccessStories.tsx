"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { successStoriesData as defaultSuccessStoriesData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { successStoriesQuery } from "@/sanity/queries/successStories";

type SuccessStory = {
  name: string;
  country: string;
  category: string;
  result: string;
  description: string;
  image: string;
};

export default function SuccessStories() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(defaultSuccessStoriesData);

  useEffect(() => {
    async function fetchSuccessStories() {
      try {
        const data = await client.fetch(successStoriesQuery);
        if (data && data.length > 0) {
          setSuccessStories(data);
        }
      } catch (error) {
        console.error("Failed to fetch success stories:", error);
      }
    }
    fetchSuccessStories();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full mb-3 border border-blue-100"
          >
            <Sparkles size={14} className="text-gold" /> Proven Track Record
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-navy mb-4"
          >
            Real People. <span className="text-blue-700">Real Results.</span>
          </motion.h2>

          <p className="text-gray-600 text-lg">
            Explore recent approved cases and read inspiring client journeys across France, Canada, and Luxembourg.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map(({ name, country, category, result, description, image }, index) => {
            const slug = name.toLowerCase().replace(/\s+/g, "-") + "-" + country.toLowerCase().replace(/[^a-z]/g, "");
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  href={`/success-stories/${slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-bold bg-white/90 backdrop-blur-md text-navy px-3.5 py-1.5 rounded-full shadow-md">
                      <CheckCircle2 size={13} className="text-emerald-500" /> Approved
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold mb-3">
                      {category}
                    </span>

                    <h3 className="text-xl font-heading font-bold text-navy group-hover:text-blue-700 transition-colors">
                      {result}
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
                      {description}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="font-heading font-bold text-navy text-base">{name}</p>
                        <p className="text-xs text-gray-500 font-medium">{country}</p>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-700 text-blue-700 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-heading font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl hover:scale-105 text-sm"
          >
            Explore All Success Stories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}