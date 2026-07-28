import { NextRequest, NextResponse } from "next/server";

// POST /api/ai/document-checker
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentType, country } = body;

    if (!documentType || !country) {
      return NextResponse.json(
        { error: "Document type and country are required" },
        { status: 400 }
      );
    }

    // Document requirements database (in production, this would be from Sanity CMS)
    const documentRequirements: Record<string, Record<string, string[]>> = {
      student: {
        france: [
          "Valid passport (at least 6 months validity)",
          "Proof of admission to French institution",
          "Proof of financial resources (€615/month minimum)",
          "Proof of accommodation in France",
          "CV and motivation letter",
          "Academic transcripts and diplomas",
          "French language proficiency (if required)",
          "Health insurance coverage",
          "Campus France attestation",
        ],
        canada: [
          "Valid passport",
          "Letter of acceptance from designated learning institution",
          "Proof of financial support (tuition + living expenses)",
          "Study permit application form",
          "Passport-sized photos",
          "Medical examination certificate",
          "Police clearance certificate",
          "Statement of purpose",
          "English/French language test results (IELTS/TEF)",
        ],
        luxembourg: [
          "Valid passport",
          "Proof of admission to Luxembourg institution",
          "Proof of financial means",
          "Proof of accommodation",
          "Health insurance",
          "Clean criminal record",
          "Academic certificates",
          "Language proficiency certificate",
        ],
      },
      work: {
        france: [
          "Valid passport",
          "Work contract or job offer",
          "Proof of qualifications",
          "Work experience documentation",
          "CV",
          "Labor market impact assessment (if required)",
          "Proof of accommodation",
          "Health insurance",
        ],
        canada: [
          "Valid passport",
          "Job offer from Canadian employer",
          "LMIA approval (if required)",
          "Proof of work experience",
          "Educational credentials assessment",
          "Language test results",
          "Medical examination",
          "Police clearance",
        ],
        luxembourg: [
          "Valid passport",
          "Employment contract",
          "Professional qualifications",
          "Work experience proof",
          "Authorization to work",
          "Proof of accommodation",
          "Health insurance",
        ],
      },
      visitor: {
        france: [
          "Valid passport",
          "Proof of purpose of visit",
          "Proof of accommodation",
          "Proof of financial means",
          "Round-trip flight reservation",
          "Travel insurance",
          "Civil status documents",
        ],
        canada: [
          "Valid passport",
          "Purpose of travel documentation",
          "Proof of funds",
          "Ties to home country",
          "Travel itinerary",
          "Letter of invitation (if visiting family/friends)",
          "Medical exam (if required)",
        ],
        luxembourg: [
          "Valid passport",
          "Proof of purpose",
          "Proof of accommodation",
          "Proof of financial means",
          "Return ticket",
          "Travel insurance",
        ],
      },
    };

    const requirements = documentRequirements[documentType]?.[country] || [];

    if (requirements.length === 0) {
      return NextResponse.json(
        { error: "No requirements found for this document type and country" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      documentType,
      country,
      requirements,
      totalDocuments: requirements.length,
      message: `You need ${requirements.length} documents for ${documentType} visa in ${country}.`,
    });
  } catch (error) {
    console.error("Document checker error:", error);
    return NextResponse.json(
      { error: "Failed to check document requirements" },
      { status: 500 }
    );
  }
}
