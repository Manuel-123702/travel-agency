import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

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

import { createApplicationSchema } from "@/lib/validations";

// =====================================
// GET USER APPLICATIONS
// =====================================

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
      return unauthorizedResponse("User not found.");
    }

    const { page, limit, skip } = getPaginationParams(request);

    const [applications, total] = await Promise.all([
      db.application.findMany({
        where: {
          userId: user.id,
        },

        include: {
          documents: {
            take: 3,
            orderBy: {
              createdAt: "desc",
            },
          },

          appointments: true,

          payments: true,
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limit,
      }),

      db.application.count({
        where: {
          userId: user.id,
        },
      }),
    ]);

    return paginatedResponse(
      applications,
      total,
      page,
      limit
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// =====================================
// CREATE APPLICATION
// =====================================

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
      return unauthorizedResponse("User not found.");
    }

    const body = await request.json();

    const validated =
      createApplicationSchema.parse(body);

    const application =
      await db.application.create({
        data: {
          userId: user.id,

          visaType: validated.visaType,

          country: validated.country,

          notes: validated.notes,

          status: "DRAFT",

          progressPercentage: 0,

          currentStep: 1,
        },
      });

    await db.applicationTimeline.create({
      data: {
        applicationId: application.id,

        step: 1,

        title: "Application Created",

        description:
          "Your application has been created.",

        status: "DRAFT",
      },
    });

    await db.notification.create({
      data: {
        userId: user.id,

        title: "Application Created",

        message: `Your ${validated.country} visa application has been created successfully.`,

        type: "APPLICATION",
      },
    });

    return createdResponse(
      application,
      "Application created successfully."
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "ZodError"
    ) {
      return badRequestResponse(
        "Invalid application data."
      );
    }

    return handleApiError(error);
  }
}