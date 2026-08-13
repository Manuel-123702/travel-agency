"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Image as ImageIcon, X, ChevronLeft, ChevronRight,
  Calendar, MapPin, Sparkles, Award, GraduationCap, Plane
} from "lucide-react";

const categories = [
  { id: "all", label: "All Moments", icon: Sparkles, color: "from-violet-500 to-purple-600" },
  { id: "success", label: "Visa Approvals", icon: Award, color: "from-emerald-500 to-teal-600" },
  { id: "study", label: "Study Abroad", icon: GraduationCap, color: "from-blue-500 to-indigo-600" },
  { id: "events", label: "Events & Workshops", icon: Calendar, color: "from-amber-500 to-orange-600" },
  { id: "travel", label: "Client Journeys", icon: Plane, color: "from-pink-500 to-rose-600" },
  { id: "office", label: "Office Life", icon: MapPin, color: "from-cyan-500 to-sky-600" },
];

const images = [
  {
    id: 1,
    title: "First Canada PR Approval of 2026",
    category: "success",
    location: "Toronto, Canada",
    date: "Jan 15, 2026",
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
    height: "tall",
  },
  {
    id: 2,
    title: "Campus France Welcome Seminar",
    category: "study",
    location: "Paris, France",
    date: "Feb 8, 2026",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    height: "wide",
  },
  {
    id: 3,
    title: "Client Arrival in Montréal",
    category: "travel",
    location: "Montréal, QC",
    date: "Mar 2, 2026",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    height: "normal",
  },
  {
    id: 4,
    title: "Luxembourg Work Visa Success",
    category: "success",
    location: "Luxembourg City",
    date: "Mar 22, 2026",
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
    height: "normal",
  },
  {
    id: 5,
    title: "Immigration Workshop Douala",
    category: "events",
    location: "Douala, Cameroon",
    date: "Apr 5, 2026",
    img: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    height: "wide",
  },
  {
    id: 6,
    title: "Team Celebration Dinner",
    category: "office",
    location: "Douala HQ",
    date: "Apr 12, 2026",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    height: "tall",
  },
  {
    id: 7,
    title: "Sorbonne University Tour",
    category: "study",
    location: "Paris, France",
    date: "May 3, 2026",
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
    height: "normal",
  },
  {
    id: 8,
    title: "50 France Student Visas Approved",
    category: "success",
    location: "Paris Embassy",
    date: "May 18, 2026",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    height: "wide",
  },
  {
    id: 9,
    title: "UBC Campus Visit",
    category: "study",
    location: "Vancouver, BC",
    date: "Jun 2, 2026",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    height: "normal",
  },
  {
    id: 10,
    title: "Our New Office Opening",
    category: "office",
    location: "Bonanjo, Douala",
    date: "Jun 14, 2026",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    height: "normal",
  },
  {
    id: 11,
    title: "First Luxembourg Family Reunification",
    category: "success",
    location: "Luxembourg",
    date: "Jul 1, 2026",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
    height: "tall",
  },
  {
    id: 12,
    title: "Canada Expo Yaoundé",
    category: "events",
    location: "Yaoundé, Cameroon",
    date: "Jul 20, 2026",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    height: "wide",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = active === "all" ? images : images.filter(i => i.category === active);

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 12 + 4,
                height: Math.random() * 12 + 4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
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
              <ImageIcon size={14} /> Our Gallery
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Moments of <span className="text-yellow-300">Triumph</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
              Celebrating real journeys, landmark approvals, life-changing moves,
              and the vibrant community making dreams come true every single day.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              {[
                { n: images.length + "+", l: "Photos" },
                { n: "6", l: "Categories" },
                { n: "3+", l: "Countries" },
                { n: "100%", l: "Authentic" },
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
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon size={15} /> {cat.label}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(img.id)}
                className="group relative break-inside-avoid rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={img.img}
                  alt={img.title}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80";
                  }}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    img.height === "tall" ? "h-96" : img.height === "wide" ? "h-56" : "h-72"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-white font-heading font-bold text-lg mb-2">{img.title}</h3>
                  <div className="flex items-center gap-4 text-white/80 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {img.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {img.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (() => {
          const img = images.find(i => i.id === selected)!;
          const idx = images.findIndex(i => i.id === selected);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(images[(idx - 1 + images.length) % images.length].id); }}
                className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected(images[(idx + 1) % images.length].id); }}
                className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                <img src={img.img} alt={img.title} className="w-full max-h-[60vh] object-cover" />
                <div className="p-6 md:p-8">
                  <h2 className="font-heading font-bold text-navy text-2xl md:text-3xl mb-3">{img.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {img.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={16} /> {img.date}</span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold capitalize">
                      {img.category}
                    </span>
                  </div>
                  <p className="text-gray-500 max-w-2xl">
                    A genuine moment from our journey of transforming lives through international mobility.
                    Every photo represents a story, a dream achieved, and a new chapter beginning.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
