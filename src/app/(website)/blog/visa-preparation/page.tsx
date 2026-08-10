import type { Metadata } from "next";
import { Clock, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visa Preparation Guide 2026 | Travel Agency",
  description: "Complete guide to visa preparation, documentation, and interview tips for successful applications.",
};

export default function VisaPreparationPage() {
  return (
    <div className="pt-20">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-700 hover:gap-3 transition-all mb-8">
          <ArrowRight size={16} className="rotate-180" /> Back to Blog
        </Link>

        <header className="mb-12">
          <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-4">Tips & Guides</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-navy mb-6">
            Visa Preparation: Essential Tips for a Successful Application
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>May 22, 2026</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={14} /> 8 min read</span>
            <span>·</span>
            <span>By Dr. Marc Fontaine</span>
          </div>
        </header>

        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80" 
          alt="Visa Preparation" 
          className="w-full h-96 object-cover rounded-3xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Proper visa preparation is crucial for a successful immigration application. This comprehensive guide covers everything you need to know to maximize your chances of approval.
          </p>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Common Mistakes to Avoid</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            After reviewing thousands of applications, our experts have identified the most frequent errors:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Incomplete or inconsistent information</li>
            <li>Missing required documents</li>
            <li>Insufficient financial proof</li>
            <li>Poorly written purpose statements</li>
            <li>Lack of ties to home country</li>
            <li>Not meeting language requirements</li>
            <li>Submitting outdated forms</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Essential Documents</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Prepare these documents well in advance:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li><strong>Valid Passport:</strong> Must be valid for at least 6 months beyond your intended stay</li>
            <li><strong>Birth Certificate:</strong> Official copy with translation if needed</li>
            <li><strong>Police Clearance:</strong> From all countries where you've lived</li>
            <li><strong>Medical Examination:</strong> Designated panel physician report</li>
            <li><strong>Financial Proof:</strong> Bank statements, sponsorship letters</li>
            <li><strong>Education Documents:</strong> Diplomas, transcripts, certificates</li>
            <li><strong>Employment Proof:</strong> Reference letters, contracts</li>
            <li><strong>Photos:</strong> Meeting specific size and background requirements</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Financial Requirements</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Demonstrating financial stability is crucial:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Show sufficient funds for tuition and living expenses</li>
            <li>Provide 6-12 months of bank statements</li>
            <li>Include proof of income and assets</li>
            <li>If sponsored, include sponsor's financial documents</li>
            <li>Explain any large deposits or unusual transactions</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Interview Preparation</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            If an interview is required, prepare thoroughly:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Research common interview questions</li>
            <li>Practice your answers aloud</li>
            <li>Be honest and consistent</li>
            <li>Dress professionally</li>
            <li>Bring original documents</li>
            <li>Arrive early</li>
            <li>Be respectful and polite</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Language Requirements</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Meet language test requirements:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li><strong>IELTS:</strong> Most widely accepted</li>
            <li><strong>TOEFL:</strong> Accepted in many countries</li>
            <li><strong>CELPIP:</strong> For Canada</li>
            <li><strong>TEF:</strong> For French-speaking programs</li>
            <li><strong>DELF/DALF:</strong> French proficiency</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-navy mb-4">Timeline Tips</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Plan your application timeline:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-8">
            <li>Start preparation 6-12 months in advance</li>
            <li>Book language tests early</li>
            <li>Schedule medical appointments promptly</li>
            <li>Allow time for document gathering</li>
            <li>Submit application well before deadlines</li>
            <li>Follow up respectfully if processing takes longer than expected</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-lg my-8">
            <p className="text-blue-900 font-semibold mb-2">Need Professional Help?</p>
            <p className="text-blue-800 text-sm mb-4">
              Our certified immigration consultants can review your application and guide you through the process.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              Get Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Dr. Marc Fontaine" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-navy">Dr. Marc Fontaine</p>
                <p className="text-sm text-gray-500">Senior Immigration Consultant</p>
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