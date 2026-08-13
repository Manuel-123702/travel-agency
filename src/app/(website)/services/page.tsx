import type { Metadata } from "next";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration Services | Student, Work, Business & Family Visas | Travel Agency",
  description: "Complete immigration services for France, Canada, and Luxembourg with 97% success rate. Student visas, work permits, visitor visas, business investor visas, and family reunification.",
  keywords: "immigration services, student visa, work permit, visitor visa, business visa, family reunification, citizenship application, visa consultant",
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
    href: "/services#student",
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
    title: "Professional Immigration & Work Permits",
    tagline: "Build your international career",
    desc: "Whether you're seeking an international career or skilled worker status, our work permit experts will build the strongest possible application for your profile.",
    href: "/services#work",
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
    href: "/services#visitor",
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
  {
    id: "business",
    emoji: "🏢",
    title: "Business & Investor Visa",
    tagline: "Expand your business globally",
    desc: "Tailored immigration programs for entrepreneurs, business founders, and investors seeking residence or commercial expansion in Europe and Canada.",
    href: "/services/business-visa",
    features: [
      "Business plan development & market study",
      "Company creation & registration abroad",
      "Investor visa applications (French Tech Visa / EU)",
      "Entrepreneur & Start-up visa programs",
      "Commercial lease & banking setup assistance",
      "Financial proof & asset audit review",
      "Investor permanent residency pathways",
      "Cross-border tax & legal compliance support",
      "Dedicated corporate immigration advisor",
    ],
    price: "From $1,500 USD",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85",
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧‍👦",
    title: "Family Reunification & Sponsorship",
    tagline: "Bring your loved ones together",
    desc: "Comprehensive legal and administrative support to sponsor spouses, children, parents, and dependent family members for permanent immigration.",
    href: "/services/family-reunification",
    features: [
      "Sponsorship eligibility audit & strategy",
      "Spousal & common-law partner applications",
      "Dependent children visa processing",
      "Parent & Grandparent Super Visa applications",
      "Regroupement Familial (France) processing",
      "EU Family Member Residence Card (Luxembourg)",
      "Income proof & accommodation validation",
      "Relationship document authentication",
      "Full dossier tracking until visa issuance",
    ],
    price: "From $1,200 USD",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=85",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-900 to-blue-950 py-28 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm uppercase tracking-widest bg-gold/10 px-4 py-1.5 rounded-full mb-4 border border-gold/20">
            <Sparkles size={14} /> Full Immigration Suite
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Complete Immigration <span className="text-gold">Solutions</span>
          </h1>
          <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
            Every service is delivered by certified experts with a track record of 97% visa approval.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map(({ id, emoji, title, tagline, desc, features, price, img, href }, i) => (
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
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{desc}</p>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="bg-gold/10 border border-gold/30 rounded-2xl px-5 py-3">
                    <span className="text-gold font-heading font-bold text-lg">{price}</span>
                  </div>
                  <Link
                    href={href}
                    className="flex items-center gap-2 bg-navy text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    View Page Details <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 border-2 border-navy text-navy font-heading font-bold px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-all text-sm"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>

              <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img src={img} alt={title} className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 bg-navy/90 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-white">
                    <div className="font-heading font-bold text-lg text-gold">97% Success</div>
                    <div className="text-white/70 text-xs">Approval Rate</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-navy via-navy-900 to-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Not sure which visa service fits your situation?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Take our free 2-minute assessment or schedule a direct consultation with an immigration expert.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#quiz"
              className="px-8 py-4 bg-gold text-navy font-heading font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg text-base"
            >
              Take Free Assessment
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white font-heading font-bold rounded-full hover:bg-white hover:text-navy transition-all text-base"
            >
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
