import type { Metadata } from "next";
import { CheckCircle, GraduationCap, Briefcase, Camera, ArrowRight, FileText, Clock, DollarSign, Building2, Users, Award, BookOpen, Globe, Plane, Home, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration to Canada | Express Entry, Study & Work Permits | Travel Agency",
  description: "Expert Canadian immigration services with 97% success rate. Express Entry, study permits, work permits, visitor visas, and family sponsorship. Start your journey today.",
  keywords: "Canada immigration, Express Entry, study permit Canada, work permit Canada, visitor visa Canada, PR Canada, Canadian citizenship",
  openGraph: {
    title: "Immigration to Canada | Travel Agency",
    description: "Expert Canadian immigration services with 97% success rate. Express Entry, study permits, work permits, and more.",
    url: "/canada",
    type: "website",
    images: [{
      url: "/og-canada.jpg",
      width: 1200,
      height: 630,
      alt: "Canada Immigration Services"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Immigration to Canada | Travel Agency",
    description: "Expert Canadian immigration services with 97% success rate.",
    images: ["/og-canada.jpg"]
  }
};

export default function CanadaPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
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

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-navy mb-4">Why Choose Canada?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Canada consistently ranks as one of the best countries in the world for quality of life, education, and economic opportunity.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "38 Million", desc: "Population" },
              { icon: DollarSign, label: "$50,000+", desc: "Avg. Annual Salary" },
              { icon: Globe, label: "Top 10", desc: "World Education" },
              { icon: Shield, label: "Safe & Stable", desc: "Political Environment" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-red-700" />
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
            <p className="text-gray-600 max-w-2xl mx-auto">Explore the various ways to make Canada your new home.</p>
          </div>
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

      {/* Express Entry Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl text-navy mb-6">Express Entry System</h2>
              <p className="text-gray-600 mb-8">Canada's flagship immigration management system for skilled workers. The Comprehensive Ranking System (CRS) ranks candidates based on skills, education, language ability, and work experience.</p>
              <div className="space-y-4">
                {[
                  "Federal Skilled Worker Program (FSWP)",
                  "Federal Skilled Trades Program (FSTP)",
                  "Canadian Experience Class (CEC)",
                  "Provincial Nominee Programs (PNP)",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-red-700" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8">
              <h3 className="font-heading font-bold text-2xl text-navy mb-6">CRS Score Factors</h3>
              <div className="space-y-4">
                {[
                  { label: "Language Skills", value: "Up to 136 points" },
                  { label: "Education", value: "Up to 150 points" },
                  { label: "Work Experience", value: "Up to 80 points" },
                  { label: "Age", value: "Up to 100 points" },
                  { label: "Arranged Employment", value: "Up to 200 points" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-700">{label}</span>
                    <span className="font-bold text-red-700">{value}</span>
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
            <p className="text-white/70 max-w-2xl mx-auto">Canada is home to world-class educational institutions recognized globally.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "University of Toronto", ranking: "#1 in Canada", location: "Toronto, Ontario" },
              { name: "McGill University", ranking: "#1 in Medical-Doctoral", location: "Montreal, Quebec" },
              { name: "University of British Columbia", ranking: "Top 40 Global", location: "Vancouver, BC" },
              { name: "University of Alberta", ranking: "Top 5 in Canada", location: "Edmonton, Alberta" },
              { name: "McMaster University", ranking: "Top Research", location: "Hamilton, Ontario" },
              { name: "University of Waterloo", ranking: "#1 in Innovation", location: "Waterloo, Ontario" },
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
            <p className="text-gray-600 max-w-2xl mx-auto">Understanding the financial aspects of living in Canada.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Rent (1-bedroom)", value: "$1,200 - $2,500/mo", icon: Home },
              { label: "Groceries", value: "$300 - $500/mo", icon: FileText },
              { label: "Transportation", value: "$100 - $200/mo", icon: Plane },
              { label: "Utilities", value: "$150 - $300/mo", icon: DollarSign },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="card-premium p-6 text-center">
                <Icon size={32} className="text-red-700 mx-auto mb-4" />
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
              { type: "Study Permit", desc: "For international students", time: "4-6 weeks" },
              { type: "Work Permit", desc: "For temporary workers", time: "2-12 weeks" },
              { type: "Express Entry", desc: "For skilled workers", time: "6-8 months" },
              { type: "PNP", desc: "Provincial nomination", time: "12-18 months" },
              { type: "Family Sponsorship", desc: "For family reunification", time: "12-24 months" },
              { type: "Visitor Visa", desc: "For tourism/visits", time: "2-4 weeks" },
            ].map((visa) => (
              <div key={visa.type} className="card-premium p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-red-700" size={24} />
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
            <p className="text-gray-600 max-w-2xl mx-auto">Essential documents for your Canadian immigration application.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Valid Passport",
              "Educational Credentials",
              "Language Test Results (IELTS/CELPIP)",
              "Work Experience Letters",
              "Proof of Funds",
              "Medical Examination",
              "Police Clearance Certificate",
              "Birth & Marriage Certificates",
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                <CheckCircle size={20} className="text-red-700 flex-shrink-0" />
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
              { type: "Study Permit", time: "4-6 weeks" },
              { type: "Work Permit", time: "2-12 weeks" },
              { type: "Express Entry", time: "6 months" },
              { type: "PNP", time: "12-18 months" },
              { type: "Family Sponsorship", time: "12-24 months" },
              { type: "Citizenship", time: "12-24 months" },
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
            <p className="text-gray-600">Common questions about Canadian immigration.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What is the minimum CRS score for Express Entry?",
                a: "The minimum CRS score varies in each draw. Recent draws have ranged from 440-500 points depending on the program and category."
              },
              {
                q: "Can I work while studying in Canada?",
                a: "Yes, international students can work up to 20 hours per week during semesters and full-time during scheduled breaks."
              },
              {
                q: "How long does it take to get Canadian citizenship?",
                a: "You can apply for citizenship after physically residing in Canada for at least 1,095 days (3 years) in the 5 years before applying."
              },
              {
                q: "Do I need a job offer to immigrate to Canada?",
                a: "No, a job offer is not always required. However, having a valid job offer can significantly increase your CRS score and speed up the process."
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
