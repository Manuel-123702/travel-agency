import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GraduationCap, Briefcase, Camera, TrendingUp } from "lucide-react";

// Default country data for France, Canada, Luxembourg
const defaultCountries = [
  {
    country: "France",
    slug: "france",
    flag: "🇫🇷",
    name: "France",
    code: "FR",
    capital: "Paris",
    tagline: "Art de Vivre & Academic Excellence",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    color: "from-blue-900/90 to-blue-700/70",
    opportunities: [
      { icon: GraduationCap, label: "Leading Universities", value: "80+ institutions" },
      { icon: Briefcase, label: "Work Opportunities", value: "High demand sectors" },
      { icon: Camera, label: "Tourism", value: "90M visitors/year" }
    ],
    highlights: ["Sorbonne & Paris Schools", "Schengen Access", "Quality of Life"],
    featured: true,
    href: "/france"
  },
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    name: "Canada",
    code: "CA",
    capital: "Ottawa",
    tagline: "Land of Opportunities & Multiculturalism",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
    color: "from-red-900/90 to-red-700/70",
    opportunities: [
      { icon: GraduationCap, label: "World-Class Education", value: "Top-ranked universities" },
      { icon: Briefcase, label: "Career Growth", value: "Strong job market" },
      { icon: TrendingUp, label: "Immigration Pathways", value: "Express Entry & PR" }
    ],
    highlights: ["Permanent Residency Options", "Welcoming Society", "High Standard of Living"],
    featured: false,
    href: "/canada"
  },
  {
    country: "Luxembourg",
    slug: "luxembourg",
    flag: "🇱🇺",
    name: "Luxembourg",
    code: "LU",
    capital: "Luxembourg City",
    tagline: "Financial Hub & European Excellence",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    color: "from-navy-900/90 to-navy-700/70",
    opportunities: [
      { icon: Briefcase, label: "Financial Center", value: "Banking & finance hub" },
      { icon: GraduationCap, label: "Quality Education", value: "Multilingual programs" },
      { icon: TrendingUp, label: "High Salaries", value: "Top EU wages" }
    ],
    highlights: ["EU Blue Card Access", "Multilingual Environment", "Strategic Location"],
    featured: false,
    href: "/luxembourg"
  }
];

export async function GET() {
  try {
    // Try to fetch countries from database
    const dbCountries = await db.country.findMany();
    
    if (dbCountries.length > 0) {
      // Map database countries to the expected format
      const countries = dbCountries.map((country: any) => {
        const defaultData = defaultCountries.find((c: any) => c.code === country.code) || defaultCountries[0];
        return {
          ...defaultData,
          name: country.name,
          code: country.code
        };
      });
      return NextResponse.json(countries);
    }
    
    // Return default countries if database is empty
    return NextResponse.json(defaultCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Return default countries on error
    return NextResponse.json(defaultCountries);
  }
}
