import { NextRequest, NextResponse } from "next/server";

// GET /api/ai/faq-search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Query parameter required" }, { status: 400 });
    }

    // Simple FAQ database (in production, this would be from Sanity CMS or a vector database)
    const faqDatabase = [
      {
        id: 1,
        question: "How long does the immigration process take?",
        answer: "The processing time depends on the destination country, visa type, and completeness of your documents. Our team helps you prepare everything correctly to avoid unnecessary delays.",
        category: "Process",
      },
      {
        id: 2,
        question: "Do you guarantee visa approval?",
        answer: "No agency can guarantee visa approval. However, we maximize your chances by carefully reviewing your profile, documents, and application strategy.",
        category: "Guarantees",
      },
      {
        id: 3,
        question: "Which countries do you support?",
        answer: "We provide immigration guidance for France, Canada, and Luxembourg with expert support for students, professionals, and families.",
        category: "Destinations",
      },
      {
        id: 4,
        question: "Can I apply if I do not have all my documents yet?",
        answer: "Yes. Our consultants will help you understand the required documents and create a preparation plan based on your situation.",
        category: "Documents",
      },
      {
        id: 5,
        question: "Do you offer online consultations?",
        answer: "Yes. Clients can book online consultations and receive professional guidance from anywhere.",
        category: "Consultations",
      },
      {
        id: 6,
        question: "What are the requirements for student visa?",
        answer: "Student visa requirements typically include proof of admission to an accredited institution, proof of financial support, valid passport, and sometimes language proficiency test results.",
        category: "Student Visa",
      },
      {
        id: 7,
        question: "How much do your services cost?",
        answer: "Our services are offered in different packages: Basic ($199), Professional ($499), and Premium ($899). Each package includes different levels of support and features.",
        category: "Pricing",
      },
      {
        id: 8,
        question: "What documents do I need for a work permit?",
        answer: "Work permit requirements typically include a valid job offer, proof of qualifications, work experience documentation, and sometimes labor market impact assessment approval.",
        category: "Work Permit",
      },
    ];

    // Simple keyword matching (in production, use semantic search with embeddings)
    const lowerQuery = query.toLowerCase();
    const results = faqDatabase.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.answer.toLowerCase().includes(lowerQuery) ||
        faq.category.toLowerCase().includes(lowerQuery)
    );

    return NextResponse.json({
      query,
      results: results.slice(0, 5), // Return top 5 results
      count: results.length,
    });
  } catch (error) {
    console.error("FAQ search error:", error);
    return NextResponse.json(
      { error: "Failed to search FAQs" },
      { status: 500 }
    );
  }
}
