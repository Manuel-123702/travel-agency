import type { Metadata } from "next";
import { CheckCircle, Award, Users, Globe, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | 10+ Years Immigration Excellence | Travel Agency",
  description: "Learn about Travel Agency — 10+ years of excellence in international immigration consulting for France, Canada, and Luxembourg with 97% success rate. Meet our expert team.",
  keywords: "immigration agency about, immigration consultants, visa experts, travel agency team, immigration success rate",
  openGraph: {
    title: "About Us | Travel Agency",
    description: "Learn about Travel Agency — 10+ years of excellence in international immigration consulting.",
    url: "/about",
    type: "website",
    images: [{
      url: "/og-about.jpg",
      width: 1200,
      height: 630,
      alt: "About Travel Agency"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Travel Agency",
    description: "Learn about Travel Agency — 10+ years of excellence in international immigration consulting.",
    images: ["/og-about.jpg"]
  }
};

const team = [
  {
    name: "Dr. Marc Fontaine",
    role: "Founder & Lead Immigration Advisor",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "Former consular officer with 15 years of experience. PhD in International Law from Sorbonne University.",
    certs: ["RCIC Registered", "IATA Certified"],
  },
  {
    name: "Aminata Coulibaly",
    role: "Senior Student Immigration Specialist",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Specialist in francophone education pathways with 1,200+ successful student visa applications.",
    certs: ["Certified Immigration Consultant", "Campus France Partner"],
  },
  {
    name: "James Okafor",
    role: "Canada Immigration Expert",
    img: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Expert in Express Entry, Provincial Nominee Programs, and Canadian permanent residency pathways.",
    certs: ["RCIC #R408261", "CICC Member"],
  },
  {
    name: "Sophie Kremer",
    role: "Luxembourg & EU Specialist",
    img: "https://randomuser.me/api/portraits/women/67.jpg",
    bio: "Trilingual specialist (EN/FR/DE) in EU work permits and Luxembourg residency programs.",
    certs: ["EU Immigration Expert", "Luxembourg Bar Association"],
  },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "We maintain the highest ethical standards and are always transparent about costs, timelines, and realistic outcomes." },
  { icon: Target, title: "Excellence", desc: "We commit to delivering the highest quality service in every case we handle, with meticulous attention to detail." },
  { icon: Users, title: "Client-First", desc: "Every decision we make is guided by what's best for our clients. Your success is our success." },
  { icon: Globe, title: "Global Vision", desc: "We understand international systems inside out — from consular requirements to employment markets abroad." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 gradient-bg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">
            About Travel Agency
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            10+ Years of Turning<br />
            <span className="text-gold">Dreams into Destinations</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            We&apos;re a team of certified immigration experts passionate about making
            international opportunities accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Our Story</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-6">
              Founded on a Simple Belief: <span className="text-blue-700">Everyone Deserves a Fair Chance</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Travel Agency was founded in 2014 by Dr. Marc Fontaine, a former French consular officer who witnessed firsthand the frustration and confusion that people faced when trying to navigate immigration systems alone.
              </p>
              <p>
                He saw talented students, skilled professionals, and loving families turned away not because they weren&apos;t qualified — but because they didn&apos;t have the right guidance. He decided to change that.
              </p>
              <p>
                Starting with a small team in Montreal, Travel Agency grew rapidly thanks to word-of-mouth from satisfied clients. Today, we&apos;re a 25-person multilingual team serving clients from over 60 countries, with a 97% success rate built over 2,500+ cases.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { n: "2014", l: "Founded" },
                { n: "60+", l: "Countries served" },
                { n: "25", l: "Expert advisors" },
              ].map(({ n, l }) => (
                <div key={l} className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="font-heading font-bold text-2xl text-navy">{n}</div>
                  <div className="text-gray-500 text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
              alt="Team collaboration" 
              className="rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl">
              <div className="font-heading font-bold text-3xl text-navy">97%</div>
              <div className="text-sm text-navy/70">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">Our Core Values</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">The principles that guide everything we do — every day, with every client.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, index) => (
              <div key={title} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-800 relative">
                  <img 
                    src={[
                      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80",
                      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
                      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
                      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"
                    ][index]}
                    alt={title}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon size={26} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-4">
              Meet Our <span className="text-blue-700">Expert Team</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Certified, experienced, and genuinely passionate about your success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, img, bio, certs }) => (
              <div key={name} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full rounded-full object-cover border-4 border-blue-100 group-hover:border-gold transition-colors"
                  />
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-1">{name}</h3>
                <p className="text-blue-700 text-sm font-semibold mb-3">{role}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{bio}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {certs.map((c) => (
                    <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Award size={10} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-heading font-bold text-2xl text-white mb-2">
            Fully Licensed & Internationally Certified
          </h3>
          <p className="text-white/60 text-sm mb-10">Our credentials that ensure you&apos;re in safe hands</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["RCIC Registered", "IATA Certified", "ISO 9001:2015", "AIRC Member", "Campus France Partner"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full">
                <CheckCircle size={16} className="text-gold" />
                <span className="text-white text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
