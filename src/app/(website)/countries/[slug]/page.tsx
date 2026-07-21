import { Metadata } from "next";
import CountryDetailClient from "./CountryDetailClient";
import { notFound } from "next/navigation";

// Country data — in a real app this comes from Sanity CMS
const countries: Record<string, CountryData> = {
  france: {
    slug: "france",
    flag: "🇫🇷",
    name: "France",
    capital: "Paris",
    region: "Western Europe",
    language: "French",
    currency: "Euro (€)",
    population: "68 million",
    tagline: "Art, Culture & Elite Education",
    description: "France is one of the world's most attractive destinations for international students and professionals. Home to the Eiffel Tower, world-class cuisine, and some of Europe's most prestigious universities, France offers an unparalleled quality of life.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90",
    accentColor: "#2563EB",
    bgGradient: "from-blue-900 to-blue-700",
    visaTypes: [
      { name: "Student Visa (VLS-TS Étudiant)", duration: "1 year", renewable: true, description: "For students enrolled in accredited French institutions" },
      { name: "Talent Passport", duration: "4 years", renewable: true, description: "For highly skilled professionals, researchers, and entrepreneurs" },
      { name: "Working Holiday Visa", duration: "1 year", renewable: false, description: "For young people aged 18–35 from partner countries" },
      { name: "Long Stay Visa (VLS-TS Salarié)", duration: "1 year", renewable: true, description: "For employed workers with a French work contract" },
      { name: "Visitor Visa (Schengen)", duration: "90 days", renewable: false, description: "For tourism, family visits, short business trips" },
    ],
    topUniversities: [
      { name: "Sorbonne University", city: "Paris", ranking: "#83 World" },
      { name: "École Polytechnique", city: "Palaiseau", ranking: "#65 World" },
      { name: "Sciences Po Paris", city: "Paris", ranking: "Top Social Sciences" },
      { name: "HEC Paris", city: "Jouy-en-Josas", ranking: "#1 Europe MBA" },
      { name: "Université Paris-Saclay", city: "Paris", ranking: "#13 World" },
    ],
    costOfLiving: {
      rent: "€600–1,400/month",
      food: "€250–450/month",
      transport: "€75/month",
      utilities: "€80–150/month",
      total: "€1,100–2,200/month",
    },
    salaryRanges: [
      { sector: "Engineering & Tech", range: "€38,000–70,000/yr" },
      { sector: "Finance & Banking", range: "€45,000–90,000/yr" },
      { sector: "Healthcare", range: "€35,000–80,000/yr" },
      { sector: "Education", range: "€25,000–50,000/yr" },
      { sector: "Hospitality", range: "€22,000–38,000/yr" },
    ],
    processingTime: "4–8 weeks",
    successRate: "94%",
    requirements: [
      "Valid passport (min. 6 months validity)",
      "Completed visa application form (CERFA)",
      "Proof of enrollment or employment",
      "Bank statements showing sufficient funds (€615/month minimum)",
      "Health insurance covering the entire stay",
      "Accommodation proof in France",
      "Return ticket (for short-stay visas)",
      "Passport-size photos",
    ],
    faq: [
      { q: "Do I need to speak French to study in France?", a: "Many universities offer English-taught programs. However, learning French will greatly improve your experience and job prospects." },
      { q: "Can I work while studying in France?", a: "Yes! Students with a valid student visa can work up to 964 hours per year (approximately 20 hours/week)." },
      { q: "Can I stay in France after completing my studies?", a: "Yes. You can apply for an APS (Autorisation Provisoire de Séjour) which allows you to stay for 1 year to look for a job." },
      { q: "What is the CAF housing subsidy?", a: "The CAF (Caisse d'Allocations Familiales) provides housing benefits to students and low-income earners. Most international students are eligible." },
    ],
  },
  canada: {
    slug: "canada",
    flag: "🇨🇦",
    name: "Canada",
    capital: "Ottawa",
    region: "North America",
    language: "English & French",
    currency: "Canadian Dollar (CAD)",
    population: "38 million",
    tagline: "Multicultural & Career Opportunities",
    description: "Canada consistently ranks among the world's best countries for quality of life. With a strong economy, welcoming immigration policies, and clear pathways to permanent residency, Canada is the top choice for immigrants seeking a new home.",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&q=90",
    accentColor: "#DC2626",
    bgGradient: "from-red-900 to-red-700",
    visaTypes: [
      { name: "Express Entry (Federal Skilled Worker)", duration: "PR", renewable: false, description: "Points-based system for skilled workers — fastest PR pathway" },
      { name: "Study Permit", duration: "Duration of studies", renewable: true, description: "Allows international students to study at designated institutions" },
      { name: "Post-Graduation Work Permit (PGWP)", duration: "Up to 3 years", renewable: false, description: "For international graduates from Canadian institutions" },
      { name: "Provincial Nominee Program (PNP)", duration: "PR", renewable: false, description: "Province-specific programs for skilled workers in demand" },
      { name: "Visitor Visa (TRV)", duration: "6 months", renewable: true, description: "For tourism, family visits, and short business stays" },
    ],
    topUniversities: [
      { name: "University of Toronto", city: "Toronto", ranking: "#21 World" },
      { name: "McGill University", city: "Montreal", ranking: "#46 World" },
      { name: "University of British Columbia", city: "Vancouver", ranking: "#47 World" },
      { name: "University of Waterloo", city: "Waterloo", ranking: "Top Engineering" },
      { name: "York University", city: "Toronto", ranking: "Top Research" },
    ],
    costOfLiving: {
      rent: "CAD 1,200–2,500/month",
      food: "CAD 400–700/month",
      transport: "CAD 120/month",
      utilities: "CAD 100–200/month",
      total: "CAD 1,900–3,700/month",
    },
    salaryRanges: [
      { sector: "Technology", range: "CAD 70,000–130,000/yr" },
      { sector: "Engineering", range: "CAD 65,000–110,000/yr" },
      { sector: "Healthcare", range: "CAD 60,000–150,000/yr" },
      { sector: "Finance", range: "CAD 55,000–120,000/yr" },
      { sector: "Trades & Skilled", range: "CAD 50,000–90,000/yr" },
    ],
    processingTime: "6–12 weeks",
    successRate: "98%",
    requirements: [
      "Valid passport",
      "Completed IMM 5257 application form",
      "Proof of financial support (bank statements)",
      "Letter of acceptance (for study permits)",
      "Job offer letter (for work permits)",
      "Medical examination results",
      "Police certificates",
      "Biometrics (fingerprints and photo)",
    ],
    faq: [
      { q: "What is the CRS score for Express Entry?", a: "The Comprehensive Ranking System (CRS) score varies each draw. As of 2024, competitive scores range from 470–520. Language, education, and work experience boost your score." },
      { q: "Can my family come with me to Canada?", a: "Yes. You can include your spouse/common-law partner and dependent children in your application. They may also be eligible to study and work." },
      { q: "How long before I can apply for citizenship?", a: "After receiving your Permanent Residence, you must live in Canada for 3 out of 5 years before applying for citizenship." },
    ],
  },
  luxembourg: {
    slug: "luxembourg",
    flag: "🇱🇺",
    name: "Luxembourg",
    capital: "Luxembourg City",
    region: "Western Europe",
    language: "French, German & Luxembourgish",
    currency: "Euro (€)",
    population: "660,000",
    tagline: "Financial Capital of Europe",
    description: "Luxembourg is the wealthiest country in the EU per capita and a premier destination for finance, law, and tech professionals. Its small size belies a massive international community and outstanding quality of life.",
    heroImage: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1920&q=90",
    accentColor: "#EF4444",
    bgGradient: "from-blue-800 to-red-700",
    visaTypes: [
      { name: "EU Blue Card", duration: "2–4 years", renewable: true, description: "For highly qualified non-EU workers with a job offer" },
      { name: "Salaried Worker Permit", duration: "1 year", renewable: true, description: "For workers with a valid employment contract" },
      { name: "Student Residence Permit", duration: "1 year", renewable: true, description: "For students enrolled in Luxembourg universities" },
      { name: "Investor / Business Permit", duration: "3 years", renewable: true, description: "For entrepreneurs and investors creating local businesses" },
    ],
    topUniversities: [
      { name: "University of Luxembourg", city: "Luxembourg City", ranking: "Top EU Research" },
      { name: "Sacred Heart University Luxembourg", city: "Luxembourg City", ranking: "Top Business" },
    ],
    costOfLiving: {
      rent: "€1,200–2,500/month",
      food: "€300–500/month",
      transport: "FREE (public transport)",
      utilities: "€100–180/month",
      total: "€1,700–3,200/month",
    },
    salaryRanges: [
      { sector: "Finance & Banking", range: "€60,000–150,000/yr" },
      { sector: "Legal & Compliance", range: "€55,000–120,000/yr" },
      { sector: "Technology", range: "€55,000–110,000/yr" },
      { sector: "Healthcare", range: "€45,000–90,000/yr" },
    ],
    processingTime: "6–10 weeks",
    successRate: "97%",
    requirements: [
      "Valid passport (min. 12 months validity)",
      "Employment contract or business plan",
      "Proof of accommodation",
      "Health insurance certificate",
      "Criminal record certificate",
      "Diploma / professional qualifications",
      "Proof of financial resources",
    ],
    faq: [
      { q: "Is French mandatory to live in Luxembourg?", a: "French is the most widely used language for official purposes, but many companies operate in English, especially in the financial sector." },
      { q: "Is public transport really free?", a: "Yes! Since March 2020, all public transport in Luxembourg is free, making it one of the most commuter-friendly countries in the world." },
    ],
  },
};

interface CountryData {
  slug: string; flag: string; name: string; capital: string; region: string;
  language: string; currency: string; population: string; tagline: string;
  description: string; heroImage: string; accentColor: string; bgGradient: string;
  visaTypes: { name: string; duration: string; renewable: boolean; description: string }[];
  topUniversities: { name: string; city: string; ranking: string }[];
  costOfLiving: { rent: string; food: string; transport: string; utilities: string; total: string };
  salaryRanges: { sector: string; range: string }[];
  processingTime: string; successRate: string;
  requirements: string[];
  faq: { q: string; a: string }[];
}

export async function generateStaticParams() {
  return Object.keys(countries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = countries[slug];
  if (!country) return { title: "Country Not Found" };
  return {
    title: `${country.flag} ${country.name} Immigration | Travel Agency`,
    description: `Expert immigration assistance to ${country.name}. ${country.description.slice(0, 150)}...`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries[slug];
  if (!country) notFound();
  return <CountryDetailClient country={country} />;
}
