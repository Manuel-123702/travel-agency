import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  createdResponse,
  unauthorizedResponse,
  handleApiError,
} from "@/lib/api";
import { createAppointmentSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) return unauthorizedResponse();

    let prismaUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    // If user doesn't exist in database, try to create them from Clerk
    if (!prismaUser) {
      try {
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (email) {
          prismaUser = await db.user.create({
            data: {
              clerkId: user.id,
              email,
              firstName: user.firstName ?? null,
              lastName: user.lastName ?? null,
              avatarUrl: user.imageUrl ?? null,
              role: "CLIENT",
            },
          });
          
          // Create associated profile records
          await db.userProfile.create({
            data: { userId: prismaUser.id },
          });
          
          await db.client.create({
            data: { userId: prismaUser.id },
          });
        }
      } catch (error) {
        console.error("Failed to create user from Clerk:", error);
      }
    }

    if (!prismaUser) {
      return unauthorizedResponse();
    }

    const upcoming =
      request.nextUrl.searchParams.get("upcoming") === "true";

    const appointments = await db.appointment.findMany({
      where: {
        userId: prismaUser.id,
        ...(upcoming && {
          scheduledAt: {
            gte: new Date(),
          },
        }),
      },
      orderBy: {
        scheduledAt: "desc",
      },
      ...(upcoming && {
        take: 5,
      }),
    });

    return successResponse(appointments);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) return unauthorizedResponse();

    let prismaUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    // If user doesn't exist in database, try to create them from Clerk
    if (!prismaUser) {
      try {
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (email) {
          prismaUser = await db.user.create({
            data: {
              clerkId: user.id,
              email,
              firstName: user.firstName ?? null,
              lastName: user.lastName ?? null,
              avatarUrl: user.imageUrl ?? null,
              role: "CLIENT",
            },
          });
          
          // Create associated profile records
          await db.userProfile.create({
            data: { userId: prismaUser.id },
          });
          
          await db.client.create({
            data: { userId: prismaUser.id },
          });
        }
      } catch (error) {
        console.error("Failed to create user from Clerk:", error);
      }
    }

    if (!prismaUser) {
      return unauthorizedResponse();
    }

    const body = await request.json();

    const validatedData =
      createAppointmentSchema.parse(body);

    const appointment =
      await db.appointment.create({
        data: {
          userId: prismaUser.id,

          applicationId:
            validatedData.applicationId ?? null,

          title: validatedData.title,

          scheduledAt:
            validatedData.scheduledAt,

          duration:
            validatedData.duration ?? 30,

          meetingType:
            validatedData.meetingType,

          meetingLink:
            validatedData.meetingLink,

          location:
            validatedData.location,

          status: "SCHEDULED",
        },
      });

    await db.notification.create({
      data: {
        userId: prismaUser.id,
        title: "Appointment Scheduled",
        message: `Your appointment has been scheduled.`,
        type: "APPOINTMENT",
      },
    });

    return createdResponse(
      appointment,
      "Appointment created successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}