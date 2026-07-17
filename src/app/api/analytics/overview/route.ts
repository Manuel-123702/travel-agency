import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  // total clients
  const totalClients = await db.user.count({ where: { role: "CLIENT" } });

  // active clients
  const activeClients = await db.user.count({ where: { role: "CLIENT", isActive: true } });

  // applications
  const totalApplications = await db.application.count();
  const pendingApplications = await db.application.count({ where: { status: "SUBMITTED" } });
  const approvedApplications = await db.application.count({ where: { status: "APPROVED" } });

  // revenue
  const revenueAgg = await db.payment.aggregate({
    _sum: { amount: true },
    where: { status: "COMPLETED" },
  });

  const revenue = (revenueAgg._sum.amount || 0) / 100; // assume cents

  return NextResponse.json({
    totalClients,
    activeClients,
    totalApplications,
    pendingApplications,
    approvedApplications,
    revenue,
  });
}
