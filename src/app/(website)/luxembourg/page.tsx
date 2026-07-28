import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight, FileText, Clock, DollarSign, Building2, Users, Award, BookOpen, Globe, Plane, Home, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to Luxembourg | Travel Agency",
  description: "Luxembourg immigration services — EU Blue Card, work permits, student visas. Europe's financial capital awaits.",
};

export default function LuxembourgPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
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

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Why Choose Luxembourg?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Luxembourg offers the highest quality of life in Europe with exceptional economic stability and career opportunities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "660,000", desc: "Population" },
              { icon: DollarSign, label: "€5,000+", desc: "Avg. Monthly Salary" },
              { icon: Globe, label: "#1", desc: "EU GDP per Capita" },
              { icon: Shield, label: "AAA", desc: "Credit Rating" },
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
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the various ways to make Luxembourg your new home.</p>
          </div>
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

      {/* EU Blue Card Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl text-navy mb-6">EU Blue Card</h2>
              <p className="text-gray-600 mb-8">The EU Blue Card is a work and residence permit for non-EU highly skilled workers. Luxembourg offers one of the most attractive Blue Card programs in Europe.</p>
              <div className="space-y-4">
                {[
                  "Valid for 2 years (renewable)",
                  "Family reunification rights",
                  "Permanent residency after 5 years",
                  "Travel within Schengen Zone",
                  "Equal working conditions as EU citizens",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-blue-700" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <h3 className="font-heading font-bold text-2xl text-navy mb-6">Requirements</h3>
              <div className="space-y-4">
                {[
                  { label: "Minimum Salary", value: "€2,916/month" },
                  { label: "Higher Education", value: "Bachelor's degree" },
                  { label: "Work Experience", value: "5 years professional" },
                  { label: "Job Contract", value: "Valid employment offer" },
                  { label: "Health Insurance", value: "Required" },
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
            <h2 className="font-heading font-bold text-4xl text-white mb-4">University of Luxembourg</h2>
            <p className="text-white/70 max-w-2xl mx-auto">The country's premier institution offering multilingual education in French, German, and English.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Faculty of Law", ranking: "Trilingual", location: "Luxembourg City" },
              { name: "Faculty of Sciences", ranking: "Research Excellence", location: "Esch-sur-Alzette" },
              { name: "Faculty of Letters", ranking: "Humanities Focus", location: "Luxembourg City" },
              { name: "Faculty of Economics", ranking: "Business Studies", location: "Luxembourg City" },
              { name: "Interdisciplinary Centre", ranking: "Innovation Hub", location: "Esch-sur-Alzette" },
              { name: "SnT", ranking: "Tech Research", location: "Esch-sur-Alzette" },
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
            <p className="text-gray-600 max-w-2xl mx-auto">Understanding the financial aspects of living in Luxembourg.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Rent (Luxembourg City)", value: "€1,500 - €2,500/mo", icon: Home },
              { label: "Rent (Other Areas)", value: "€1,000 - €1,800/mo", icon: Home },
              { label: "Groceries", value: "€400 - €600/mo", icon: FileText },
              { label: "Transportation", value: "€50 - €100/mo", icon: Plane },
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
              { type: "Student Visa", desc: "For higher education", time: "2-4 weeks" },
              { type: "EU Blue Card", desc: "For skilled workers", time: "4-8 weeks" },
              { type: "Work Permit", desc: "Salaried employment", time: "4-8 weeks" },
              { type: "Family Reunification", desc: "For family members", time: "6-12 months" },
              { type: "Visitor Visa", desc: "Schengen short-stay", time: "2-3 weeks" },
              { type: "Entrepreneur Visa", desc: "Business startup", time: "8-12 weeks" },
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
            <p className="text-gray-600 max-w-2xl mx-auto">Essential documents for your Luxembourg immigration application.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Valid Passport",
              "Educational Credentials",
              "Language Test Results (French/German/English)",
              "Work Experience Letters",
              "Proof of Financial Means",
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
              { type: "EU Blue Card", time: "4-8 weeks" },
              { type: "Work Permit", time: "4-8 weeks" },
              { type: "Family Reunification", time: "6-12 months" },
              { type: "Visitor Visa", time: "2-3 weeks" },
              { type: "Permanent Residency", time: "5 years residence" },
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
            <p className="text-gray-600">Common questions about Luxembourg immigration.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What languages do I need to speak?",
                a: "Luxembourg has three official languages: Luxembourgish, French, and German. English is widely spoken in business. For immigration, knowledge of at least one of the official languages is beneficial but not always required for skilled workers."
              },
              {
                q: "Is Luxembourg expensive to live in?",
                a: "Luxembourg has a high cost of living, but it also offers the highest salaries in the EU. The quality of life, healthcare, and education systems justify the costs for most residents."
              },
              {
                q: "How long does it take to get permanent residency?",
                a: "You can apply for permanent residency after 5 years of continuous legal residence in Luxembourg. After 10 years, you may be eligible for citizenship."
              },
              {
                q: "Can I work in other EU countries with a Luxembourg residence permit?",
                a: "With an EU Blue Card from Luxembourg, you can move to another EU country after 18 months under certain conditions. Regular residence permits are specific to Luxembourg."
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
