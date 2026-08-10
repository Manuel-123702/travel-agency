import type { Metadata } from "next";
import { Clock, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canada Immigration Guide 2026 | Travel Agency",
  description: "Complete guide to Canadian immigration, student visas, work permits, and permanent residency.",
};

export default function CanadaImmigrationPage() {
  return (
    <div className="pt-20">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-700 hover:gap-3 transition-all mb-8">
          <ArrowRight size={16} className="rotate-180" /> Back to Blog
        </Link>

        <header className="mb-12">
          <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Canada</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-navy mb-6">
            Canada Immigration: Your Complete Guide for 2026
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>June 8, 2026</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={14} /> 9 min read</span>
            <span>·</span>
            <span>By James Okafor</span>
          </div>
        </header>

        <img 
          src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80" 
          alt="Canada" 
          className="w-full h-96 object-cover rounded-3xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Canada remains one of the most sought-after destinations for immigrants worldwide. With its welcoming policies, strong economy, and high quality of life, it's no wonder millions aspire to make Canada their new home.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Why Choose Canada?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Canada offers numerous advantages for immigrants:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Strong economy with diverse job opportunities</li>
            <li>Universal healthcare system</li>
            <li>High-quality education system</li>
            <li>Multicultural society</li>
            <li>Safe communities with low crime rates</li>
            <li>Pathway to citizenship</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Immigration Programs</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Canada offers several immigration pathways:
          </p>

          <h3 className="font-heading font-bold text-xl text-navy mb-3">Express Entry System</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            The Express Entry system manages applications for permanent residence under three federal economic immigration programs:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Federal Skilled Worker Program</li>
            <li>Federal Skilled Trades Program</li>
            <li>Canadian Experience Class</li>
          </ul>

          <h3 className="font-heading font-bold text-xl text-navy mb-3">Provincial Nominee Programs (PNP)</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Each Canadian province and territory has its own immigration program to nominate individuals who have the skills to contribute to that specific region's economy.
          </p>

          <h3 className="font-heading font-bold text-xl text-navy mb-3">Study Permit</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            International students can study at designated learning institutions (DLIs) in Canada and may be eligible for a post-graduation work permit.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Application Process</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The immigration process typically involves:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-8">
            <li>Determine your eligibility</li>
            <li>Choose the right immigration program</li>
            <li>Gather required documents</li>
            <li>Complete language tests (IELTS, CELPIP, TEF)</li>
            <li>Submit your application</li>
            <li>Wait for processing and provide additional information if requested</li>
            <li>Receive your visa and prepare for arrival</li>
          </ol>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Tips for Success</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Improve your language scores to increase CRS points</li>
            <li>Gain Canadian work experience through study or temporary work permits</li>
            <li>Research provincial programs that match your profile</li>
            <li>Ensure all documents are accurate and complete</li>
            <li>Consider using a certified immigration consultant</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-lg my-8">
            <p className="text-blue-900 font-semibold mb-2">Need Help with Your Application?</p>
            <p className="text-blue-800 text-sm mb-4">
              Our certified immigration consultants can guide you through every step of the process.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="James Okafor" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-navy">James Okafor</p>
                <p className="text-sm text-gray-500">Immigration Consultant</p>
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