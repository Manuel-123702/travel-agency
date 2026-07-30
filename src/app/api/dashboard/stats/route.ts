import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
} from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    let user = await db.user.findUnique({ where: { clerkId: clerkUser.id } });

    // If user doesn't exist in database, try to create them from Clerk
    if (!user) {
      try {
        const email = clerkUser.emailAddresses?.[0]?.emailAddress;
        if (email) {
          user = await db.user.create({
            data: {
              clerkId: clerkUser.id,
              email,
              firstName: clerkUser.firstName ?? null,
              lastName: clerkUser.lastName ?? null,
              avatarUrl: clerkUser.imageUrl ?? null,
              role: "CLIENT",
            },
          });
          
          // Create associated profile records
          await db.userProfile.create({
            data: { userId: user.id },
          });
          
          await db.client.create({
            data: { userId: user.id },
          });
        }
      } catch (error) {
        console.error("Failed to create user from Clerk:", error);
      }
    }

    if (!user) return unauthorizedResponse("User not found");

    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
      const [
        totalUsers,
        totalApplications,
        totalDocuments,
        totalPayments,
        pendingApplications,
        revenue,
      ] = await Promise.all([
        db.user.count(),
        db.application.count(),
        db.document.count(),
        db.payment.count(),
        db.application.count({
          where: { status: { in: ["DRAFT", "SUBMITTED", "UNDER_REVIEW"] } },
        }),
        db.payment.aggregate({
          _sum: { amount: true },
          where: { status: "COMPLETED" },
        }),
      ]);

      return successResponse({
        totalUsers,
        totalApplications,
        totalDocuments,
        totalPayments,
        pendingApplications,
        revenue: revenue._sum.amount ?? 0,
      });
    }

    const [
      applications,
      documents,
      appointments,
      notifications,
      payments,
      applicationStatuses,
    ] = await Promise.all([
      db.application.count({ where: { userId: user.id } }),
      db.document.count({ where: { userId: user.id } }),
      db.appointment.count({
        where: { userId: user.id, scheduledAt: { gte: new Date() } },
      }),
      db.notification.count({ where: { userId: user.id, isRead: false } }),
      db.payment.count({ where: { userId: user.id } }),
      db.application.groupBy({
        by: ["status"],
        where: { userId: user.id },
        _count: { status: true },
      }),
    ]);

    return successResponse({
      applications,
      documents,
      upcomingAppointments: appointments,
      unreadNotifications: notifications,
      payments,
      applicationStatuses,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
