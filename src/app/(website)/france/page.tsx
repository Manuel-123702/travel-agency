import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to France | Travel Agency",
  description: "Complete guide to studying, working, and visiting France. Expert immigration services with 97% success rate.",
};

export default function FrancePage() {
  return (
    <div className="pt-20">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85" alt="France" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-8xl mb-6">🇫🇷</div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-4">
            Immigrate to <span className="text-gold">France</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mb-8">
            The world's most visited country offers world-class education, a thriving job market,
            and an unmatched quality of life. Let us take you there.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy font-heading font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-gold/30 transition-all">
            Start Your Application <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Study in France",
                items: ["Sorbonne, Sciences Po, HEC Paris", "Campus France selection", "VLS-TS student visa", "Work up to 20h/week", "Post-study options", "Affordable tuition fees"],
              },
              {
                icon: Briefcase,
                title: "Work in France",
                items: ["Talent Passport (Passeport Talent)", "EU Blue Card eligibility", "Skilled Worker permits", "Job market guidance", "Salary among Europe's best", "Path to French residency"],
              },
              {
                icon: Camera,
                title: "Visit France",
                items: ["Schengen short-stay visa", "Up to 90 days / 180 days", "Tourism & family visits", "Business travel permits", "Multi-entry visa options", "Fast processing available"],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="card-premium p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                  <Icon size={26} className="text-blue-700" />
                </div>
                <h2 className="font-heading font-bold text-navy text-2xl mb-5">{title}</h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-blue-700 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to move to France?</h2>
          <p className="text-white/60 mb-8">Our France specialists will handle your complete application from start to finish.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-gold text-navy font-heading font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all">
              Book Free Consultation
            </Link>
            <Link href="/services" className="border-2 border-white text-white font-heading font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-navy transition-all">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
