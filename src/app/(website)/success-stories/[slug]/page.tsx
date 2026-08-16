import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, CheckCircle2, Share2, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const successStoriesData = [
  {
    slug: "amara-k-student-visa-france",
    name: "Amara K.",
    country: "France 🇫🇷",
    category: "Student Visa",
    result: "Visa approved in 3 weeks",
    description:
      "With complete guidance from application preparation to interview, Amara successfully started her studies in France.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    fullStory: `
      <p class="mb-4">Amara, a bright student from Cameroon, dreamed of pursuing her master's degree in France. With a strong academic background in computer science, she was accepted into one of France's prestigious engineering schools.</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Challenge</h3>
      <p class="mb-4">The French student visa process (VLS-TS) is complex, requiring Campus France registration, visa application at the consulate, and thorough preparation for the embassy interview. Amara needed guidance on document preparation, financial proof, and interview techniques.</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">Our Approach</h3>
      <p class="mb-4">Travel Agency provided comprehensive support:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Complete Campus France dossier preparation</li>
        <li>Financial documentation guidance</li>
        <li>Visa application form assistance</li>
        <li>Mock interview preparation</li>
        <li>Accommodation proof documentation</li>
      </ul>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Result</h3>
      <p class="mb-4">Amara's visa was approved in just 3 weeks, well ahead of the typical processing time. She successfully arrived in France and is now pursuing her master's degree in computer science at École Polytechnique.</p>
      
      <blockquote class="border-l-4 border-gold pl-4 italic my-6 text-gray-700">"The team at Travel Agency made what seemed impossible feel achievable. Their attention to detail and interview preparation were invaluable."</blockquote>
    `,
    date: "March 2024",
    readTime: "5 min read",
  },
  {
    slug: "david-m-work-permit-canada",
    name: "David M.",
    country: "Canada 🇨🇦",
    category: "Professional Immigration",
    result: "Work permit approved",
    description:
      "Our team helped David prepare his professional profile and immigration documents successfully.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    fullStory: `
      <p class="mb-4">David, a senior software engineer from Nigeria, had been working in the tech industry for over 8 years. He sought to relocate to Canada for better career opportunities and quality of life.</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Challenge</h3>
      <p class="mb-4">Canada's Express Entry system is points-based and highly competitive. David needed to optimize his CRS score, obtain credential assessments, and secure a job offer to increase his chances of receiving an ITA (Invitation to Apply).</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">Our Approach</h3>
      <p class="mb-4">Travel Agency provided strategic guidance:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>CRS score optimization strategy</li>
        <li>ECA (Educational Credential Assessment) guidance</li>
        <li>IELTS preparation support</li>
        <li>Job search assistance in Canada</li>
        <li>Express Entry profile creation</li>
      </ul>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Result</h3>
      <p class="mb-4">David received his ITA within 3 months of profile creation. His work permit was approved, and he is now working as a senior software engineer at a leading tech company in Toronto.</p>
      
      <blockquote class="border-l-4 border-gold pl-4 italic my-6 text-gray-700">"The strategic approach to my CRS score made all the difference. I couldn't have done it without their expertise."</blockquote>
    `,
    date: "February 2024",
    readTime: "6 min read",
  },
  {
    slug: "sarah-l-family-visa-luxembourg",
    name: "Sarah L.",
    country: "Luxembourg 🇱🇺",
    category: "Family Visa",
    result: "Family reunited",
    description:
      "A complete immigration solution that helped Sarah join her family abroad.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    fullStory: `
      <p class="mb-4">Sarah, a financial analyst from Kenya, had been separated from her husband who was working in Luxembourg for over a year. She needed to reunite with her family through Luxembourg's family reunification program.</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Challenge</h3>
      <p class="mb-4">Luxembourg's family reunification process requires proof of accommodation, financial stability, and comprehensive documentation. Sarah needed to navigate complex EU immigration regulations while ensuring all requirements were met.</p>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">Our Approach</h3>
      <p class="mb-4">Travel Agency provided end-to-end support:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Family reunification eligibility assessment</li>
        <li>Accommodation proof documentation</li>
        <li>Financial requirements guidance</li>
        <li>Marriage certificate authentication</li>
        <li>Visa application preparation</li>
      </ul>
      
      <h3 class="text-xl font-bold text-navy mt-6 mb-3">The Result</h3>
      <p class="mb-4">Sarah's family reunification visa was approved in 6 weeks. She successfully joined her husband in Luxembourg and has since secured a position as a financial analyst at a major bank.</p>
      
      <blockquote class="border-l-4 border-gold pl-4 italic my-6 text-gray-700">"Reuniting with my family was the most important thing. Travel Agency made it happen smoothly and efficiently."</blockquote>
    `,
    date: "January 2024",
    readTime: "5 min read",
  },
];

export async function generateStaticParams() {
  return successStoriesData.map((story) => ({
    slug: story.slug,
  }));
}

export default function SuccessStoryPage({ params }: { params: { slug: string } }) {
  const story = successStoriesData.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Success Stories
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold mb-4">
              {story.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl mb-4">
              {story.result}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {story.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} /> {story.country}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {story.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Client</p>
              <p className="font-heading font-bold text-navy text-xl">{story.name}</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
              <CheckCircle2 size={18} />
              <span className="font-bold text-sm">Approved</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: story.fullStory }} />
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-navy text-lg mb-1">Share this story</h3>
              <p className="text-gray-500 text-sm">Inspire others with this success story</p>
            </div>
            <button className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors">
              <Share2 size={18} /> Share
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="font-heading font-bold text-2xl mb-3">Ready for Your Success Story?</h3>
          <p className="text-white/90 mb-6">Let us help you achieve your immigration goals like {story.name} did.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Start Your Journey <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
