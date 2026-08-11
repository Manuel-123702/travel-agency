import type { Metadata } from "next";
import { Clock, Tag, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canada Immigration Blog | Travel Agency",
  description: "Expert guides on studying, working, and immigrating to Canada. Express Entry, study permits, work permits, and PR pathways.",
};

const canadaPosts = [
  {
    category: "Study Permit",
    title: "Studying in Canada in 2026: Universities, Costs, and Visa Requirements",
    excerpt: "Canada remains a top destination for international students. This guide covers everything from choosing universities to securing your study permit.",
    img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    date: "June 8, 2026",
    readTime: "9 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: true,
    slug: "canada-immigration",
  },
  {
    category: "Express Entry",
    title: "Canada Express Entry: How to Maximize Your CRS Score in 2026",
    excerpt: "The Comprehensive Ranking System determines who gets invited to apply for permanent residency. Here's how to strategically boost your score.",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    date: "May 15, 2026",
    readTime: "8 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: true,
    slug: "canada-immigration",
  },
  {
    category: "Work Permit",
    title: "Canada Work Permit Guide: LMIA, Employer-Specific, and Open Work Permits",
    excerpt: "Understanding the different types of Canadian work permits and which one is right for your situation.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    date: "April 28, 2026",
    readTime: "7 min read",
    author: "Sarah Chen",
    authorImg: "https://randomuser.me/api/portraits/women/33.jpg",
    featured: false,
    slug: "canada-immigration",
  },
  {
    category: "Permanent Residency",
    title: "Pathways to Canadian Permanent Residency: Federal & Provincial Programs",
    excerpt: "Explore the various routes to becoming a permanent resident of Canada, from federal programs to provincial nominee programs.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    date: "April 15, 2026",
    readTime: "10 min read",
    author: "Dr. Marc Fontaine",
    authorImg: "https://randomuser.me/api/portraits/men/41.jpg",
    featured: false,
    slug: "canada-immigration",
  },
  {
    category: "Student Life",
    title: "Cost of Living in Canada: Budget Guide for International Students",
    excerpt: "A comprehensive breakdown of tuition fees, accommodation, food, transportation, and other expenses for students in major Canadian cities.",
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    date: "March 22, 2026",
    readTime: "6 min read",
    author: "Aminata Coulibaly",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    featured: false,
    slug: "canada-immigration",
  },
  {
    category: "Settlement",
    title: "Post-Arrival Guide: Settling in Canada as a New Immigrant",
    excerpt: "Essential steps after arriving in Canada: SIN card, banking, housing, healthcare, and integration services.",
    img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
    date: "March 10, 2026",
    readTime: "8 min read",
    author: "Sophie Kremer",
    authorImg: "https://randomuser.me/api/portraits/women/67.jpg",
    featured: false,
    slug: "canada-immigration",
  },
];

export default function CanadaBlogPage() {
  const featured = canadaPosts.filter((p) => p.featured);
  const regular = canadaPosts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl">🇨🇦</span>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest">Canada Immigration</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Your Complete Guide to <span className="text-gold">Canada</span>
          </h1>
          <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
            Expert insights on studying, working, and building a new life in Canada. From Express Entry to student visas, we cover all pathways.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700 mb-1">97%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700 mb-1">30-90</div>
              <div className="text-sm text-gray-500">Days Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700 mb-1">100+</div>
              <div className="text-sm text-gray-500">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700 mb-1">PR</div>
              <div className="text-sm text-gray-500">Pathway Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">Featured Canada Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map(({ category, title, excerpt, img, date, readTime, author, authorImg, slug }) => (
              <article
                key={title}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-56">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Tag size={10} /> {category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl leading-snug mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs text-gray-500 font-medium">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-red-600 text-sm font-semibold hover:gap-2 transition-all">
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">More Canada Resources</h2>
          <div className="space-y-6">
            {regular.map(({ category, title, excerpt, img, date, readTime, author, authorImg, slug }) => (
              <article
                key={title}
                className="group flex gap-6 bg-[#F8FAFC] rounded-2xl overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative w-48 flex-shrink-0 overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="py-6 pr-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">{category}</span>
                    <span className="text-gray-400 text-xs">{date}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-red-600 transition-colors">
                    <Link href={`/blog/${slug}`} className="hover:text-red-600 transition-colors">{title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-red-600 text-sm font-semibold hover:gap-2 transition-all">
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading font-bold text-3xl text-navy mb-4">Ready to Start Your Canada Journey?</h2>
          <p className="text-gray-600 mb-8">Book a free consultation with our Canada immigration experts to discuss your pathway.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            <MapPin size={18} />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
