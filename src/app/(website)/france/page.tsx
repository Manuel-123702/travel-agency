import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight, FileText, Clock, DollarSign, Building2, Users, Award, BookOpen, Globe, Plane, Home, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to France | Travel Agency",
  description: "Complete guide to studying, working, and visiting France. Expert immigration services with 97% success rate.",
};

export default function FrancePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
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

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Why Choose France?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">France offers a perfect blend of rich culture, excellent healthcare, world-renowned education, and economic opportunity.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "67 Million", desc: "Population" },
              { icon: DollarSign, label: "€2,500+", desc: "Avg. Monthly Salary" },
              { icon: Globe, label: "Top 5", desc: "Global Education" },
              { icon: Shield, label: "EU Member", desc: "Schengen Access" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-blue-700" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-2">{label}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Immigration Pathways</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the various ways to make France your new home.</p>
          </div>
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

      {/* Talent Passport Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl text-navy mb-6">Talent Passport</h2>
              <p className="text-gray-600 mb-8">The French Talent Passport is a multi-year residence permit designed for highly skilled professionals, researchers, artists, and entrepreneurs who wish to live and work in France.</p>
              <div className="space-y-4">
                {[
                  "Valid for 4 years (renewable)",
                  "Family members eligible for accompanying permits",
                  "Fast-track application process",
                  "No labor market test required",
                  "Path to French citizenship after 5 years",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-blue-700" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <h3 className="font-heading font-bold text-2xl text-navy mb-6">Eligibility Categories</h3>
              <div className="space-y-4">
                {[
                  { label: "Highly Skilled Workers", value: "EU Blue Card" },
                  { label: "Researchers", value: "Scientific Research" },
                  { label: "Entrepreneurs", value: "Business Creation" },
                  { label: "Investors", value: "Economic Investor" },
                  { label: "Artists", value: "Cultural/Artistic" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-700">{label}</span>
                    <span className="font-bold text-blue-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">Top Universities</h2>
            <p className="text-white/70 max-w-2xl mx-auto">France is home to some of the world's most prestigious educational institutions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Sorbonne University", ranking: "Historic Excellence", location: "Paris" },
              { name: "Sciences Po", ranking: "Political Science", location: "Paris" },
              { name: "HEC Paris", ranking: "#1 Business School", location: "Jouy-en-Josas" },
              { name: "École Polytechnique", ranking: "Engineering Elite", location: "Palaiseau" },
              { name: "Université PSL", ranking: "Top 50 Global", location: "Paris" },
              { name: "INSEAD", ranking: "Top MBA", location: "Fontainebleau" },
            ].map((uni) => (
              <div key={uni.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                <Building2 className="text-gold mb-4" size={32} />
                <h3 className="font-heading font-bold text-xl text-white mb-2">{uni.name}</h3>
                <p className="text-gold font-semibold mb-1">{uni.ranking}</p>
                <p className="text-white/60 text-sm">{uni.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of Living Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Cost of Living</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Understanding the financial aspects of living in France.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Rent (Paris)", value: "€1,200 - €2,500/mo", icon: Home },
              { label: "Rent (Other Cities)", value: "€600 - €1,200/mo", icon: Home },
              { label: "Groceries", value: "€300 - €500/mo", icon: FileText },
              { label: "Transportation", value: "€70 - €100/mo", icon: Plane },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="card-premium p-6 text-center">
                <Icon size={32} className="text-blue-700 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-navy mb-2">{label}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Visa Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Different visa options for different needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Student Visa", desc: "VLS-TS for study", time: "2-4 weeks" },
              { type: "Talent Passport", desc: "For skilled professionals", time: "2-4 weeks" },
              { type: "Work Permit", desc: "Salaried worker visa", time: "4-8 weeks" },
              { type: "Family Reunification", desc: "For family members", time: "6-12 months" },
              { type: "Visitor Visa", desc: "Schengen short-stay", time: "2-3 weeks" },
              { type: "Business Visa", desc: "For business activities", time: "2-4 weeks" },
            ].map((visa) => (
              <div key={visa.type} className="card-premium p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-700" size={24} />
                  <h3 className="font-heading font-bold text-navy text-lg">{visa.type}</h3>
                </div>
                <p className="text-gray-600 mb-3">{visa.desc}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Processing: {visa.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Required Documents</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Essential documents for your French immigration application.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Valid Passport",
              "Educational Credentials",
              "Language Test Results (DELF/DALF)",
              "Work Experience Letters",
              "Proof of Financial Resources",
              "Medical Certificate",
              "Police Clearance Certificate",
              "Birth & Marriage Certificates",
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <CheckCircle size={20} className="text-blue-700 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Times Section */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">Processing Times</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Current average processing times for different applications.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Student Visa", time: "2-4 weeks" },
              { type: "Talent Passport", time: "2-4 weeks" },
              { type: "Work Permit", time: "4-8 weeks" },
              { type: "Family Reunification", time: "6-12 months" },
              { type: "Visitor Visa", time: "2-3 weeks" },
              { type: "Citizenship", time: "2-3 years" },
            ].map((item) => (
              <div key={item.type} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Clock className="text-gold mx-auto mb-4" size={32} />
                <h3 className="font-heading font-bold text-white text-lg mb-2">{item.type}</h3>
                <p className="text-gold font-semibold">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about French immigration.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Do I need to speak French to immigrate?",
                a: "While French language skills are beneficial, many programs (especially for skilled workers and researchers) don't require fluency. However, learning French will significantly improve your integration and job prospects."
              },
              {
                q: "Can I work while studying in France?",
                a: "Yes, international students can work up to 964 hours per year (approximately 20 hours per week) without needing additional authorization."
              },
              {
                q: "How long does it take to get French citizenship?",
                a: "You can apply for French citizenship after 5 years of continuous residence in France (2 years if you have completed 2 years of higher education in France)."
              },
              {
                q: "What is the difference between VLS-TS and Talent Passport?",
                a: "VLS-TS is a long-stay visa equivalent to a residence permit, typically for students. Talent Passport is a 4-year residence permit for highly skilled professionals, researchers, and entrepreneurs with more benefits."
              },
            ].map((faq, i) => (
              <div key={i} className="card-premium p-6">
                <h3 className="font-heading font-bold text-navy text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
