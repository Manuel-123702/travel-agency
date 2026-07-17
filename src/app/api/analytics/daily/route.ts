import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - 6);

  const applications = await db.application.findMany({
    where: { createdAt: { gte: start } },
    select: { createdAt: true },
  });

  const payments = await db.payment.findMany({
    where: { status: "COMPLETED", createdAt: { gte: start } },
    select: { amount: true, createdAt: true },
  });

  const days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      label: date.toLocaleDateString(undefined, { weekday: "short", month: "numeric", day: "numeric" }),
      start: new Date(date),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999),
    };
  });

  const series = days.map((day) => {
    const dayApplications = applications.filter((application) => {
      const created = new Date(application.createdAt);
      return created >= day.start && created <= day.end;
    });

    const dayPayments = payments.filter((payment) => {
      const created = new Date(payment.createdAt);
      return created >= day.start && created <= day.end;
    });

    const revenue = dayPayments.reduce((sum, payment) => sum + (payment.amount ?? 0), 0) / 100;

    return {
      label: day.label,
      applications: dayApplications.length,
      payments: dayPayments.length,
      revenue,
    };
  });

  return NextResponse.json({
    labels: series.map((item) => item.label),
    applications: series.map((item) => item.applications),
    payments: series.map((item) => item.payments),
    revenue: series.map((item) => item.revenue),
  });
}
