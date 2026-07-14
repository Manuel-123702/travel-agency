"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  DollarSign,
  Building,
  Plane,
  Compass,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

interface VisaType {
  name: string;
  duration: string;
  renewable: boolean;
  description: string;
}

interface University {
  name: string;
  city: string;
  ranking: string;
}

interface CostOfLiving {
  rent: string;
  food: string;
  transport: string;
  utilities: string;
  total: string;
}

interface SalaryRange {
  sector: string;
  range: string;
}

interface CountryData {
  slug: string;
  flag: string;
  name: string;
  capital: string;
  region: string;
  language: string;
  currency: string;
  population: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  bgGradient: string;
  visaTypes: VisaType[];
  topUniversities: University[];
  costOfLiving: CostOfLiving;
  salaryRanges: SalaryRange[];
  processingTime: string;
  successRate: string;
  requirements: string[];
  faq: { q: string; a: string }[];
}

export default function CountryDetailClient({ country }: { country: CountryData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: Compass },
    { id: "visas", label: "Visa Pathways", icon: Plane },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "cost", label: "Cost of Living", icon: DollarSign },
    { id: "jobs", label: "Job Market", icon: Briefcase },
    { id: "requirements", label: "Requirements", icon: CheckCircle2 },
    { id: "faq", label: "FAQs", icon: HelpCircle },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Banner */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={country.heroImage}
            alt={country.name}
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-[10s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-between pt-28 pb-12">
          {/* Back button */}
          <div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/10"
            >
              <ArrowLeft size={16} /> Back to Destinations
            </Link>
          </div>

          {/* Country Title Card */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4 text-white text-sm font-bold"
            >
              <span className="text-xl">{country.flag}</span>
              <span>{country.region}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black text-5xl md:text-7xl text-white tracking-tight"
            >
              Immigrate to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">
                {country.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-xl font-medium mt-3"
            >
              {country.tagline}
            </motion.p>
          </div>

          {/* Quick Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl"
          >
            {[
              { icon: CheckCircle2, label: "Visa Success", value: country.successRate, color: "text-green-400" },
              { icon: Clock, label: "Processing Time", value: country.processingTime, color: "text-yellow-400" },
              { icon: Building, label: "Capital City", value: country.capital, color: "text-blue-400" },
              { icon: Globe, label: "Language", value: country.language, color: "text-purple-400" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-white/10 ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-white font-bold text-base leading-tight mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200/80 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 relative ${
                    isActive ? "text-[#0F172A] border-amber-500" : "text-gray-500 border-transparent hover:text-[#0F172A]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-amber-500" : "text-gray-400"} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Tab Content */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Area */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* 1. OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/40 space-y-6">
                    <h2 className="font-heading font-black text-3xl text-[#0F172A]">About {country.name}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{country.description}</p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Currency</span>
                        <p className="text-[#0F172A] font-extrabold text-xl mt-1">{country.currency}</p>
                      </div>
                      <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Population</span>
                        <p className="text-[#0F172A] font-extrabold text-xl mt-1">{country.population}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VISA PATHWAYS */}
                {activeTab === "visas" && (
                  <div className="space-y-6">
                    <h2 className="font-heading font-black text-3xl text-[#0F172A] mb-2">Available Visa Categories</h2>
                    <div className="grid gap-6">
                      {country.visaTypes.map((visa, i) => (
                        <motion.div
                          key={visa.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-100/40 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl hover:border-gray-200/50 transition-all duration-300"
                        >
                          <div className="space-y-2 max-w-xl">
                            <h3 className="font-heading font-bold text-xl text-[#0F172A]">{visa.name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{visa.description}</p>
                          </div>
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1.5 flex-shrink-0">
                            <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                              Duration: {visa.duration}
                            </span>
                            <span
                              className={`font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
                                visa.renewable ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                              }`}
                            >
                              {visa.renewable ? "Renewable" : "Non-Renewable"}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. EDUCATION */}
                {activeTab === "education" && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/40 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h2 className="font-heading font-black text-2xl text-[#0F172A]">Top Educational Institutions</h2>
                        <p className="text-gray-400 text-sm">Highly ranked universities popular with international students.</p>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {country.topUniversities.map((uni) => (
                        <div key={uni.name} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-heading font-bold text-[#0F172A] text-lg">{uni.name}</p>
                            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                              <MapPin size={12} className="text-gray-400" /> {uni.city}
                            </p>
                          </div>
                          <span className="bg-amber-500/10 text-[#0F172A] font-extrabold text-sm px-3.5 py-1.5 rounded-xl whitespace-nowrap">
                            {uni.ranking}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. COST OF LIVING */}
                {activeTab === "cost" && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/40 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <h2 className="font-heading font-black text-2xl text-[#0F172A]">Estimated Cost of Living</h2>
                        <p className="text-gray-400 text-sm">Average monthly expenses for international residents.</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Accommodation (Rent)", value: country.costOfLiving.rent },
                        { label: "Food & Groceries", value: country.costOfLiving.food },
                        { label: "Local Transport", value: country.costOfLiving.transport },
                        { label: "Utilities & Internet", value: country.costOfLiving.utilities },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5">
                          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                          <p className="text-[#0F172A] font-extrabold text-lg mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#0F172A] to-[#1E40AF] text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                      <div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Total Recommended Budget</p>
                        <p className="text-2xl font-black mt-1 text-amber-500">{country.costOfLiving.total}</p>
                      </div>
                      <p className="text-white/70 text-sm max-w-xs leading-relaxed">
                        Values are estimates and can vary significantly depending on city and lifestyle.
                      </p>
                    </div>
                  </div>
                )}

                {/* 5. JOB MARKET */}
                {activeTab === "jobs" && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/40 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h2 className="font-heading font-black text-2xl text-[#0F172A]">Job Market & Salaries</h2>
                        <p className="text-gray-400 text-sm">Average salary ranges across key professional sectors.</p>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {country.salaryRanges.map((salary) => (
                        <div key={salary.sector} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <span className="font-heading font-bold text-[#0F172A] text-lg">{salary.sector}</span>
                          <span className="bg-purple-50 text-purple-700 font-extrabold text-sm px-4 py-2 rounded-xl">
                            {salary.range}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. REQUIREMENTS */}
                {activeTab === "requirements" && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/40 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <h2 className="font-heading font-black text-2xl text-[#0F172A]">Document Checklists</h2>
                        <p className="text-gray-400 text-sm">Mandatory documentation required for visa applications.</p>
                      </div>
                    </div>

                    <div className="grid gap-4 mt-6">
                      {country.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50/50 transition-colors">
                          <div className="bg-blue-50 text-blue-600 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{req}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. FAQS */}
                {activeTab === "faq" && (
                  <div className="space-y-4">
                    <h2 className="font-heading font-black text-3xl text-[#0F172A] mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                      {country.faq.map((item, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                          <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                              className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-[#0F172A] gap-4"
                            >
                              <span>{item.q}</span>
                              <ChevronDown
                                size={18}
                                className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                                    {item.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar CTA Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1a2744] to-[#1E40AF] text-white rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

              <div className="relative space-y-6">
                <div>
                  <span className="text-amber-500 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full">
                    Free Consultation
                  </span>
                  <h3 className="font-heading font-black text-3xl mt-4 leading-tight">
                    Start Your Journey to {country.name}
                  </h3>
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">
                    Our dedicated immigration consultants specialize in {country.name} study, work, and residence pathways. Speak to our team for a personal assessment.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-semibold">97% Success Rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-semibold">Step-by-Step Case Management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-semibold">Direct Visa Officer Communication</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-4"
                >
                  Book Free Assessment <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-100/40">
              <h4 className="font-heading font-bold text-navy text-lg mb-4">Other Services</h4>
              <div className="space-y-3">
                {[
                  { name: "Student Placements", link: "/services#student" },
                  { name: "Global Work Permits", link: "/services#work" },
                  { name: "Investment & Business", link: "/services#business" },
                ].map((srv) => (
                  <Link
                    key={srv.name}
                    href={srv.link}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-navy text-sm font-semibold transition-all group"
                  >
                    <span>{srv.name}</span>
                    <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 group-hover:text-amber-500 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
