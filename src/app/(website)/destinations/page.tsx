import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations | Travel Agency",
  description: "Explore immigration opportunities in France, Canada, and Luxembourg with Travel Agency.",
};

const destinations = [
  {
    code: "FR",
    country: "France",
    href: "/france",
    tagline: "Art de Vivre & Academic Excellence",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=85",
    highlights: ["80+ World-Class Universities", "Schengen Zone Access", "Strong Job Market"],
    color: "from-blue-900",
  },
  {
    code: "CA",
    country: "Canada",
    href: "/canada",
    tagline: "Opportunity, Diversity & Natural Splendor",
    img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=85",
    highlights: ["Express Entry System", "Post-Grad Work Permit", "Path to Permanent Residency"],
    color: "from-red-900",
  },
  {
    code: "LU",
    country: "Luxembourg",
    href: "/luxembourg",
    tagline: "Europe's Financial Capital & Tech Hub",
    img: "https://images.unsplash.com/photo-1566245854878-1a88f4fb70a0?w=1200&q=85",
    highlights: ["Highest Wages in EU", "Stable Economy", "Multilingual Society"],
    color: "from-red-800",
  },
];

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Destinations</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Three Countries, <span className="text-gold">Endless Possibilities</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Choose your destination and let us handle everything else.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {destinations.map(({ code, country, href, tagline, img, highlights, color }) => (
            <Link
              key={country}
              href={href}
              className="group relative block rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
            >
              <div className="relative h-72 md:h-80">
                <img src={img} alt={country} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-r ${color}/80 to-transparent`} />
                <div className="absolute inset-0 p-10 flex flex-col justify-center">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-gold font-heading font-black text-xl">{code}</div>
                  <h2 className="font-heading font-bold text-4xl text-white mb-1">{country}</h2>
                  <p className="text-white/70 text-lg mb-6">{tagline}</p>
                  <div className="flex flex-wrap gap-3">
                    {highlights.map((h) => (
                      <span key={h} className="bg-white/20 backdrop-blur text-white text-sm px-4 py-2 rounded-full border border-white/30">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <ArrowRight size={20} className="text-navy" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

