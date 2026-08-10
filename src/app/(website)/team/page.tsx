"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, Mail, Phone, Linkedin, Twitter,
  Award, Briefcase, Globe, Star, ChevronRight
} from "lucide-react";

const teamMembers = [
  {
    name: "Manuel Tessoh",
    role: "Founder & CEO",
    bio: "15+ years of immigration law expertise. Former diplomat with deep connections across 3 continents.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    countries: "🇫🇷 🇨🇦 🇱🇺",
    socials: { linkedin: "#", twitter: "#", email: "tessohmanuel@gmail.com" },
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Aminata Coulibaly",
    role: "Senior Immigration Advisor",
    bio: "Licensed RCIC with 10 years experience in Express Entry and Quebec immigration programs.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    countries: "🇨🇦 🇺🇸",
    socials: { linkedin: "#", twitter: "#", email: "aminata@travelagency.com" },
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Jean-Pierre Dubois",
    role: "France Visa Director",
    bio: "Former Campus France director with expertise in student visas and long-stay applications.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    countries: "🇫🇷 🇧🇪 🇨🇭",
    socials: { linkedin: "#", twitter: "#", email: "jp@travelagency.com" },
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Sophie Schmit",
    role: "Luxembourg Specialist",
    bio: "Luxembourg-based lawyer handling business immigration, investor visas, and work permits.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    countries: "🇱🇺 🇩🇪 🇳🇱",
    socials: { linkedin: "#", twitter: "#", email: "sophie@travelagency.com" },
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "David Chen",
    role: "Document Compliance Officer",
    bio: "Meticulous document verification specialist with 8 years ensuring 0% rejection from errors.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    countries: "🌍 All",
    socials: { linkedin: "#", twitter: "#", email: "david@travelagency.com" },
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Fatima Ndiaye",
    role: "Client Success Manager",
    bio: "Your dedicated partner through every step. Multilingual: EN, FR, AR, ES.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    countries: "🌍 Client Relations",
    socials: { linkedin: "#", twitter: "#", email: "fatima@travelagency.com" },
    color: "from-cyan-500 to-sky-600",
  },
  {
    name: "Mark Thompson",
    role: "Financial Services Director",
    bio: "Expert in payment plans, invoice financing, and international payment methods.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    countries: "💼 Finance",
    socials: { linkedin: "#", twitter: "#", email: "mark@travelagency.com" },
    color: "from-lime-500 to-green-600",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    bio: "Growing our global reach through storytelling, digital campaigns, and community building.",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    countries: "📢 Global",
    socials: { linkedin: "#", twitter: "#", email: "priya@travelagency.com" },
    color: "from-fuchsia-500 to-pink-600",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 3,
                height: Math.random() * 10 + 3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
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
              <Users size={14} /> Meet the Experts
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              People Behind <span className="text-yellow-300">Your Success</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
              A world-class team of immigration lawyers, consultants, and client success specialists
              with a proven track record of 2,500+ successful cases.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              {[
                { n: "50+", l: "Global Experts" },
                { n: "15", l: "Languages Spoken" },
                { n: "97%", l: "Client Satisfaction" },
                { n: "10Y+", l: "Avg Experience" },
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

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "Excellence", desc: "We deliver nothing less than exceptional results for every client.", color: "from-yellow-400 to-amber-500" },
            { icon: Globe, title: "Global Reach", desc: "Deep expertise across France, Canada, Luxembourg, and beyond.", color: "from-blue-400 to-indigo-500" },
            { icon: Star, title: "Integrity", desc: "Transparent, honest, and committed to your best interest.", color: "from-pink-400 to-rose-500" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden group"
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                <Icon size={30} />
              </div>
              <h3 className="font-heading font-bold text-navy text-2xl mb-3">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Grid */}
      <section className="bg-gradient-to-b from-blue-50/50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Our Leadership Team</h2>
            <p className="text-gray-500 text-lg">Meet the dedicated professionals guiding your journey</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${m.color}`} />
                <div className="relative p-6 pb-4">
                  <div className="relative mx-auto w-28 h-28 mb-5">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.color} opacity-20 blur-sm`} />
                    <img
                      src={m.image}
                      alt={m.name}
                      className="relative w-full h-full rounded-full object-cover ring-4 ring-white shadow-xl"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-navy text-lg">{m.name}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${m.color} bg-clip-text text-transparent mb-2`}>{m.role}</p>
                    <p className="text-lg mb-3">{m.countries}</p>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{m.bio}</p>
                    <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100">
                      <a href={`mailto:${m.socials.email}`} className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                        <Mail size={14} />
                      </a>
                      <a href={m.socials.linkedin} className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all">
                        <Linkedin size={14} />
                      </a>
                      <a href={m.socials.twitter} className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                        <Twitter size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-12 text-white text-center"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          </div>
          <h2 className="relative z-10 font-heading font-black text-3xl md:text-4xl mb-4 text-navy">
            Ready to Meet Your Dedicated Team?
          </h2>
          <p className="relative z-10 text-navy/80 text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation and get matched with the perfect advisor for your immigration goals.
          </p>
          <Link
            href="/contact"
            className="relative z-10 inline-flex items-center gap-2 bg-navy text-white font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Book Your Free Consultation <ChevronRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
