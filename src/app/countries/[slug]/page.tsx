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
  germany: {
    slug: "germany",
    flag: "🇩🇪",
    name: "Germany",
    capital: "Berlin",
    region: "Central Europe",
    language: "German",
    currency: "Euro (€)",
    population: "84 million",
    tagline: "Engineering & Innovation Hub",
    description: "Germany is Europe's largest economy and a global leader in engineering, manufacturing, and technology. With tuition-free universities, strong labor demand, and a well-organized immigration system, it's an ideal destination for skilled professionals and students.",
    heroImage: "https://images.unsplash.com/photo-1546726747-421c6d69c929?w=1920&q=90",
    accentColor: "#EAB308",
    bgGradient: "from-gray-900 to-red-800",
    visaTypes: [
      { name: "Job Seeker Visa", duration: "6 months", renewable: false, description: "Allows you to enter Germany to look for a qualified job" },
      { name: "EU Blue Card", duration: "2–4 years", renewable: true, description: "For highly qualified workers with a university degree and job offer" },
      { name: "Skilled Worker Visa (Fachkräfte)", duration: "1–4 years", renewable: true, description: "For vocational and academic professionals" },
      { name: "Student Visa", duration: "Study duration", renewable: true, description: "For students at German universities — most programs free!" },
      { name: "Chancenkarte (Opportunity Card)", duration: "1 year", renewable: false, description: "New points-based visa for job seekers (launched 2024)" },
    ],
    topUniversities: [
      { name: "Technical University of Munich (TUM)", city: "Munich", ranking: "#37 World" },
      { name: "Ludwig Maximilian University", city: "Munich", ranking: "#54 World" },
      { name: "Heidelberg University", city: "Heidelberg", ranking: "#63 World" },
      { name: "Freie Universität Berlin", city: "Berlin", ranking: "Top Research" },
    ],
    costOfLiving: {
      rent: "€600–1,600/month",
      food: "€250–400/month",
      transport: "€86/month (Deutschlandticket)",
      utilities: "€100–200/month",
      total: "€1,100–2,300/month",
    },
    salaryRanges: [
      { sector: "Engineering", range: "€50,000–90,000/yr" },
      { sector: "IT & Software", range: "€55,000–100,000/yr" },
      { sector: "Finance", range: "€45,000–85,000/yr" },
      { sector: "Healthcare", range: "€40,000–80,000/yr" },
    ],
    processingTime: "4–10 weeks",
    successRate: "95%",
    requirements: [
      "Valid passport",
      "University degree or vocational qualification",
      "German language certificate (B1 minimum for most paths)",
      "Job offer or enrollment letter",
      "Bank statement (€720/month minimum)",
      "Health insurance",
      "CV and diplomas",
    ],
    faq: [
      { q: "Are German universities really free?", a: "Yes! Most public German universities charge only a semester fee of €100–350, covering administrative costs. Tuition is free for all nationalities." },
      { q: "Do I need to speak German to immigrate?", a: "For most visa categories, a basic German language level (B1) is required. However, English-taught master's programs don't require German." },
    ],
  },
  // Placeholder data for remaining countries
  belgium: {
    slug: "belgium", flag: "🇧🇪", name: "Belgium", capital: "Brussels",
    region: "Western Europe", language: "French, Dutch & German", currency: "Euro (€)", population: "11.5 million",
    tagline: "Heart of the European Union",
    description: "Belgium is home to the European Union's main institutions and offers a thriving economy, multilingual environment, and high quality of life.",
    heroImage: "https://images.unsplash.com/photo-1470165310006-f56e5d2e671f?w=1920&q=90",
    accentColor: "#EAB308", bgGradient: "from-gray-900 to-yellow-800",
    visaTypes: [{ name: "Work Permit", duration: "1 year", renewable: true, description: "For skilled workers with a Belgian employer" }],
    topUniversities: [{ name: "KU Leuven", city: "Leuven", ranking: "#42 World" }],
    costOfLiving: { rent: "€700–1,500/month", food: "€300–500/month", transport: "€50/month", utilities: "€100/month", total: "€1,200–2,200/month" },
    salaryRanges: [{ sector: "EU Institutions", range: "€45,000–110,000/yr" }],
    processingTime: "6–10 weeks", successRate: "93%",
    requirements: ["Valid passport", "Work contract", "Health insurance", "Criminal record"],
    faq: [{ q: "Is Belgium a good place to live?", a: "Yes! Belgium offers excellent healthcare, education, and a central European location ideal for travel." }],
  },
  ireland: {
    slug: "ireland", flag: "🇮🇪", name: "Ireland", capital: "Dublin",
    region: "Western Europe", language: "English & Irish", currency: "Euro (€)", population: "5 million",
    tagline: "Tech Capital of Europe",
    description: "Ireland hosts the European headquarters of Google, Meta, Apple, and LinkedIn. With English as the official language and a booming tech sector, it's the perfect springboard for international careers.",
    heroImage: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=1920&q=90",
    accentColor: "#16A34A", bgGradient: "from-green-900 to-green-700",
    visaTypes: [{ name: "Critical Skills Employment Permit", duration: "2 years", renewable: true, description: "For highly skilled workers in shortage occupations" }],
    topUniversities: [{ name: "Trinity College Dublin", city: "Dublin", ranking: "#98 World" }],
    costOfLiving: { rent: "€1,200–2,500/month", food: "€350–600/month", transport: "€120/month", utilities: "€120/month", total: "€1,900–3,400/month" },
    salaryRanges: [{ sector: "Technology", range: "€55,000–120,000/yr" }],
    processingTime: "4–8 weeks", successRate: "96%",
    requirements: ["Valid passport", "Job offer letter", "Qualifications proof", "Health insurance"],
    faq: [{ q: "Is Ireland part of Schengen?", a: "No, Ireland is NOT part of the Schengen zone. It has its own visa system." }],
  },
  finland: {
    slug: "finland", flag: "🇫🇮", name: "Finland", capital: "Helsinki",
    region: "Northern Europe", language: "Finnish & Swedish", currency: "Euro (€)", population: "5.5 million",
    tagline: "World's Happiest Country",
    description: "Finland ranks #1 in the World Happiness Report every year. With tuition-free universities, exceptional public services, and a pristine natural environment, Finland offers a unique quality of life.",
    heroImage: "https://images.unsplash.com/photo-1509041322357-8a3f9757a475?w=1920&q=90",
    accentColor: "#2563EB", bgGradient: "from-blue-800 to-blue-600",
    visaTypes: [{ name: "Residence Permit (Employed)", duration: "1 year", renewable: true, description: "For workers with a Finnish employer" }],
    topUniversities: [{ name: "University of Helsinki", city: "Helsinki", ranking: "#107 World" }],
    costOfLiving: { rent: "€700–1,400/month", food: "€300–500/month", transport: "€55/month", utilities: "€80/month", total: "€1,200–2,100/month" },
    salaryRanges: [{ sector: "Technology", range: "€40,000–80,000/yr" }],
    processingTime: "4–8 weeks", successRate: "95%",
    requirements: ["Valid passport", "Employment contract", "Finnish tax number", "Health insurance"],
    faq: [{ q: "Do I need to speak Finnish?", a: "Many companies operate in English, but learning Finnish significantly helps with integration." }],
  },
  uk: {
    slug: "uk", flag: "🇬🇧", name: "United Kingdom", capital: "London",
    region: "Western Europe", language: "English", currency: "British Pound (£)", population: "67 million",
    tagline: "Oxford, Cambridge & Prestige",
    description: "The UK is home to some of the world's most prestigious universities and financial institutions. Post-Brexit changes have created new opportunities for international graduates and skilled workers.",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=90",
    accentColor: "#DC2626", bgGradient: "from-blue-900 to-red-900",
    visaTypes: [{ name: "Skilled Worker Visa", duration: "Up to 5 years", renewable: true, description: "For workers with a UK employer sponsor" }],
    topUniversities: [{ name: "University of Oxford", city: "Oxford", ranking: "#1 World" }, { name: "University of Cambridge", city: "Cambridge", ranking: "#2 World" }],
    costOfLiving: { rent: "£900–2,500/month", food: "£250–450/month", transport: "£150/month", utilities: "£100–200/month", total: "£1,500–3,300/month" },
    salaryRanges: [{ sector: "Finance & Banking", range: "£50,000–200,000/yr" }],
    processingTime: "3–8 weeks", successRate: "93%",
    requirements: ["Valid passport", "Certificate of Sponsorship", "English language proof", "Financial evidence"],
    faq: [{ q: "Can I bring my family to the UK?", a: "Yes, family members of skilled workers can join you as dependants with their own visa." }],
  },
  usa: {
    slug: "usa", flag: "🇺🇸", name: "United States", capital: "Washington D.C.",
    region: "North America", language: "English", currency: "US Dollar ($)", population: "335 million",
    tagline: "Land of Endless Opportunity",
    description: "The United States offers unparalleled opportunities in technology, business, research, and entertainment. With the world's top universities and a massive economy, the US remains the most sought-after destination for ambitious immigrants.",
    heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1920&q=90",
    accentColor: "#2563EB", bgGradient: "from-blue-900 to-red-800",
    visaTypes: [{ name: "F-1 Student Visa", duration: "Duration of studies", renewable: true, description: "For students at accredited US institutions" }, { name: "H-1B Work Visa", duration: "3 years", renewable: true, description: "For specialty workers in theoretical or technical fields" }],
    topUniversities: [{ name: "MIT", city: "Cambridge, MA", ranking: "#1 World" }, { name: "Harvard University", city: "Cambridge, MA", ranking: "#4 World" }],
    costOfLiving: { rent: "$1,200–3,500/month", food: "$400–700/month", transport: "$100–200/month", utilities: "$100–200/month", total: "$1,900–4,700/month" },
    salaryRanges: [{ sector: "Technology (Silicon Valley)", range: "$120,000–250,000/yr" }],
    processingTime: "8–16 weeks", successRate: "91%",
    requirements: ["Valid passport", "DS-160 form", "Visa interview", "Financial proof", "SEVIS fee (students)"],
    faq: [{ q: "What is OPT?", a: "Optional Practical Training (OPT) allows F-1 students to work in the US for up to 12 months (36 for STEM graduates) after graduation." }],
  },
  australia: {
    slug: "australia", flag: "🇦🇺", name: "Australia", capital: "Canberra",
    region: "Oceania", language: "English", currency: "Australian Dollar (AUD)", population: "26 million",
    tagline: "Sun, Quality & Skills Migration",
    description: "Australia combines an exceptional quality of life with one of the world's most transparent skills-based immigration systems. From beaches to Outback, it offers a unique lifestyle alongside strong career prospects.",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&q=90",
    accentColor: "#EAB308", bgGradient: "from-blue-900 to-yellow-700",
    visaTypes: [{ name: "Skilled Independent Visa (189)", duration: "PR", renewable: false, description: "Points-based permanent residency for skilled workers" }, { name: "Student Visa (500)", duration: "Study duration", renewable: true, description: "For students at Australian education providers" }],
    topUniversities: [{ name: "University of Melbourne", city: "Melbourne", ranking: "#33 World" }, { name: "Australian National University", city: "Canberra", ranking: "#34 World" }],
    costOfLiving: { rent: "AUD 1,500–3,000/month", food: "AUD 400–700/month", transport: "AUD 150/month", utilities: "AUD 150/month", total: "AUD 2,300–4,100/month" },
    salaryRanges: [{ sector: "Mining & Resources", range: "AUD 90,000–180,000/yr" }, { sector: "Technology", range: "AUD 80,000–150,000/yr" }],
    processingTime: "4–12 weeks", successRate: "96%",
    requirements: ["Valid passport", "Skills assessment", "English proficiency (IELTS/PTE)", "Points test", "Health examination"],
    faq: [{ q: "What is SkillSelect?", a: "SkillSelect is Australia's online system where skilled workers submit an Expression of Interest (EOI). High-scoring candidates receive invitations to apply." }],
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
