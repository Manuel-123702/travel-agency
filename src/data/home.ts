import {
  GraduationCap,
  Briefcase,
  Plane,
  FileCheck,
  TrendingUp,
  Clock,
  Headphones,
  Camera,
} from "lucide-react";

// Fetch dynamic data from API
async function fetchWebsiteStats() {
  try {
    const response = await fetch('/api/website/stats', {
      cache: 'no-store' // Always get fresh data
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch website stats:', error);
  }
  return null;
}

async function fetchCountries() {
  try {
    const response = await fetch('/api/website/countries', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch countries:', error);
  }
  return null;
}

// =============================
// HERO DATA
// =============================

export const heroFlags = [
  {
    emoji: "🇫🇷",
    label: "France",
    top: "15%",
    left: "8%",
    delay: 0,
  },
  {
    emoji: "🇨🇦",
    label: "Canada",
    top: "20%",
    right: "7%",
    delay: 0.4,
  },
  {
    emoji: "🇱🇺",
    label: "Luxembourg",
    top: "48%",
    left: "3%",
    delay: 0.6,
  },
];


export const heroFeatures = [
  "97% Success Rate",
  "10+ Years Experience",
  "24/7 Support",
];


export const heroStats = [
  {
    number: "2,500+",
    label: "Cases Processed",
  },
  {
    number: "10+",
    label: "Years Experience",
  },
  {
    number: "3",
    label: "Destinations",
  },
  {
    number: "24/7",
    label: "Client Support",
  },
];


export const heroDestinations = [
  {
    flag: "🇫🇷",
    code: "FR",
  },
  {
    flag: "🇨🇦",
    code: "CA",
  },
  {
    flag: "🇱🇺",
    code: "LU",
  },
];


export const heroContent = {
  backgroundImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90",

  badge:
    "#1 International Immigration Agency",

  titleFirst:
    "Your Trusted Partner",

  titleHighlight:
    "Succeed",

  titleLast:
    "Abroad",

  description:
    "We guide students, professionals, and families through their immigration journey with expert precision and personal care.",

  countries: [
    "France",
    "Canada",
    "Luxembourg",
  ],

  successRate:
    "97%",

  successLabel:
    "Global Success Rate",

  testimonial: {
    avatar:
      "A",

    text:
      "Got my French visa in just 3 weeks!",

    author:
      "Amara K. · Student · France",
  },

  trustedSince:
    "Since 2014",
    
};


// =============================
// STATS SECTION DATA
// =============================

export const homeStats = [
  {
    icon: FileCheck,
    number: 2500,
    suffix: "+",
    label: "Cases Processed",
    sub: "Successfully completed",
    color: "from-blue-500 to-blue-700",
  },

  {
    icon: TrendingUp,
    number: 97,
    suffix: "%",
    label: "Success Rate",
    sub: "Visa approvals",
    color: "from-gold to-yellow-600",
  },

  {
    icon: Clock,
    number: 10,
    suffix: "+",
    label: "Years Experience",
    sub: "In immigration consulting",
    color: "from-green-500 to-emerald-700",
  },

  {
    icon: Headphones,
    number: 24,
    suffix: "/7",
    label: "Client Support",
    sub: "Always available for you",
    color: "from-purple-500 to-purple-700",
  },
];


// =============================
// SERVICES DATA
// =============================

export const servicesData = [
  {
    icon: GraduationCap,
    tag: "Student",
    title: "Student Immigration",

    desc:
      "Comprehensive support for students seeking admission to top universities abroad.",

    features: [
      "Institution research & selection",
      "University admissions assistance",
      "Complete student dossier preparation",
      "Student visa applications",
      "Pre-departure orientation",
      "Scholarship guidance",
    ],

    color:
      "from-blue-600 to-blue-800",

    href:
      "/services#student",
  },

  {
    icon: Briefcase,
    tag: "Professional",
    title: "Professional Immigration",

    desc:
      "Expert guidance for skilled workers and professionals seeking opportunities abroad.",

    features: [
      "Professional orientation",
      "Work permit applications",
      "Administrative file management",
      "Employer matching assistance",
      "Credential recognition support",
      "Complete accompaniment",
    ],

    color:
      "from-navy to-blue-900",

    href:
      "/services#work",

    featured:
      true,
  },

  {
    icon: Plane,
    tag: "Visitor",
    title: "Visitor Visa",

    desc:
      "Visa assistance for tourism, family visits, and business travel.",

    features: [
      "Tourist visa applications",
      "Family reunion visas",
      "Business travel permits",
      "Invitation letter assistance",
      "Document preparation",
      "Express processing options",
    ],

    color:
      "from-gold to-yellow-600",

    href:
      "/services#visitor",
  },
];


// =============================
// DESTINATIONS DATA
// =============================

export const destinationsData = [
  {
    flag: "🇫🇷",
    country: "France",
    href: "/france",

    tagline:
      "Art de Vivre & Academic Excellence",

    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",

    color:
      "from-blue-900/90 to-blue-700/70",

    opportunities: [
      {
        icon: GraduationCap,
        label: "Leading Universities",
        value: "80+ institutions",
      },
      {
        icon: Briefcase,
        label: "Work Opportunities",
        value: "High demand sectors",
      },
      {
        icon: Camera,
        label: "Tourism",
        value: "90M visitors/year",
      },
    ],

    highlights: [
      "Sorbonne & Paris Schools",
      "Schengen Access",
      "Quality of Life",
    ],
    featured: true,
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    href: "/canada",

    tagline:
      "Land of Opportunities & Multiculturalism",

    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",

    color:
      "from-red-900/90 to-red-700/70",

    opportunities: [
      {
        icon: GraduationCap,
        label: "World-Class Education",
        value: "Top-ranked universities",
      },
      {
        icon: Briefcase,
        label: "Career Growth",
        value: "Strong job market",
      },
      {
        icon: TrendingUp,
        label: "Immigration Pathways",
        value: "Express Entry & PR",
      },
    ],

    highlights: [
      "Permanent Residency Options",
      "Welcoming Society",
      "High Standard of Living",
    ],
    featured: false,
  },
  {
    flag: "🇱🇺",
    country: "Luxembourg",
    href: "/luxembourg",

    tagline:
      "Financial Hub & European Excellence",

    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",

    color:
      "from-navy-900/90 to-navy-700/70",

    opportunities: [
      {
        icon: Briefcase,
        label: "Financial Center",
        value: "Banking & finance hub",
      },
      {
        icon: GraduationCap,
        label: "Quality Education",
        value: "Multilingual programs",
      },
      {
        icon: TrendingUp,
        label: "High Salaries",
        value: "Top EU wages",
      },
    ],

    highlights: [
      "EU Blue Card Access",
      "Multilingual Environment",
      "Strategic Location",
    ],
    featured: false,
  },
];
export const testimonialsData = [
  {
    name: "Amara K.",
    role: "Student",
    country: "France",
    message:
      "Got my French visa in just 3 weeks! The team guided me through every step.",
    rating: 5,
    avatar: "A",
  },
  {
    name: "David M.",
    role: "Professional",
    country: "Canada",
    message:
      "Excellent immigration support. They helped me prepare my documents perfectly.",
    rating: 5,
    avatar: "D",
  },
  {
    name: "Sarah L.",
    role: "Family Applicant",
    country: "Luxembourg",
    message:
      "A professional team that truly cares about clients success.",
    rating: 5,
    avatar: "S",
  },
];
export const successStoriesData = [
  {
    name: "Amara K.",
    country: "France",
    category: "Student Visa",
    result: "Visa approved in 3 weeks",
    description:
      "With complete guidance from application preparation to interview, Amara successfully started her studies in France.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
  },
  {
    name: "David M.",
    country: "Canada",
    category: "Professional Immigration",
    result: "Work permit approved",
    description:
      "Our team helped David prepare his professional profile and immigration documents successfully.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Sarah L.",
    country: "Luxembourg",
    category: "Family Visa",
    result: "Family reunited",
    description:
      "A complete immigration solution that helped Sarah join her family abroad.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
];

export const faqData = [
  {
    question: "How long does the immigration process take?",
    answer:
      "The processing time depends on the destination country, visa type, and completeness of your documents. Our team helps you prepare everything correctly to avoid unnecessary delays.",
  },
  {
    question: "Do you guarantee visa approval?",
    answer:
      "No agency can guarantee visa approval. However, we maximize your chances by carefully reviewing your profile, documents, and application strategy.",
  },
  {
    question: "Which countries do you support?",
    answer:
      "We provide immigration guidance for France, Canada, and Luxembourg with expert support for students, professionals, and families.",
  },
  {
    question: "Can I apply if I do not have all my documents yet?",
    answer:
      "Yes. Our consultants will help you understand the required documents and create a preparation plan based on your situation.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes. Clients can book online consultations and receive professional guidance from anywhere.",
  },
];

export const blogPreviewData = [
  {
    title: "Complete Guide to Studying in France",
    excerpt:
      "Everything international students need to know about admission, documents, and student visas.",
    category: "Study Abroad",
    date: "July 10, 2026",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    href: "/blog/studying-in-france",
  },
  {
    title: "Canada Immigration: Step by Step Process",
    excerpt:
      "Discover the main pathways, requirements, and preparation tips for moving to Canada.",
    category: "Immigration",
    date: "July 5, 2026",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    href: "/blog/canada-immigration",
  },
  {
    title: "How to Prepare a Successful Visa Application",
    excerpt:
      "Professional tips to organize your documents and improve your application quality.",
    category: "Visa Tips",
    date: "June 28, 2026",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    href: "/blog/visa-preparation",
  },
];

export const pricingData = [
  {
    name: "Basic",
    price: "199",
    description:
      "Perfect for initial consultation and guidance.",
    features: [
      "Profile evaluation",
      "Immigration consultation",
      "Document checklist",
      "Email support",
    ],
    popular: false,
  },

  {
    name: "Professional",
    price: "499",
    description:
      "Complete support throughout your immigration process.",
    features: [
      "Everything in Basic",
      "Application preparation",
      "Document review",
      "Dedicated consultant",
      "Priority support",
    ],
    popular: true,
  },

  {
    name: "Premium",
    price: "899",
    description:
      "Full immigration assistance from start to finish.",
    features: [
      "Complete application management",
      "Interview preparation",
      "Unlimited consultation",
      "Post-arrival guidance",
    ],
    popular: false,
  },
];

export const trustBadgesData = [
  {
    title: "Licensed Immigration Experts",
    description: "Certified professionals guiding your journey.",
    icon: "🏆",
  },
  {
    title: "10+ Years Experience",
    description: "Helping students, workers and families.",
    icon: "⭐",
  },
  {
    title: "97% Success Rate",
    description: "Thousands of successful applications.",
    icon: "✅",
  },
  {
    title: "Secure & Transparent",
    description: "Your documents handled with confidence.",
    icon: "🔒",
  },
];

export const newsletterData = {
  title: "Stay Updated With Immigration Opportunities",
  description:
    "Get the latest visa updates, scholarship opportunities, and immigration guides directly in your inbox.",
  buttonText: "Subscribe",
  placeholder: "Enter your email address",
};

export const aboutData = {
  badge: "About Our Agency",

  title:
    "Helping People Build A Better Future Abroad",

  description:
    "We are an international immigration consultancy helping students, professionals, and families achieve their dreams of studying, working, and living abroad.",

  mission:
    "Our mission is to simplify immigration through expert guidance, transparent processes, and personalized support.",

  vision:
    "Our vision is to become a trusted global partner for successful immigration journeys.",

  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80",

  stats: [
    {
      number: "2500+",
      label: "Successful Cases",
    },
    {
      number: "10+",
      label: "Years Experience",
    },
    {
      number: "3",
      label: "Countries",
    },
  ],
};

export const processData = [
  {
    step: "01",
    title: "Free Consultation",
    description:
      "Discuss your goals with our experts and understand the best immigration pathway for you.",
  },
  {
    step: "02",
    title: "Profile Evaluation",
    description:
      "We analyze your background, documents, and eligibility to create the right strategy.",
  },
  {
    step: "03",
    title: "Application Preparation",
    description:
      "Our team helps you prepare documents and submit a complete application.",
  },
  {
    step: "04",
    title: "Visa Approval",
    description:
      "We guide you until your visa is approved and prepare you for your journey abroad.",
  },
];

export const visaCalculatorData = [
  {
    country: "France",
    flag: "🇫🇷",
    processingTime: "15 - 30 days",
    requirements: [
      "Valid passport",
      "Proof of funds",
      "Admission letter",
      "Travel insurance",
    ],
  },

  {
    country: "Canada",
    flag: "🇨🇦",
    processingTime: "30 - 90 days",
    requirements: [
      "Valid passport",
      "Study/work permit documents",
      "Financial proof",
      "Medical examination",
    ],
  },

  {
    country: "Luxembourg",
    flag: "🇱🇺",
    processingTime: "30 - 45 days",
    requirements: [
      "Passport",
      "Employment or admission proof",
      "Financial documents",
      "Insurance",
    ],
  },
];

export const immigrationQuizData = {
  title: "Find Your Best Immigration Path",

  description:
    "Answer a few questions and discover the immigration option that fits your profile.",

  questions: [
    {
      id: 1,
      question: "What is your main goal?",
      options: [
        "Study abroad",
        "Work abroad",
        "Visit another country",
        "Family relocation",
      ],
    },

    {
      id: 2,
      question: "What is your preferred destination?",
      options: [
        "France",
        "Canada",
        "Luxembourg",
      ],
    },

    {
      id: 3,
      question: "What is your experience level?",
      options: [
        "Student",
        "Professional",
        "Entrepreneur",
        "Other",
      ],
    },
  ],
};

export const consultationPlannerData = {
  title: "Book Your Immigration Consultation",

  description:
    "Choose the type of consultation that matches your immigration needs.",

  options: [
    {
      title: "Student Consultation",
      duration: "30 minutes",
      description:
        "Guidance for university admission, scholarships, and student visas.",
    },

    {
      title: "Work Immigration Consultation",
      duration: "45 minutes",
      description:
        "Career opportunities, work permits, and professional immigration.",
    },

    {
      title: "General Visa Consultation",
      duration: "30 minutes",
      description:
        "Tourism, family visits, and general visa assistance.",
    },
  ],
};

export const evaluationFormData = {
  title: "Start Your Immigration Evaluation",

  description:
    "Complete this short evaluation form and our immigration experts will contact you.",

  fields: [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
    },

    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      type: "email",
    },

    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "text",
    },

    {
      name: "country",
      label: "Preferred Destination",
      placeholder: "Example: Canada",
      type: "text",
    },
  ],

  projectTypes: [
    "Study Abroad",
    "Work Immigration",
    "Visitor Visa",
    "Family Relocation",
  ],
};