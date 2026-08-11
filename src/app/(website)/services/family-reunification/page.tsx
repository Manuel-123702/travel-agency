import type { Metadata } from "next";
import { CheckCircle, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Family Reunification Services | Sponsorship & Family Visa | Travel Agency",
  description: "Expert family reunification and sponsorship services. Bring your family to France, Canada, or Luxembourg with our comprehensive support.",
  keywords: "family reunification, family sponsorship, spouse visa, parent sponsorship, family visa, dependent visa",
  openGraph: {
    title: "Family Reunification Services | Travel Agency",
    description: "Expert family reunification and sponsorship services.",
    url: "/services/family-reunification",
    type: "website",
  }
};

const features = [
  "Family sponsorship eligibility assessment",
  "Spouse and common-law partner applications",
  "Parent and grandparent sponsorship",
  "Dependent child visa applications",
  "Family reunification under EU law (France, Luxembourg)",
  "Super visa applications (Canada)",
  "Financial requirements and income assessment",
  "Relationship documentation preparation",
  "Medical and police clearance coordination",
  "Appeal and refusal case handling",
];

export default function FamilyReunificationPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Family Immigration</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Family <span className="text-gold">Reunification</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Reunite with your loved ones. We provide compassionate and expert guidance for family sponsorship and reunification applications to France, Canada, and Luxembourg.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl text-navy mb-6">
                Bringing Families Together
              </h2>
              <p className="text-gray-600 mb-6">
                We understand that being separated from family is difficult. Our family reunification specialists have helped thousands of families successfully reunite in their new home country.
              </p>
              <div className="space-y-4">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy to-navy-800 rounded-2xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-4">Family Sponsorship Programs</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇨🇦</span>
                  <span>Canada Spousal Sponsorship</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇨🇦</span>
                  <span>Canada Parent & Grandparent Sponsorship</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇨🇦</span>
                  <span>Canada Super Visa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇫🇷</span>
                  <span>France Family Reunification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇱🇺</span>
                  <span>Luxembourg Family Reunification</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-6 py-3 rounded-full mt-6 hover:bg-yellow-500 transition-colors"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl text-navy mb-12 text-center">
            Comprehensive Family Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.slice(5).map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Heart className="w-6 h-6 text-red-500 mb-3" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl mb-6">
            Ready to Reunite Your Family?
          </h2>
          <p className="text-white/80 mb-8">
            Schedule a free consultation with our family reunification experts to discuss your case and explore your options.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors"
          >
            Book Free Consultation <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
