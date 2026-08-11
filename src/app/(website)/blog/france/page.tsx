import type { Metadata } from "next";
import { Clock, Tag, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "France Immigration Blog | Travel Agency",
  description: "Expert guides on studying, working, and living in France. Student visas, work permits, and French immigration pathways.",
};

const francePosts = [
  {
    category: "Student Visa",
    title: "How to Obtain a Student Visa for France in 2026: The Complete Guide",
    excerpt: "Everything you need to know about the Campus France process, VLS-TS student visa, and how to maximize your approval chances. Includes a step-by-step checklist.",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    date: "June 15, 2026",
    readTime: "7 min read",
    author: "Aminata Coulibaly",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    featured: true,
    slug: "studying-in-france",
  },
  {
    category: "Work Permit",
    title: "Working in France: Salaries, Work Permit Types, and How to Apply",
    excerpt: "France offers various work permit options for non-EU citizens. Learn about the different types, salary requirements, and application process.",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    date: "May 20, 2026",
    readTime: "8 min read",
    author: "Sophie Kremer",
    authorImg: "https://randomuser.me/api/portraits/women/67.jpg",
    featured: true,
    slug: "studying-in-france",
  },
  {
    category: "Campus France",
    title: "Campus France Process: Step-by-Step Guide for International Students",
    excerpt: "The Campus France procedure is mandatory for many international students. Here's how to navigate the process smoothly.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    date: "April 25, 2026",
    readTime: "6 min read",
    author: "Dr. Marc Fontaine",
    authorImg: "https://randomuser.me/api/portraits/men/41.jpg",
    featured: false,
    slug: "studying-in-france",
  },
  {
    category: "VLS-TS",
    title: "Understanding the VLS-TS Visa: Student Visa for France Explained",
    excerpt: "The VLS-TS (Visa de Long Séjour valant Titre de Séjour) is the standard student visa for France. Learn about its benefits and requirements.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    date: "April 12, 2026",
    readTime: "5 min read",
    author: "Aminata Coulibaly",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    featured: false,
    slug: "studying-in-france",
  },
  {
    category: "French Universities",
    title: "Top French Universities for International Students in 2026",
    excerpt: "Discover the best universities in France for international students, including Sorbonne, Sciences Po, and top engineering schools.",
    img: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    date: "March 18, 2026",
    readTime: "9 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: false,
    slug: "studying-in-france",
  },
  {
    category: "Cost of Living",
    title: "Cost of Living in France: Budget Guide for Students and Workers",
    excerpt: "A detailed breakdown of living costs in Paris and other French cities, including accommodation, food, transportation, and healthcare.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    date: "March 5, 2026",
    readTime: "7 min read",
    author: "Sarah Chen",
    authorImg: "https://randomuser.me/api/portraits/women/33.jpg",
    featured: false,
    slug: "studying-in-france",
  },
];

export default function FranceBlogPage() {
  const featured = francePosts.filter((p) => p.featured);
  const regular = francePosts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl">🇫🇷</span>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest">France Immigration</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Your Complete Guide to <span className="text-gold">France</span>
          </h1>
          <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
            Expert insights on studying, working, and living in France. From Campus France to work permits, discover all pathways to the French dream.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">95%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">15-30</div>
              <div className="text-sm text-gray-500">Days Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">80+</div>
              <div className="text-sm text-gray-500">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">Schengen</div>
              <div className="text-sm text-gray-500">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">Featured France Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map(({ category, title, excerpt, img, date, readTime, author, authorImg, slug }) => (
              <article
                key={title}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-56">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Tag size={10} /> {category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs text-gray-500 font-medium">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:gap-2 transition-all">
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
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">More France Resources</h2>
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
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{category}</span>
                    <span className="text-gray-400 text-xs">{date}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">{title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{author}</span>
                    </div>
                    <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:gap-2 transition-all">
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
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading font-bold text-3xl text-navy mb-4">Ready to Start Your France Journey?</h2>
          <p className="text-gray-600 mb-8">Book a free consultation with our France immigration experts to discuss your pathway.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <MapPin size={18} />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
