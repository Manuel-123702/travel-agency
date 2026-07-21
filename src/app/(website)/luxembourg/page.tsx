import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to Luxembourg | Travel Agency",
  description: "Luxembourg immigration services — EU Blue Card, work permits, student visas. Europe's financial capital awaits.",
};

export default function LuxembourgPage() {
  return (
    <div className="pt-20">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566245854878-1a88f4fb70a0?w=1920&q=85" alt="Luxembourg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-blue-900/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-8xl mb-6">🇱🇺</div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-4">
            Immigrate to <span className="text-gold">Luxembourg</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mb-8">
            Europe's financial powerhouse and tech hub. The highest wages in the EU,
            political stability, and the heart of the Schengen Zone.
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
                title: "Study in Luxembourg",
                items: ["University of Luxembourg (trilingual)", "Bachelor's & Master's programs", "Student residence permits", "Affordable tuition", "Work during studies", "EU-wide recognition of degrees"],
              },
              {
                icon: Briefcase,
                title: "Work in Luxembourg",
                items: ["EU Blue Card applications", "Highest salaries in the EU", "Finance & banking sector", "Tech & startup ecosystem", "International organizations (EU, NATO)", "Path to 5-year residence"],
              },
              {
                icon: Camera,
                title: "Visit Luxembourg",
                items: ["Schengen short-stay visa", "Gateway to 26 EU countries", "Family visit applications", "Business meetings & events", "Fast processing times", "Multiple entry options"],
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to live & work in Luxembourg?</h2>
          <p className="text-white/60 mb-8">Our EU immigration specialists will open the door to Europe's most dynamic economy.</p>
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
