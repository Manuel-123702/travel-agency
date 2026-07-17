import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const now = new Date();
  const months: { label: string; year: number; month: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label: d.toLocaleString(undefined, { month: "short" }), year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const payments = await db.payment.findMany({
    where: { status: "COMPLETED", createdAt: { gte: start } },
    select: { amount: true, currency: true, createdAt: true },
  });

  const series = months.map((m) => {
    const total = payments
      .filter((p) => {
        const d = new Date(p.createdAt);
        return d.getMonth() + 1 === m.month && d.getFullYear() === m.year;
      })
      .reduce((s, p) => s + (p.amount || 0), 0);
    return total / 100;
  });

  return NextResponse.json({ months: months.map((m) => m.label), series });
}
