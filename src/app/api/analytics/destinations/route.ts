import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const destinations = await db.application.groupBy({
    by: ["country"],
    _count: {
      country: true,
    },
    orderBy: {
      _count: {
        country: "desc",
      },
    },
    take: 4,
  });

  const totalApplications = destinations.reduce((sum, entry) => sum + entry._count.country, 0);

  return NextResponse.json({
    destinations: destinations.map((entry) => ({
      country: entry.country,
      count: entry._count.country,
      share: totalApplications ? Math.round((entry._count.country / totalApplications) * 100) : 0,
    })),
  });
}
