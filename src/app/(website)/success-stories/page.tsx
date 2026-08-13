"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Award, Quote, ChevronRight, Globe, GraduationCap,
  ArrowRight, Briefcase, Heart, CheckCircle2, PlayCircle, Users, Star, MapPin
} from "lucide-react";

const stories = [
  {
    name: "Nkeng A.",
    from: "🇨🇲 Cameroon",
    to: "🇨🇦 Canada",
    visa: "Express Entry FSW",
    approved: "6 months",
    story: "I was skeptical about agencies after a previous bad experience. The team did a thorough evaluation, spotted I could get 55 more CRS points with a simple credential upgrade, and coached my interview. My PR was approved on first submission — no interview! 6 months start to finish. I'm writing this from my new home in Toronto.",
    profession: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    stats: { crs: 468, timeline: "6 mo", cost: "CA$2,400" },
    color: "from-red-500 to-rose-600",
    featured: true,
    video: true,
  },
  {
    name: "Fatima B.",
    from: "🇨🇲 Cameroon",
    to: "🇫🇷 France",
    visa: "Master's - École Polytechnique",
    approved: "3 months",
    story: "Campus France Etudes felt impossible until I met Aminata. She helped me rewrite my SOP THREE times until it was perfect — explaining every gap honestly. I got admitted to Polytechnique with €12,000 scholarship AND a guaranteed internship at BNP Paribas. I'm in Paris now, living my dream.",
    profession: "MSc Applied Mathematics",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    stats: { crs: "Top 5%", timeline: "3 mo", cost: "€1,800" },
    color: "from-blue-500 to-indigo-600",
    video: false,
  },
  {
    name: "Carlos M.",
    from: "🇦🇴 Angola",
    to: "🇱🇺 Luxembourg",
    visa: "Work Permit (Fintech)",
    approved: "2.5 months",
    story: "I had 3 offers, all stuck on work permit — every agency said '4-6 months minimum'. Travel Agency secured my authorization IN ONE MONTH, and my blue card a few weeks later. I've since referred 7 colleagues from Angola, every one successful.",
    profession: "Senior Product Manager",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    stats: { crs: "€90K/yr", timeline: "2.5 mo", cost: "€3,200" },
    color: "from-emerald-500 to-teal-600",
    video: true,
  },
  {
    name: "Amina H.",
    from: "🇩🇯 Djibouti",
    to: "🇨🇦 Canada",
    visa: "Student — UBC",
    approved: "5 weeks",
    story: "Coming from a small country, every embassy told me it was 'too risky'. The team not only got me a letter from UBC showing funding but walked me through the interview over 3 rehearsals. Visa approved in 5 weeks — no questions. I cried when I got the email.",
    profession: "BSc Computer Science",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    stats: { crs: "Co-op 80k", timeline: "5 wks", cost: "CA$1,500" },
    color: "from-amber-500 to-orange-600",
    video: false,
  },
  {
    name: "Daniel & Sarah K.",
    from: "🇰🇪 Kenya",
    to: "🇨🇦 Canada",
    visa: "Family Class Sponsorship",
    approved: "11 months",
    story: "We submitted our family sponsorship through another company — it was a mess, missing documents, wrong forms. Travel Agency rebuilt our file from scratch, added the right evidence, and our COPR landed within 4 months of resubmission. Our 3 year old was born a Canadian citizen.",
    profession: "Family of 3",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    stats: { crs: "3 kids", timeline: "11 mo", cost: "CA$3,500" },
    color: "from-purple-500 to-violet-700",
    video: true,
  },
  {
    name: "Ibrahim D.",
    from: "🇨🇮 Côte d'Ivoire",
    to: "🇫🇷 France",
    visa: "Talent Passport (4 years)",
    approved: "4 months",
    story: "I'm a fullstack dev. I had the job but Talent Passport refused — once. The team wrote a 30-page legal argument with my employer, had 2 of their immigration lawyers pro-bono, won on appeal. I'm now working at a Paris startup, earning €74K. They changed my entire life.",
    profession: "Lead Engineer",
    image: "https://randomuser.me/api/portraits/men/88.jpg",
    stats: { crs: "€74K/yr", timeline: "4 mo", cost: "€3,000" },
    color: "from-cyan-500 to-blue-600",
    video: false,
  },
  {
    name: "Yulia R.",
    from: "🇺🇦 Ukraine",
    to: "🇱🇺 Luxembourg",
    visa: "Investor Visa + Family",
    approved: "3 months",
    story: "We had to leave quickly. Not only did they help me qualify for the investor program in record time, but they arranged temporary housing, found a school for my daughter, and connected me to a local Ukrainian community. You don't just buy a service — you get family.",
    profession: "Entrepreneur / 2 Children",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    stats: { crs: "Family 4", timeline: "3 mo", cost: "€5,500" },
    color: "from-pink-500 to-rose-600",
    video: true,
  },
  {
    name: "Samuel L.",
    from: "🇨🇲 Cameroon",
    to: "🇨🇦 Canada",
    visa: "Post-Grad Work Permit → PR",
    approved: "18 months total",
    story: "First my study permit was refused because of unclear finances. Their consultant restructured everything — got SPP 2 years later, worked full-time, then Express Entry. Today I'm a PR at Shopify, making CA$160K. Everything happened exactly on the timeline they promised me.",
    profession: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    stats: { crs: "472 CRS", timeline: "18 mo", cost: "CA$2,200" },
    color: "from-indigo-500 to-purple-600",
    video: false,
  },
];

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All Stories", icon: Users, color: "from-violet-500 to-purple-600" },
    { id: "canada", label: "🇨🇦 Canada", icon: GraduationCap, color: "from-red-500 to-rose-600" },
    { id: "france", label: "🇫🇷 France", icon: Globe, color: "from-blue-500 to-indigo-600" },
    { id: "luxembourg", label: "🇱🇺 Luxembourg", icon: Briefcase, color: "from-emerald-500 to-teal-600" },
  ];

  const filtered = filter === "all"
    ? stories
    : stories.filter(s =>
      (filter === "canada" && s.to.includes("🇨🇦")) ||
      (filter === "france" && s.to.includes("🇫🇷")) ||
      (filter === "luxembourg" && s.to.includes("🇱🇺"))
    );

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-700 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 3,
                height: Math.random() * 10 + 3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -35, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Heart size={14} className="text-yellow-200" /> 2,500+ Success Stories
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Real People. <span className="text-yellow-200">Real Victories.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              These are not paid actors. Every story is a verified client who trusted us with their future —
              and we delivered. Your story could be next.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: "2,500+", l: "Successful Cases" },
                { n: "97%", l: "Overall Approval Rate" },
                { n: "45+", l: "Countries of Origin" },
                { n: "4.97★", l: "Client Rating" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <p className="font-heading font-black text-4xl text-white">{s.n}</p>
                  <p className="text-sm">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map(f => {
            const Icon = f.icon;
            const active = filter === f.id;
            return (
              <motion.button
                key={f.id}
                onClick={() => setFilter(f.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                  active
                    ? `bg-gradient-to-r ${f.color} text-white shadow-lg`
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon size={15} /> {f.label}
                <span className="text-[10px] opacity-70">({filter === f.id ? filtered.length : ""})</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.article
                key={s.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all ${
                  s.featured ? "lg:col-span-2 ring-2 ring-yellow-400 ring-offset-4" : ""
                }`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
                {s.featured && (
                  <div className="absolute top-5 right-5 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-wheat text-[10px] font-heading font-black flex items-center gap-1 shadow-lg">
                    <Award size={11} className="fill-current" /> FEATURED
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-sm scale-110`} />
                      <img src={s.image} alt={s.name} className="relative w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg" />
                      {s.video && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                          <PlayCircle size={14} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-navy text-xl leading-tight">{s.name}</h3>
                      <p className="text-gray-500 text-xs mb-1.5">{s.profession}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span>{s.from}</span>
                        <ArrowRight size={14} className="text-yellow-500" />
                        <span className="text-blue-600">{s.to}</span>
                      </div>
                      <div className="flex gap-0.5 text-amber-400 mt-1">
                        {[...Array(5)].map((_, r) => <Star key={r} size={12} className="fill-current" />)}
                      </div>
                    </div>
                  </div>

                  <div className={`bg-gradient-to-r ${s.color} bg-opacity-[0.08] rounded-2xl p-4 mb-4 border border-opacity-10`}>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Visa</p>
                        <p className="font-heading font-black text-base text-white leading-tight mt-0.5">{s.visa}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Approved</p>
                        <p className="font-heading font-black text-white text-base mt-0.5">{s.approved}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Investment</p>
                        <p className="font-heading font-black text-white text-base mt-0.5">{s.stats.cost}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-5">
                    <Quote size={18} className={`absolute -top-1 -left-1 bg-gradient-to-br ${s.color} bg-clip-text text-transparent opacity-30`} />
                    <p className="text-gray-600 text-sm leading-relaxed pl-5 italic line-clamp-4">"{s.story}"</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={12} /> Verified client
                    </div>
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl text-white bg-gradient-to-r ${s.color} hover:shadow-lg transition-all`}
                    >
                      Same Result For Me <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Band */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-blue-900 to-indigo-900 p-10 md:p-14 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-pink-400 blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-4 gap-6 text-center md:divide-x divide-white/10">
            {[
              { n: "97.2%", l: "Visa Approval Rate", sub: "Across all programs" },
              { n: "2,500+", l: "Happy Clients Served", sub: "Since 2015" },
              { n: "3", l: "Countries Specialized", sub: "🇨🇦 🇫🇷 🇱🇺" },
              { n: "48h", l: "Avg. First Response", sub: "Weekends included" },
            ].map(({ n, l, sub }, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={i > 0 ? "md:pl-6" : ""}
              >
                <p className="font-heading font-black text-4xl md:text-5xl mb-1 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">{n}</p>
                <p className="font-heading font-bold text-white text-base">{l}</p>
                <p className="text-white/60 text-xs mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-12 text-navy"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-navy/80 text-lg mb-5">
                Book a free 30-minute consultation. No credit card, no obligation.
                Just a plan tailored to exactly where you want to go.
              </p>
              <ul className="space-y-1.5 mb-6">
                {["30-min 1:1 consultant call", "Country & visa matching", "Document checklist", "Timeline & budget estimate"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-navy/90 text-sm font-semibold">
                    <CheckCircle2 size={15} className="text-navy shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy text-white font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Book Free Consultation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
