"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap, MapPin, Star, Users, ChevronRight,
  BookOpen, Building2, ArrowRight, Award, CheckCircle2, Globe, DollarSign, Calendar
} from "lucide-react";

const universities = [
  {
    name: "University of Toronto",
    country: "🇨🇦 Canada",
    city: "Toronto, ON",
    ranking: "#1 in Canada",
    worldRank: 21,
    tuition: "CA$45,000 - 60,000",
    acceptance: 43,
    students: "98,000+",
    programs: 700,
    description: "Canada's leading research university with exceptional programs in CS, engineering, business, and health sciences.",
    popular: ["Computer Science", "MBA", "Engineering", "Life Sciences"],
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    color: "from-red-500 to-rose-600",
  },
  {
    name: "University of Paris-Saclay",
    country: "🇫🇷 France",
    city: "Paris",
    ranking: "#1 in France",
    worldRank: 15,
    tuition: "€2,770 - 16,000",
    acceptance: 12,
    students: "48,000+",
    programs: 400,
    description: "World-class STEM university in the heart of France. Strong in mathematics, physics, computer science, and engineering.",
    popular: ["Mathematics", "Physics", "Data Science", "Quantum"],
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "University of Luxembourg",
    country: "🇱🇺 Luxembourg",
    city: "Esch-sur-Alzette",
    ranking: "#1 in Luxembourg",
    worldRank: 201,
    tuition: "€400 - 20,000",
    acceptance: 58,
    students: "7,000+",
    programs: 60,
    description: "Multilingual university offering unique programs in finance, European law, and computer science with global career opportunities.",
    popular: ["Finance", "European Law", "CS", "Data Science"],
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "University of British Columbia",
    country: "🇨🇦 Canada",
    city: "Vancouver, BC",
    ranking: "#3 in Canada",
    worldRank: 37,
    tuition: "CA$42,000 - 58,000",
    acceptance: 51,
    students: "68,000+",
    programs: 550,
    description: "Beautiful coastal campus with top-ranked programs in business, forestry, medicine, and film.",
    popular: ["Sauder MBA", "Forestry", "Medicine", "Film"],
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Sciences Po",
    country: "🇫🇷 France",
    city: "Paris",
    ranking: "#3 in France",
    worldRank: 209,
    tuition: "€4,500 - 14,000",
    acceptance: 18,
    students: "14,000+",
    programs: 120,
    description: "The ultimate destination for international relations, political science, public policy, and European affairs.",
    popular: ["International Relations", "Public Policy", "Law", "Journalism"],
    img: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=800&q=80",
    color: "from-purple-500 to-violet-700",
  },
  {
    name: "McGill University",
    country: "🇨🇦 Canada",
    city: "Montréal, QC",
    ranking: "#2 in Canada",
    worldRank: 27,
    tuition: "CA$44,000 - 65,000",
    acceptance: 46,
    students: "40,000+",
    programs: 500,
    description: "English-speaking in Québec! World-famous medical school, Desautels Faculty of Management, and bilingual environment.",
    popular: ["Medicine", "MBA", "Law", "Linguistics"],
    img: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80",
    color: "from-amber-500 to-red-600",
  },
  {
    name: "Sorbonne University",
    country: "🇫🇷 France",
    city: "Paris",
    ranking: "#2 in France",
    worldRank: 43,
    tuition: "€243 - 17,000",
    acceptance: 15,
    students: "55,000+",
    programs: 350,
    description: "Historic excellence across arts, humanities, and science. One of Europe's oldest and most prestigious universities.",
    popular: ["Literature", "Philosophy", "Medicine", "History"],
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "University of Waterloo",
    country: "🇨🇦 Canada",
    city: "Waterloo, ON",
    ranking: "#4 in Canada",
    worldRank: 136,
    tuition: "CA$40,000 - 55,000",
    acceptance: 52,
    students: "42,000+",
    programs: 180,
    description: "Canada's #1 tech university with the world's largest cooperative education (co-op) program. Big Tech hires graduates by the hundreds.",
    popular: ["Computer Science", "Software Eng", "Math", "AI/ML"],
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    color: "from-indigo-500 to-blue-700",
  },
  {
    name: "Luxembourg School of Business",
    country: "🇱🇺 Luxembourg",
    city: "Luxembourg City",
    ranking: "Top Business School",
    worldRank: "Triple Crown",
    tuition: "€28,000 - 45,000",
    acceptance: 35,
    students: "800+",
    programs: 12,
    description: "Elite business school right in the heart of the EU's financial capital. Finance, banking, and fintech specialization.",
    popular: ["MBA", "Finance", "Wealth Management", "Fintech"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    color: "from-lime-500 to-emerald-600",
  },
];

export default function UniversitiesPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-700 text-white py-24 px-6 mb-20">
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
              <Building2 size={14} /> Top Institutions
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              World-Class <span className="text-yellow-300">Universities</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Official partner admissions to France, Canada, and Luxembourg's most prestigious universities.
              Fast-track applications, SOP support, and guaranteed consideration.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: universities.length + "+", l: "Partner Universities" },
                { n: "1,200+", l: "Students Placed" },
                { n: "500+", l: "Programs Available" },
                { n: "3", l: "Countries" },
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

      {/* Universities Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {universities.map((u, i) => (
            <motion.article
              key={u.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${u.color}`}>
                  {u.country}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur text-navy">
                  {u.ranking}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-heading font-bold text-lg leading-tight drop-shadow-lg">{u.name}</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={11} /> {u.city}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-gray-100 text-center">
                  <div>
                    <p className="font-heading font-black text-navy text-lg">#{u.worldRank}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Global</p>
                  </div>
                  <div>
                    <p className="font-heading font-black text-blue-600 text-lg">{u.acceptance}%</p>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Acceptance</p>
                  </div>
                  <div>
                    <p className="font-heading font-black text-emerald-600 text-lg">{u.students}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Students</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{u.description}</p>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {u.popular.slice(0, 3).map(p => (
                    <span key={p} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full">{p}</span>
                  ))}
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[11px] font-semibold rounded-full">+{u.popular.length - 3} more</span>
                </div>
                <div className="flex items-center justify-between mb-5 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <DollarSign size={14} /> {u.tuition}
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(4)].map((_, s) => <Star key={s} size={12} className="fill-current" />)}
                    <Star size={12} className="fill-current opacity-40" />
                  </div>
                </div>
                <Link
                  href="/contact"
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl text-white bg-gradient-to-r ${u.color} hover:shadow-lg transition-all`}
                >
                  Apply with Us <ChevronRight size={15} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-300 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pink-300 blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="font-heading font-black text-3xl md:text-4xl mb-4 max-w-2xl mx-auto">
              Unsure Which University Fits YOU?
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
              Our education specialists assess your grades, budget, and dreams to match you with the perfect university. 100% free assessment!
            </p>
            <ul className="flex flex-wrap justify-center gap-6 mb-8 text-white/90 text-sm">
              {["Free profile assessment", "5 university shortlists", "SOP & LOR guidance", "Visa included"].map(f => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-yellow-300 shrink-0" /> {f}</li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Your Free University Match <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
