import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  handleApiError,
} from "@/lib/api";

interface Application {
  id: string;
  userId: string;
  status: string;
  createdAt: Date;
  submittedAt?: Date | null;
  interviewScheduled?: boolean | null;
  interviewDate?: Date | null;
  decisionDate?: Date | null;
  visaIssuedAt?: Date | null;
}

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  date?: string;
  icon: string;
}

// GET /api/applications/[id]/timeline
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clerkUser = await currentUser();
    const { id } = await params;

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const application = await db.application.findUnique({
      where: { id },
      include: {
        documents: true,
        appointments: true,
      },
    });

    if (!application) {
      return notFoundResponse("Application not found");
    }

    if (application.userId !== user.id) {
      return unauthorizedResponse("Access denied");
    }

    // Generate timeline steps based on application status
    const timelineSteps = generateTimelineSteps(application as Application);

    return successResponse(timelineSteps);
  } catch (error) {
    return handleApiError(error);
  }
}

function generateTimelineSteps(application: Application): TimelineStep[] {
  const steps = [
    {
      id: "document_submission",
      title: "Document Submission",
      description: "All required documents have been submitted for review.",
      status: "completed" as const,
      date: application.createdAt.toISOString().split("T")[0],
      icon: "FileText",
    },
    {
      id: "application_submitted",
      title: "Application Submitted",
      description: "Your application has been submitted to the immigration authorities.",
      status: application.status === "DRAFT" ? ("pending" as const) : ("completed" as const),
      date: application.submittedAt?.toISOString().split("T")[0],
      icon: "Send",
    },
    {
      id: "under_review",
      title: "Under Review",
      description: "Your application is being reviewed by immigration officials.",
      status: ["SUBMITTED", "UNDER_REVIEW"].includes(application.status)
        ? ("in_progress" as const)
        : ["APPROVED", "REJECTED", "COMPLETED"].includes(application.status)
        ? ("completed" as const)
        : ("pending" as const),
      icon: "Clock",
    },
    {
      id: "interview",
      title: "Interview (if required)",
      description: "An interview may be scheduled as part of the application process.",
      status: application.interviewScheduled ? ("in_progress" as const) : ("pending" as const),
      date: application.interviewDate?.toISOString().split("T")[0],
      icon: "Calendar",
    },
    {
      id: "verification",
      title: "Document Verification",
      description: "Submitted documents are being verified for authenticity.",
      status: ["UNDER_REVIEW", "VERIFICATION"].includes(application.status)
        ? ("in_progress" as const)
        : ["APPROVED", "REJECTED", "COMPLETED"].includes(application.status)
        ? ("completed" as const)
        : ("pending" as const),
      icon: "UserCheck",
    },
    {
      id: "decision",
      title: "Final Decision",
      description: "A decision has been made on your application.",
      status: ["APPROVED", "REJECTED"].includes(application.status)
        ? ("completed" as const)
        : ("pending" as const),
      date: application.decisionDate?.toISOString().split("T")[0],
      icon: "Check",
    },
    {
      id: "visa_issuance",
      title: "Visa Issuance",
      description: "Your visa has been issued and is ready for collection.",
      status: application.status === "COMPLETED" ? ("completed" as const) : ("pending" as const),
      date: application.visaIssuedAt?.toISOString().split("T")[0],
      icon: "Plane",
    },
  ];

  return steps;
}
