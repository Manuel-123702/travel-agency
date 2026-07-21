import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to Canada | Travel Agency",
  description: "Expert Canadian immigration services. Express Entry, study permits, work permits, and visitor visas with 97% success rate.",
};

export default function CanadaPage() {
  return (
    <div className="pt-20">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&q=85" alt="Canada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-red-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-8xl mb-6">🇨🇦</div>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-4">
            Immigrate to <span className="text-gold">Canada</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mb-8">
            Canada welcomes skilled workers, talented students, and diverse families.
            With one of the world's best immigration systems, your future here starts now.
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
                title: "Study in Canada",
                items: ["University of Toronto, McGill, UBC", "Study Permit applications", "CAQ for Quebec students", "Post-Graduation Work Permit", "Work 24h/week on-campus", "Pathway to permanent residency"],
              },
              {
                icon: Briefcase,
                title: "Work in Canada",
                items: ["Express Entry (CRS score optimization)", "Federal Skilled Worker Program", "Provincial Nominee Programs", "Intra-Company Transfers", "LMIA-based work permits", "Permanent Residency pathways"],
              },
              {
                icon: Camera,
                title: "Visit Canada",
                items: ["Temporary Resident Visa (TRV)", "Electronic Travel Authorization (eTA)", "Multiple entry visa options", "Family visit applications", "Business visitor permits", "Super Visa for parents"],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="card-premium p-8">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-5">
                  <Icon size={26} className="text-red-700" />
                </div>
                <h2 className="font-heading font-bold text-navy text-2xl mb-5">{title}</h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-red-700 flex-shrink-0" />
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to start your Canadian journey?</h2>
          <p className="text-white/60 mb-8">Our RCIC-certified Canada specialists are ready to build your winning application.</p>
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
