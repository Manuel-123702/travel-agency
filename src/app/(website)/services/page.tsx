import type { Metadata } from "next";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration Services | Student, Work & Visitor Visas | Travel Agency",
  description: "Complete immigration services for France, Canada, and Luxembourg with 97% success rate. Student visas, work permits, visitor visas, family sponsorship, and citizenship applications.",
  keywords: "immigration services, student visa, work permit, visitor visa, family sponsorship, citizenship application, visa consultant",
  openGraph: {
    title: "Immigration Services | Travel Agency",
    description: "Complete immigration services for France, Canada, and Luxembourg with 97% success rate.",
    url: "/services",
    type: "website",
    images: [{
      url: "/og-services.jpg",
      width: 1200,
      height: 630,
      alt: "Immigration Services"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Immigration Services | Travel Agency",
    description: "Complete immigration services for France, Canada, and Luxembourg with 97% success rate.",
    images: ["/og-services.jpg"]
  }
};

const services = [
  {
    id: "student",
    emoji: "🎓",
    title: "Student Immigration",
    tagline: "Your academic journey starts here",
    desc: "We guide students through every step of their academic immigration journey — from choosing the right institution to landing safely at your destination.",
    features: [
      "University & college research and selection",
      "Admissions application assistance",
      "Complete student dossier preparation",
      "Student visa application (France: VLS-TS, Campus France)",
      "CAQ application for Quebec (Canada)",
      "Study Permit application (Canada)",
      "Scholarship research and application",
      "Pre-departure orientation and support",
      "Post-arrival guidance and local contacts",
    ],
    price: "From $450 USD",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=85",
  },
  {
    id: "work",
    emoji: "💼",
    title: "Professional Immigration",
    tagline: "Build your international career",
    desc: "Whether you&apos;re seeking an international career or skilled worker status, our work permit experts will build the strongest possible application for your profile.",
    features: [
      "Professional profile assessment and scoring",
      "Express Entry profile optimization (Canada)",
      "Provincial Nominee Program guidance",
      "Talent Passport applications (France)",
      "EU Blue Card applications (Luxembourg)",
      "Work permit and authorization applications",
      "Job market guidance and employer networking",
      "Credential recognition assistance",
      "Permanent residency pathway planning",
    ],
    price: "From $750 USD",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=85",
  },
  {
    id: "visitor",
    emoji: "✈️",
    title: "Visitor Visa",
    tagline: "Travel with confidence",
    desc: "Our visitor visa specialists prepare airtight applications for tourism, family visits, and business trips — including complex cases and previous refusals.",
    features: [
      "Schengen visa applications (France, Luxembourg)",
      "Canadian Temporary Resident Visa (TRV)",
      "Tourist and leisure visa applications",
      "Family reunion visitor visas",
      "Business visitor applications",
      "Invitation letter preparation",
      "Financial documentation guidance",
      "Previous refusal case recovery",
      "Express processing options",
    ],
    price: "From $250 USD",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=85",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Our Services</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Complete Immigration <span className="text-gold">Solutions</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Every service is delivered by certified experts with a track record of 97% success.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map(({ id, emoji, title, tagline, desc, features, price, img }, i) => (
            <div
              key={id}
              id={id}
              className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-5xl mb-4 block">{emoji}</span>
                <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-3">
                  {tagline}
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">{title}</h2>
                <p className="text-gray-500 leading-relaxed text-lg mb-8" dangerouslySetInnerHTML={{ __html: desc }} />
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-blue-700 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-gold/10 border border-gold/30 rounded-xl px-5 py-3">
                    <span className="text-gold font-heading font-bold">{price}</span>
                  </div>
                  <Link href="/contact"
                    className="flex items-center gap-2 bg-navy text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <img src={img} alt={title} className="rounded-3xl shadow-2xl w-full h-[450px] object-cover" />
                <div className="absolute top-6 right-6 glass rounded-2xl px-5 py-3">
                  <div className="text-white font-heading font-bold text-lg">97% Success</div>
                  <div className="text-white/70 text-xs">Approval Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Not Sure Which Service Is Right for You?
          </h2>
          <p className="text-white/60 mb-8">Book a free 30-minute consultation with our advisors. No commitment required.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy font-heading font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5 transition-all">
            Book Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
