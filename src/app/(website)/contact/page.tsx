"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+237 650 921 917", "+1 (514) 000-0000"],
    action: "tel:+237650921917",
    color: "blue",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["tessohmanuel@gmail.com", "support@travelagency.com"],
    action: "mailto:tessohmanuel@gmail.com",
    color: "gold",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Yaoundé, Cameroon", "Montreal, QC, Canada"],
    action: "https://maps.google.com",
    color: "green",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon–Fri: 9:00 AM – 6:00 PM", "WhatsApp: Available 24/7"],
    action: null,
    color: "purple",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="gradient-bg py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Contact Us</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Let&apos;s Plan Your <span className="text-gold">International Future</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Whether you have a question or you&apos;re ready to start your immigration journey,
            our expert team is here for you.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map(({ icon: Icon, title, details, action }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium p-6 text-center"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-blue-700" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-3">{title}</h3>
                {details.map((d) => (
                  <p key={d} className="text-gray-500 text-sm">{d}</p>
                ))}
                {action && (
                  <a
                    href={action}
                    target={action.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-700 text-sm font-semibold hover:underline"
                  >
                    {title === "Address" ? "View on Map →" : "Contact Now →"}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <h2 className="font-heading font-bold text-2xl text-navy mb-2">Send us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">We respond within 24 hours on business days.</p>

            {submitted ? (
              <div className="text-center py-10 px-4 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle size={44} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-2">Inquiry Received!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for contacting us, <strong className="text-navy">{form.name}</strong>. Our immigration advisors will review your request regarding <strong className="text-navy">{form.subject || "your inquiry"}</strong> and contact you within 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-emerald-100">
                  <a
                    href={`mailto:tessohmanuel@gmail.com?subject=${encodeURIComponent("Inquiry: " + (form.subject || "Immigration"))}&body=${encodeURIComponent(`Hello Travel Agency team,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`)}`}
                    className="w-full sm:w-auto px-5 py-3 bg-navy text-white text-xs font-heading font-bold rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Mail size={15} /> Send Direct Email Backup
                  </a>
                  <a
                    href={`https://wa.me/237650921917?text=${encodeURIComponent(`Hello! I submitted an inquiry for ${form.subject || "immigration"}. My name is ${form.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 bg-[#25D366] text-white text-xs font-heading font-bold rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send size={15} /> Chat on WhatsApp Now
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+1 514 000 0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject *</label>
                    <select name="subject" required value={form.subject} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                      <option value="">Select subject</option>
                      <option>Student Visa Inquiry</option>
                      <option>Work Permit</option>
                      <option>Visitor Visa</option>
                      <option>Permanent Residency</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
                  <textarea name="message" required value={form.message} onChange={handleChange}
                    placeholder="Tell us about your project and any specific questions..." rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-navy text-white font-heading font-bold py-4 rounded-xl hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70">
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send size={16} />Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + WhatsApp */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686342.6179073377!2d-3.4359722!3d46.2276383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e0b3a3c7b9e7%3A0x4097b5c6e1e0e0e0!2sEurope!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Global Destinations"
              />
            </div>
            
            {/* Destination markers */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="font-semibold text-blue-900 text-sm">Canada</p>
                <p className="text-xs text-blue-600">Montreal, QC</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="font-semibold text-blue-900 text-sm">France</p>
                <p className="text-xs text-blue-600">Paris</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="font-semibold text-blue-900 text-sm">Luxembourg</p>
                <p className="text-xs text-blue-600">Luxembourg City</p>
              </div>
            </div>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/237650921917?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20immigration%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#25D366] rounded-3xl p-6 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-lg">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">Available 24/7 — Instant responses</p>
                <p className="text-white font-semibold mt-1">+237 650 921 917</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
