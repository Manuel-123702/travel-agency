import type { Metadata } from "next";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Visa Services | Entrepreneur & Investor Immigration | Travel Agency",
  description: "Expert business visa services for entrepreneurs, investors, and professionals. Start your business in France, Canada, or Luxembourg with our comprehensive support.",
  keywords: "business visa, entrepreneur visa, investor visa, start-up visa, business immigration, company formation",
  openGraph: {
    title: "Business Visa Services | Travel Agency",
    description: "Expert business visa services for entrepreneurs and investors.",
    url: "/services/business-visa",
    type: "website",
  }
};

const features = [
  "Business plan development and review",
  "Company registration and incorporation",
  "Investor visa applications (Start-up Visa Canada)",
  "Entrepreneur visa applications (France Talent Passport)",
  "Business immigration pathway planning",
  "Financial documentation preparation",
  "Market research and feasibility studies",
  "Legal and regulatory compliance guidance",
  "Networking with local business communities",
  "Permanent residency through business investment",
];

export default function BusinessVisaPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Business Immigration</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Business <span className="text-gold">Visa</span> Services
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Launch your international business with confidence. We provide end-to-end support for entrepreneurs, investors, and professionals seeking to establish themselves in France, Canada, or Luxembourg.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl text-navy mb-6">
                Why Choose Our Business Visa Services?
              </h2>
              <p className="text-gray-600 mb-6">
                Our team of business immigration specialists has helped hundreds of entrepreneurs and investors successfully establish their businesses abroad. We understand the unique challenges of international business expansion.
              </p>
              <div className="space-y-4">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy to-navy-800 rounded-2xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-4">Our Business Visa Programs</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇨🇦</span>
                  <span>Canada Start-up Visa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇨🇦</span>
                  <span>Canada Self-Employed Persons Program</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇫🇷</span>
                  <span>France Talent Passport (Entrepreneur)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇫🇷</span>
                  <span>France Business Creator Visa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold">🇱🇺</span>
                  <span>Luxembourg Investor Visa</span>
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
            Complete Service Package
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.slice(5).map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl mb-6">
            Ready to Expand Your Business Internationally?
          </h2>
          <p className="text-white/80 mb-8">
            Schedule a free consultation with our business immigration experts to discuss your goals and explore your options.
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
