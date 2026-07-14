import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  createdResponse,
  unauthorizedResponse,
  badRequestResponse,
  handleApiError,
  paginatedResponse,
  getPaginationParams,
} from "@/lib/api";

// GET /api/documents
export async function GET(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const { searchParams } = request.nextUrl;

    const applicationId =
      searchParams.get("applicationId");

    const { page, limit, skip } =
      getPaginationParams(request);

    const where = applicationId
      ? {
          userId: user.id,
          applicationId,
        }
      : {
          userId: user.id,
        };

    const [documents, total] =
      await Promise.all([
        db.document.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),

        db.document.count({
          where,
        }),
      ]);

    if (applicationId) {
      return successResponse(documents);
    }

    return paginatedResponse(
      documents,
      total,
      page,
      limit
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/documents
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const formData = await request.formData();

    const file =
      formData.get("file") as File;

    const type =
      formData.get("type") as string;

    const applicationId =
      formData.get("applicationId") as
        | string
        | null;

    if (!file || !type) {
      return badRequestResponse(
        "File and type are required."
      );
    }

    const document = await db.document.create({
      data: {
        userId: user.id,

        applicationId:
          applicationId || null,

        type: type as any,

        fileName: file.name,

        fileUrl:
          "https://uploadthing.com/placeholder",

        fileKey:
          `${Date.now()}-${file.name}`,

        fileSize: file.size,

        mimeType: file.type,
      },
    });

    await db.notification.create({
      data: {
        userId: user.id,

        title: "Document Uploaded",

        message: `${file.name} uploaded successfully.`,

        type: "DOCUMENT",
      },
    });

    return createdResponse(
      document,
      "Document uploaded successfully."
    );
  } catch (error) {
    return handleApiError(error);
  }
}