import type { Metadata } from "next";
import { Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration Blog | Travel Agency",
  description: "Expert immigration guides, visa tips, and destination insights for France, Canada, and Luxembourg.",
};

const categories = ["All", "Student Visa", "Work Permit", "Canada", "France", "Luxembourg", "Tips & Guides"];

const posts = [
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
  },
  {
    category: "Canada",
    title: "Studying in Canada in 2026: Universities, Costs, and Visa Requirements",
    excerpt: "Canada remains a top destination for international students. This guide covers everything from choosing universities to securing your study permit.",
    img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    date: "June 8, 2026",
    readTime: "9 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: true,
  },
  {
    category: "Luxembourg",
    title: "Working in Luxembourg: EU Blue Card, Salaries, and How to Apply",
    excerpt: "Luxembourg offers the highest wages in the EU and a thriving finance and tech sector. Here's how to navigate the work permit system as a non-EU citizen.",
    img: "https://images.unsplash.com/photo-1566245854878-1a88f4fb70a0?w=800&q=80",
    date: "May 30, 2026",
    readTime: "6 min read",
    author: "Sophie Kremer",
    authorImg: "https://randomuser.me/api/portraits/women/67.jpg",
    featured: true,
  },
  {
    category: "Tips & Guides",
    title: "10 Common Immigration Mistakes That Lead to Visa Refusal",
    excerpt: "After reviewing thousands of applications, our experts share the most frequent errors applicants make — and exactly how to avoid them.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    date: "May 22, 2026",
    readTime: "5 min read",
    author: "Dr. Marc Fontaine",
    authorImg: "https://randomuser.me/api/portraits/men/41.jpg",
    featured: false,
  },
  {
    category: "Work Permit",
    title: "Canada Express Entry: How to Maximize Your CRS Score in 2026",
    excerpt: "The Comprehensive Ranking System determines who gets invited to apply for permanent residency. Here's how to strategically boost your score.",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    date: "May 15, 2026",
    readTime: "8 min read",
    author: "James Okafor",
    authorImg: "https://randomuser.me/api/portraits/men/55.jpg",
    featured: false,
  },
  {
    category: "Tips & Guides",
    title: "Immigration Glossary: 50 Key Terms Every Applicant Should Know",
    excerpt: "From CRS to CAQ, PNP to VLS-TS — we decode the acronyms and jargon so you can navigate immigration processes with confidence.",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    date: "May 5, 2026",
    readTime: "10 min read",
    author: "Aminata Coulibaly",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      <section className="gradient-bg py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-4">Our Blog</span>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6">
            Immigration <span className="text-gold">Insights & Guides</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Expert knowledge, real case studies, and practical advice — free, from our certified advisors.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                cat === "All" ? "bg-navy text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map(({ category, title, excerpt, img, date, readTime, author, authorImg }) => (
              <article
                key={title}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-52">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Tag size={10} /> {category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span>{date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={authorImg} alt={author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs text-gray-500 font-medium">{author}</span>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-1 text-blue-700 text-sm font-semibold hover:gap-2 transition-all">
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
          <h2 className="font-heading font-bold text-2xl text-navy mb-8">More Articles</h2>
          <div className="space-y-6">
            {regular.map(({ category, title, excerpt, img, date, readTime, author, authorImg }) => (
              <article
                key={title}
                className="group flex gap-6 bg-[#F8FAFC] rounded-2xl overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative w-48 flex-shrink-0 overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="py-6 pr-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">{category}</span>
                    <span className="text-gray-400 text-xs">{date}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center gap-2">
                    <img src={authorImg} alt={author} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs text-gray-500">{author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
