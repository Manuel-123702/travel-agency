import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// GET /api/analytics/stats
export async function GET(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Get live database statistics
    const [
      totalUsers,
      totalApplications,
      totalPayments,
      totalDocuments,
      totalAppointments,
      totalMessages,
      activeApplications,
      completedApplications,
      totalRevenue,
      recentUsers,
      recentApplications,
    ] = await Promise.all([
      db.user.count(),
      db.application.count(),
      db.payment.count(),
      db.document.count(),
      db.appointment.count(),
      db.message.count(),
      db.application.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "PROCESSING"] } } }),
      db.application.count({ where: { status: "COMPLETED" } }),
      db.payment.aggregate({ _sum: { amount: true } }),
      db.user.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      db.application.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { user: true } }),
    ]);

    // Applications by destination
    const applicationsByDestination = await db.application.groupBy({
      by: ["destination"],
      _count: true,
      orderBy: { _count: { destination: "desc" } },
    });

    // Applications by status
    const applicationsByStatus = await db.application.groupBy({
      by: ["status"],
      _count: true,
    });

    // Revenue by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenueByMonth = await db.payment.groupBy({
      by: {
        createdAt: true,
      },
      where: {
        createdAt: { gte: sixMonthsAgo },
        status: "COMPLETED",
      },
      _sum: { amount: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      overview: {
        totalUsers,
        totalApplications,
        totalPayments,
        totalDocuments,
        totalAppointments,
        totalMessages,
        activeApplications,
        completedApplications,
        totalRevenue: totalRevenue._sum.amount || 0,
      },
      applicationsByDestination,
      applicationsByStatus,
      revenueByMonth,
      recentUsers,
      recentApplications,
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
