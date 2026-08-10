"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar, MapPin, Clock, Users, ChevronRight,
  Video, Building2, Sparkles, Ticket, CheckCircle2, ArrowRight
} from "lucide-react";

const events = [
  {
    title: "Canada Immigration Expo 2026",
    date: "September 14, 2026",
    time: "10:00 AM - 6:00 PM",
    location: "Douala Grand Hotel",
    type: "In-Person",
    attendees: 250,
    spotsLeft: 47,
    price: "Free",
    description: "Meet Canadian visa officers, top immigration lawyers, and Canadian university representatives. Get on-spot profile assessments.",
    tags: ["Express Entry", "PNP", "Student Visa"],
    color: "from-red-500 to-orange-600",
    featured: true,
  },
  {
    title: "France Campus Virtual Tour",
    date: "September 21, 2026",
    time: "2:00 PM - 5:00 PM (WAT)",
    location: "Zoom Webinar",
    type: "Virtual",
    attendees: 180,
    spotsLeft: 92,
    price: "Free",
    description: "Live tour of 12 top French universities with Q&A with Campus France officials. Exclusive scholarships announced.",
    tags: ["Study", "France", "Scholarships"],
    color: "from-blue-500 to-indigo-600",
    featured: true,
  },
  {
    title: "Luxembourg Business Visa Workshop",
    date: "October 3, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Yaoundé Convention Center",
    type: "In-Person",
    attendees: 80,
    spotsLeft: 23,
    price: "₦25,000",
    description: "Deep-dive into Luxembourg's investor visa, entrepreneur program, and work permit pathways. By invitation.",
    tags: ["Business", "Investor", "Luxembourg"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Student Success Stories Live",
    date: "October 10, 2026",
    time: "7:00 PM - 9:00 PM",
    location: "Facebook Live & YouTube",
    type: "Virtual",
    attendees: 500,
    spotsLeft: "Unlimited",
    price: "Free",
    description: "Hear from 5 students currently studying in Canada, France, and UK. Ask your questions live!",
    tags: ["Student", "Q&A", "Community"],
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Document Preparation Bootcamp",
    date: "October 18, 2026",
    time: "11:00 AM - 4:00 PM",
    location: "Online Masterclass",
    type: "Virtual",
    attendees: 120,
    spotsLeft: 58,
    price: "₦15,000",
    description: "Step-by-step guidance for every document: passport photos, bank statements, SOP, LORs. Templates provided.",
    tags: ["Documents", "SOP", "Templates"],
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Year-End Mega Consultation Free Day",
    date: "November 1, 2026",
    time: "8:00 AM - 8:00 PM",
    location: "Travel Agency HQ + Zoom",
    type: "Hybrid",
    attendees: 500,
    spotsLeft: 200,
    price: "Free",
    description: "20+ consultants available for FREE 30-minute consultations. Exclusive 30% discount on all services booked.",
    tags: ["Consultation", "Free", "Discounts"],
    color: "from-amber-500 to-yellow-600",
  },
];

export default function EventsPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white py-24 px-6 mb-20">
        <div className="absolute inset-0 opacity-20">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 4,
                height: Math.random() * 10 + 4,
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
              <Sparkles size={14} className="text-yellow-200" /> Events & Workshops
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Learn, Connect & <span className="text-yellow-200">Grow</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-10">
              Exclusive expos, virtual tours, expert-led workshops, and community events
              to accelerate your immigration journey.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              {[
                { n: events.length + "+", l: "Upcoming Events" },
                { n: "1,500+", l: "Previous Attendees" },
                { n: "6", l: "Events this Quarter" },
                { n: "98%", l: "Would Attend Again" },
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

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {events.map((ev, i) => (
            <motion.article
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 ${
                ev.featured ? "ring-2 ring-yellow-400 ring-offset-4" : ""
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${ev.color}`} />
              {ev.featured && (
                <div className="absolute top-5 right-5 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-navy text-xs font-heading font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                  <Ticket size={12} className="fill-current" /> FEATURED
                </div>
              )}
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${ev.color}`}>
                    {ev.type}
                  </span>
                  <span className="text-emerald-600 font-bold text-sm">{ev.price}</span>
                </div>
                <h3 className="font-heading font-bold text-navy text-2xl mb-3 leading-tight">{ev.title}</h3>
                <p className="text-gray-500 mb-5 leading-relaxed">{ev.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{ev.date}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{ev.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    {ev.type === "Virtual" || ev.type === "Hybrid" ? (
                      <Video size={16} className="text-pink-500 mt-0.5 shrink-0" />
                    ) : (
                      <Building2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                    )}
                    <span className="text-gray-600">{ev.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{ev.spotsLeft} spots left</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ev.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users size={13} /> {ev.attendees} registered
                  </div>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl text-white bg-gradient-to-r ${ev.color} hover:shadow-lg transition-all`}
                  >
                    Register Now <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Past Events CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-12 text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-yellow-300 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-400 blur-3xl" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-black text-3xl md:text-4xl mb-4">
                Missed Our Events?
              </h2>
              <p className="text-white/85 text-lg mb-6">
                Access recordings of 40+ past workshops, seminars, and Q&As.
                Join as a premium member for instant access.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "All past event recordings",
                  "Exclusive slide decks & templates",
                  "Monthly Live Q&A access",
                  "Priority event registration",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 size={18} className="text-yellow-300 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-yellow-300 text-navy font-heading font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Browse Past Events <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
