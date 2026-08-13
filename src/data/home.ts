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

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
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

    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
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

    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
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
    role: "International Student",
    country: "France 🇫🇷",
    visaType: "Student Visa (VLS-TS)",
    message:
      "Got my French student visa approved in just 3 weeks! The advisors checked every page of my Campus France dossier and prepared me thoroughly for the embassy interview.",
    rating: 5,
    avatar: "A",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    verified: true,
  },
  {
    name: "David M.",
    role: "Senior Software Engineer",
    country: "Canada 🇨🇦",
    visaType: "Express Entry Work Permit",
    message:
      "Outstanding immigration support from start to finish. They optimized my CRS score and handled all credential assessments smoothly. I am now happily working in Toronto!",
    rating: 5,
    avatar: "D",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    verified: true,
  },
  {
    name: "Sarah L.",
    role: "Financial Analyst",
    country: "Luxembourg 🇱🇺",
    visaType: "EU Blue Card",
    message:
      "Moving to Luxembourg felt daunting until I hired Travel Agency. Their team managed my employment contract validation and EU Blue Card application flawlessly.",
    rating: 5,
    avatar: "S",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    verified: true,
  },
  {
    name: "Marc-Antoine T.",
    role: "Master's Scholar",
    country: "France 🇫🇷",
    visaType: "Eiffel Excellence Scholarship",
    message:
      "Not only did they assist with my Sorbonne University admission, but they also helped me secure a full scholarship! I cannot thank the team enough.",
    rating: 5,
    avatar: "M",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    verified: true,
  },
  {
    name: "Dr. Elena R.",
    role: "Medical Specialist",
    country: "Canada 🇨🇦",
    visaType: "Provincial Nominee Program",
    message:
      "A truly professional and dedicated agency. They navigated complex medical credential recognition and PNP nomination without a single delay.",
    rating: 5,
    avatar: "E",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    verified: true,
  },
  {
    name: "Patrick & Vanessa K.",
    role: "Entrepreneurs",
    country: "Luxembourg 🇱🇺",
    visaType: "Business & Family Reunification",
    message:
      "Reuniting our family while establishing our business abroad was seamless thanks to Travel Agency's step-by-step guidance and legal compliance review.",
    rating: 5,
    avatar: "P",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&q=80",
    verified: true,
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
      "The processing time depends on the destination country, visa type, and completeness of your documents. Our team helps you prepare everything correctly to avoid unnecessary delays. France typically takes 15-30 days for student visas, Canada 30-90 days for work permits, and Luxembourg 30-45 days for most applications.",
  },
  {
    question: "Do you guarantee visa approval?",
    answer:
      "No agency can guarantee visa approval. However, we maximize your chances by carefully reviewing your profile, documents, and application strategy. Our 97% success rate speaks to our expertise and dedication to preparing strong applications.",
  },
  {
    question: "Which countries do you support?",
    answer:
      "We provide immigration guidance for France, Canada, and Luxembourg with expert support for students, professionals, and families. Each destination has unique requirements and pathways, and our specialists are certified in all three regions.",
  },
  {
    question: "Can I apply if I do not have all my documents yet?",
    answer:
      "Yes. Our consultants will help you understand the required documents and create a preparation plan based on your situation. We provide a comprehensive checklist and guide you through obtaining each document efficiently.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes. Clients can book online consultations and receive professional guidance from anywhere. We offer video consultations via Google Meet, WhatsApp calls, and phone consultations to accommodate your preferences.",
  },
  {
    question: "What are the payment options for your services?",
    answer:
      "We accept multiple payment methods including Stripe, PayPal, Orange Money, and MTN MoMo for your convenience. Payment plans are available for our Professional and Premium packages to make our services accessible.",
  },
  {
    question: "How do I track my application progress?",
    answer:
      "Once you become a client, you'll have access to our Client Portal where you can track your application status in real-time, view document requirements, communicate with your advisor, and receive notifications about important updates.",
  },
  {
    question: "What happens if my visa application is refused?",
    answer:
      "In the unfortunate event of a refusal, we provide a detailed analysis of the refusal reasons and guidance on appeal or reapplication strategies. Our Premium package includes refusal analysis and reapplication support.",
  },
  {
    question: "Do you help with post-arrival services?",
    answer:
      "Yes. Our Premium package includes post-arrival guidance such as accommodation assistance, banking setup, local registration, and integration support to help you settle smoothly in your new country.",
  },
  {
    question: "Can you help with language test preparation?",
    answer:
      "We provide guidance on required language tests (IELTS, TEF, DELF/DALF) and can recommend preparation resources. While we don't conduct language training ourselves, we partner with certified language schools to support your preparation.",
  },
  {
    question: "What documents are typically required for immigration?",
    answer:
      "Common requirements include a valid passport, educational certificates, language test results, proof of funds, employment letters, police clearance certificates, medical examination results, and specific documents based on your visa category.",
  },
  {
    question: "How much money do I need to show for proof of funds?",
    answer:
      "Proof of funds requirements vary by country and visa type. For Canada, you typically need to show funds for tuition plus CAD 10,000-25,000 depending on family size. France requires proof of monthly income of at least €615. Luxembourg has similar requirements. We provide exact calculations during your consultation.",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "Yes, most countries allow students to work part-time during their studies. In France, students can work up to 964 hours per year. Canada allows 20 hours per week off-campus and full-time during breaks. Luxembourg allows limited work hours for students with specific permits.",
  },
  {
    question: "Do you support family sponsorship applications?",
    answer:
      "Yes. We assist with family sponsorship including spouse sponsorship, parent sponsorship, and dependent children applications. Each country has specific requirements and processing times for family reunification.",
  },
  {
    question: "What makes Travel Agency different from other immigration consultants?",
    answer:
      "Our 97% success rate, 10+ years of experience, personalized approach, certified consultants, and comprehensive support from consultation to post-arrival set us apart. We treat each case with individual attention and provide transparent, ethical guidance throughout your journey.",
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
    name: "Student Visa",
    price: "650",
    description: "Complete support for international students",
    features: [
      "University & college research",
      "Admissions application assistance",
      "Student dossier preparation",
      "Student visa application",
      "CAQ application for Quebec",
      "Study Permit application",
      "Scholarship research",
      "Pre-departure orientation",
    ],
    popular: false,
    timeline: "8–12 weeks",
  },
  {
    name: "Work Permit",
    price: "950",
    description: "Build your international career",
    features: [
      "Professional profile assessment",
      "Express Entry optimization",
      "Provincial Nominee Program guidance",
      "Talent Passport applications",
      "EU Blue Card applications",
      "Work permit applications",
      "Job market guidance",
      "Credential recognition",
    ],
    popular: true,
    timeline: "10–16 weeks",
  },
  {
    name: "Visitor Visa",
    price: "350",
    description: "Travel with confidence",
    features: [
      "Schengen visa applications",
      "Canadian Temporary Resident Visa",
      "Tourist visa applications",
      "Family reunion visitor visas",
      "Business visitor applications",
      "Invitation letter preparation",
      "Financial documentation",
      "Refusal case recovery",
    ],
    popular: false,
    timeline: "4–8 weeks",
  },
  {
    name: "Business Visa",
    price: "1500",
    description: "Entrepreneur & investor immigration",
    features: [
      "Business plan development",
      "Company registration",
      "Investor visa applications",
      "Entrepreneur visa applications",
      "Immigration pathway planning",
      "Financial documentation",
      "Market research",
      "Legal compliance guidance",
    ],
    popular: false,
    timeline: "12–20 weeks",
  },
  {
    name: "Family Reunification",
    price: "1200",
    description: "Bring your family together",
    features: [
      "Sponsorship eligibility assessment",
      "Spouse & partner applications",
      "Parent & grandparent sponsorship",
      "Dependent child visa applications",
      "EU family reunification",
      "Super visa applications",
      "Financial requirements assessment",
      "Relationship documentation",
    ],
    popular: false,
    timeline: "12–24 weeks",
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
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
  },
  {
    step: "02",
    title: "Profile Evaluation",
    description:
      "We analyze your background, documents, and eligibility to create the right strategy.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  },
  {
    step: "03",
    title: "Application Preparation",
    description:
      "Our team helps you prepare documents and submit a complete application.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    step: "04",
    title: "Visa Approval",
    description:
      "We guide you until your visa is approved and prepare you for your journey abroad.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80",
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
    "Answer 10 quick evaluation questions to receive an instant profile assessment and custom immigration pathway recommendation.",

  questions: [
    {
      id: 1,
      question: "What is your primary immigration goal?",
      options: [
        "🎓 Study at a top university abroad",
        "💼 Work & build a global career",
        "✈️ Tourism or short visitor stay",
        "🏢 Business investment & company startup",
        "👨‍👩‍👧‍👦 Family sponsorship & reunification",
      ],
    },
    {
      id: 2,
      question: "What is your preferred destination country?",
      options: [
        "🇫🇷 France (Europe & Schengen area)",
        "🇨🇦 Canada (Express Entry & Study Permits)",
        "🇱🇺 Luxembourg (EU Blue Card & Banking)",
        "🌐 Open to the best destination for my profile",
      ],
    },
    {
      id: 3,
      question: "What is your highest completed level of education?",
      options: [
        "High School Diploma / Baccalauréat",
        "HND / Associate Degree / Vocational Diploma",
        "Bachelor's Degree (Licence / Undergraduate)",
        "Master's Degree (Postgraduate)",
        "Doctorate / PhD / Specialized Medical Degree",
      ],
    },
    {
      id: 4,
      question: "How many years of skilled work experience do you have?",
      options: [
        "Student / Less than 1 year",
        "1 – 3 years of work experience",
        "3 – 5 years of skilled experience",
        "5+ years of managerial or technical experience",
      ],
    },
    {
      id: 5,
      question: "What is your primary language proficiency level?",
      options: [
        "Fluent French (TEF / TCF / DELF / DALF)",
        "Fluent English (IELTS / TOEFL)",
        "Bilingual in French & English",
        "Basic level / Currently preparing language test",
      ],
    },
    {
      id: 6,
      question: "What is your estimated budget for tuition or proof of funds?",
      options: [
        "Under $5,000 USD",
        "$5,000 – $15,000 USD",
        "$15,000 – $30,000 USD",
        "$30,000+ USD",
      ],
    },
    {
      id: 7,
      question: "What is your target start timeline?",
      options: [
        "Immediate / Next upcoming intake (within 3 months)",
        "Within 3 to 6 months",
        "6 to 12 months",
        "Long-term planning for next academic year",
      ],
    },
    {
      id: 8,
      question: "What is your current family & marital status?",
      options: [
        "Single / Independent applicant",
        "Married (Relocating solo first)",
        "Married (Relocating with spouse)",
        "Family relocating with dependent children",
      ],
    },
    {
      id: 9,
      question: "What is your travel & visa history?",
      options: [
        "First-time international visa applicant",
        "Active passport with previous Schengen/UK/US visas",
        "Previous visa refusal (seeking appeal & recovery)",
        "Currently holding temporary residency permit",
      ],
    },
    {
      id: 10,
      question: "What level of support do you expect from our agency?",
      options: [
        "Full end-to-end dossier preparation & visa submission",
        "University placement & scholarship assistance",
        "Express Entry / CRS score optimization",
        "Eligibility evaluation & document review consultation",
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
      placeholder: "Select destination",
      type: "select",
      options: ["Canada", "France", "Luxembourg"],
    },
  ],

  projectTypes: [
    "Study Abroad",
    "Work Immigration",
    "Visitor Visa",
    "Family Relocation",
  ],
};