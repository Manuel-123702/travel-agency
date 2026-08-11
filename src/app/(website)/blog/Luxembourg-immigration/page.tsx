import type { Metadata } from "next";
import { Clock, Tag, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luxembourg Immigration Blog | Travel Agency",
  description: "Expert guides on working, studying, and living in Luxembourg. EU Blue Card, work permits, and Luxembourg immigration pathways.",
};

const luxembourgPosts = [
  {
    category: "EU Blue Card",
    title: "Working in Luxembourg: EU Blue Card, Salaries, and How to Apply",
    excerpt: "Luxembourg offers the highest wages in the EU and a thriving finance and tech sector. Here's how to navigate the work permit system as a non-EU citizen.",
    img: "https://images.unsplash.com/photo-1566245854878-1a88f4fb70a0?w=800&q=80",
    date: "May 30, 2026",
    readTime: "6 min read",
    author: "Sophie Kremer",
    authorImg: "https://randomuser.me/api/portraits/women/67.jpg",
    featured: true,
    slug: "visa-preparation",
  },
  {
    category: "Finance Sector",
    title: "Career Opportunities in Luxembourg's Financial Sector",
    excerpt: "Luxembourg is a major European financial hub. Discover the best career paths, required qualifications, and how to secure a job in finance.",
    img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    date: "May 10, 2026",
    readTime: "8 min read",
    author: "Dr. Marc Fontaine",
    authorImg: "https://randomuser.me/api/portraits/men/41.jpg",
    featured: true,
    slug: "visa-preparation",
  },
  {
    category: "Work Permit",
    title: "Luxembourg Work Permit Guide: Types, Requirements, and Application Process",
    excerpt: "Understanding the different work permit categories in Luxembourg and which one applies to your situation.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    date: "April 20, 2026",
    readTime: "7 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: false,
    slug: "visa-preparation",
  },
  {
    category: "Cost of Living",
    title: "Cost of Living in Luxembourg: Salaries, Housing, and Expenses",
    excerpt: "A comprehensive guide to living costs in Luxembourg, including housing, transportation, healthcare, and how high salaries offset expenses.",
    img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    date: "April 8, 2026",
    readTime: "6 min read",
    author: "Sarah Chen",
    authorImg: "https://randomuser.me/api/portraits/women/33.jpg",
    featured: false,
    slug: "visa-preparation",
  },
  {
    category: "Tech Industry",
    title: "Luxembourg's Growing Tech Sector: Opportunities for IT Professionals",
    excerpt: "Luxembourg is becoming a European tech hub. Learn about the growing opportunities for software developers, data scientists, and IT professionals.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    date: "March 25, 2026",
    readTime: "8 min read",
    author: "Aminata Coulibaly",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    featured: false,
    slug: "visa-preparation",
  },
  {
    category: "Settlement",
    title: "Moving to Luxembourg: Post-Arrival Guide for New Residents",
    excerpt: "Essential steps after arriving in Luxembourg: residence permit, banking, housing, healthcare registration, and integration.",
    img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    date: "March 12, 2026",
    readTime: "7 min read",
    author: "Sophie Kremer",
    authorImg: "https://randomuser.me/api/portraits/women/67.jpg",
    featured: false,
    slug: "visa-preparation",
  },
];

export default function LuxembourgBlogPage() {
  const featured = luxembourgPosts.filter((p) => p.featured);
  const regular = luxembourgPosts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl">🇱🇺</span>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest">Luxembourg Immigration</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Your Complete Guide to <span className="text-gold">Luxembourg</span>
          </h1>
          <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
            Expert insights on working and living in Luxembourg. From EU Blue Card to finance careers, discover pathways to Europe's wealthiest nation.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-1">96%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-1">30-45</div>
              <div className="text-sm text-gray-500">Days Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-1">#1</div>
              <div className="text-sm text-gray-500">EU Salaries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-1">EU</div>
              <div className="text-sm text-gray-500">Blue Card</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">Featured Luxembourg Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map(({ category, title, excerpt, img, date, readTime, author, authorImg, slug }) => (
              <article
                key={title}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-56">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-navy-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Tag size={10} /> {category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl leading-snug mb-3 group-hover:text-navy-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs text-gray-500 font-medium">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-navy-600 text-sm font-semibold hover:gap-2 transition-all">
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
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">More Luxembourg Resources</h2>
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
                    <span className="text-xs font-semibold text-navy-600 bg-navy-50 px-2.5 py-1 rounded-full">{category}</span>
                    <span className="text-gray-400 text-xs">{date}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-navy-600 transition-colors">
                    <Link href={`/blog/${slug}`} className="hover:text-navy-600 transition-colors">{title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-navy-600 text-sm font-semibold hover:gap-2 transition-all">
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
      <section className="py-16 bg-gradient-to-r from-navy-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading font-bold text-3xl text-navy mb-4">Ready to Start Your Luxembourg Journey?</h2>
          <p className="text-gray-600 mb-8">Book a free consultation with our Luxembourg immigration experts to discuss your pathway.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-navy-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-700 transition-all shadow-lg hover:shadow-xl"
          >
            <MapPin size={18} />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
