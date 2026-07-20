import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const totalClients = await db.user.count();
    const totalApplications = await db.application.count();
    const approved = await db.application.count({ where: { status: "APPROVED" } });
    const pending = await db.application.count({ where: { status: "PENDING" } });

    const revenue = await db.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED" },
    });

    return NextResponse.json({
      totalClients,
      totalApplications,
      approved,
      pending,
      revenue: revenue._sum.amount ?? 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
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

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    // =========================
    // ADMIN DASHBOARD
    // =========================

    if (
      user.role === "ADMIN" ||
      user.role === "SUPER_ADMIN"
    ) {
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
          where: {
            status: {
              in: [
                "DRAFT",
                "SUBMITTED",
                "UNDER_REVIEW",
              ],
            },
          },
        }),

        db.payment.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            status: "COMPLETED",
          },
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

    // =========================
    // CLIENT DASHBOARD
    // =========================

    const [
      applications,
      documents,
      appointments,
      notifications,
      payments,
      applicationStatuses,
    ] = await Promise.all([
      db.application.count({
        where: {
          userId: user.id,
        },
      }),

      db.document.count({
        where: {
          userId: user.id,
        },
      }),

      db.appointment.count({
        where: {
          userId: user.id,
          scheduledAt: {
            gte: new Date(),
          },
        },
      }),

      db.notification.count({
        where: {
          userId: user.id,
          isRead: false,
        },
      }),

      db.payment.count({
        where: {
          userId: user.id,
        },
      }),

      db.application.groupBy({
        by: ["status"],
        where: {
          userId: user.id,
        },
        _count: {
          status: true,
        },
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