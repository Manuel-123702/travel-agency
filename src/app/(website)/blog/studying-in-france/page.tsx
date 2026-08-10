import type { Metadata } from "next";
import { Clock, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studying in France Guide 2026 | Travel Agency",
  description: "Complete guide to studying in France, universities, costs, and visa requirements.",
};

export default function StudyingInFrancePage() {
  return (
    <div className="pt-20">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-700 hover:gap-3 transition-all mb-8">
          <ArrowRight size={16} className="rotate-180" /> Back to Blog
        </Link>

        <header className="mb-12">
          <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Student Visa</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-navy mb-6">
            Studying in France: Universities, Costs, and Visa Requirements
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>June 15, 2026</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={14} /> 7 min read</span>
            <span>·</span>
            <span>By Aminata Coulibaly</span>
          </div>
        </header>

        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80" 
          alt="France" 
          className="w-full h-96 object-cover rounded-3xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            France is home to some of the world's most prestigious universities and offers excellent educational opportunities for international students. With rich culture, affordable tuition, and a central location in Europe, it's an ideal study destination.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Why Study in France?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            France offers numerous advantages for international students:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>World-class education system</li>
            <li>Affordable tuition fees compared to other countries</li>
            <li>Rich cultural heritage and lifestyle</li>
            <li>Central location for European travel</li>
            <li>Strong research and innovation programs</li>
            <li>Opportunities for internships and work</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Types of Institutions</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            France offers different types of higher education institutions:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li><strong>Universities:</strong> Public institutions offering comprehensive programs</li>
            <li><strong>Grandes Écoles:</strong> Elite institutions with competitive admissions</li>
            <li><strong>Business Schools:</strong> Specialized in management and business programs</li>
            <li><strong>Art Schools:</strong> Focused on fine arts, design, and architecture</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Visa Requirements</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            To study in France, you'll need a student visa. The process involves:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-8">
            <li>Get accepted to a French institution</li>
            <li>Apply through Campus France procedure</li>
            <li>Schedule a visa appointment</li>
            <li>Prepare required documents (passport, acceptance letter, financial proof, insurance)</li>
            <li>Attend visa interview</li>
            <li>Receive your VLS-TS visa</li>
          </ol>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Cost of Living</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The cost of living in France varies by city:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li><strong>Paris:</strong> €1,200-1,800 per month</li>
            <li><strong>Lyon, Marseille:</strong> €900-1,300 per month</li>
            <li><strong>Other cities:</strong> €700-1,000 per month</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Working While Studying</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            International students can work part-time (up to 964 hours per year) during their studies. After graduation, you may be eligible for a temporary residence permit to seek employment.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Scholarships</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Several scholarship opportunities are available:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Eiffel Excellence Scholarship</li>
            <li>Erasmus+ Program</li>
            <li>Regional scholarships</li>
            <li>Institution-specific grants</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-lg my-8">
            <p className="text-blue-900 font-semibold mb-2">Need Help with Your Student Visa?</p>
            <p className="text-blue-800 text-sm mb-4">
              Our education consultants can help you navigate the application process and find the right program.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Aminata Coulibaly" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-navy">Aminata Coulibaly</p>
                <p className="text-sm text-gray-500">Education Consultant</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-gray-500 hover:text-navy transition-colors">
              <Share2 size={18} /> Share
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}