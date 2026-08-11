"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { faqData as defaultFaqData } from "@/data/home";
import { client } from "@/sanity/lib/client";
import { faqQuery } from "@/sanity/queries/faq";

type FAQ = {
  question: string;
  answer: string;
  category?: string;
};

const categories = ["All", "General", "Visa Process", "Documents", "Payments", "Post-Arrival"];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchFaqData() {
      try {
        const data = await client.fetch(faqQuery);
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQ data:", error);
      }
    }
    fetchFaqData();
  }, []);

  const [open, setOpen] = useState<number | null>(0);

  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  // Add categories to FAQs
  const categorizedFaqs = faqs.map((faq, index) => ({
    ...faq,
    category: index < 3 ? "General" : index < 6 ? "Visa Process" : index < 9 ? "Documents" : index < 12 ? "Payments" : "Post-Arrival"
  }));

  // Filter FAQs based on search and category
  const filteredFaqs = categorizedFaqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors: Record<string, string> = {
    "General": "from-blue-500 to-blue-600",
    "Visa Process": "from-purple-500 to-purple-600",
    "Documents": "from-green-500 to-green-600",
    "Payments": "from-gold to-yellow-600",
    "Post-Arrival": "from-pink-500 to-pink-600",
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-6"
          >
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-title mt-4 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about immigration, visas, and our services. Can't find what you're looking for? Contact us directly.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Questions */}
        <div className="space-y-3">
          {filteredFaqs.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left group"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${categoryColors[item.category || "General"]} flex-shrink-0 mt-1`} />
                  <div className="flex-1">
                    {item.category && (
                      <span className={`text-xs font-semibold bg-gradient-to-r ${categoryColors[item.category]} text-white px-2 py-0.5 rounded-full mb-2 inline-block`}>
                        {item.category}
                      </span>
                    )}
                    <span className="font-heading font-semibold text-navy block group-hover:text-blue-700 transition-colors">
                      {item.question}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 pl-9 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No questions found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}