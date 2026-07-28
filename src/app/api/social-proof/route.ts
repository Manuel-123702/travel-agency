import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface SocialProofNotification {
  name: string;
  location: string;
  action: string;
  time: string;
  avatar: string;
  color: string;
}

export async function GET(req: NextRequest) {
  try {
    // Fetch recent successful applications, consultations, and user activities
    const [recentApplications, recentConsultations] = await Promise.all([
      db.application.findMany({
        where: {
          status: { in: ["APPROVED", "COMPLETED"] },
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 10,
      }),
      db.appointment.findMany({
        where: {
          status: "CONFIRMED",
          scheduledAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    // Transform into social proof notifications
    const notifications: SocialProofNotification[] = [];

    // Add recent successful applications
    recentApplications.forEach((app) => {
      const firstName = app.user.firstName || "User";
      const lastName = app.user.lastName || "";
      const name = `${firstName} ${lastName.charAt(0)}.`;
      const destination = app.country || "Unknown";
      const action = "received their visa approval ✓";
      const time = getTimeAgo(app.updatedAt);
      const avatar = firstName.charAt(0);
      const color = getRandomColor();

      notifications.push({ name, location: destination, action, time, avatar, color });
    });

    // Add recent consultations
    recentConsultations.forEach((consultation) => {
      const firstName = consultation.user.firstName || "User";
      const lastName = consultation.user.lastName || "";
      const name = `${firstName} ${lastName.charAt(0)}.`;
      const action = "booked a consultation";
      const time = getTimeAgo(consultation.createdAt);
      const avatar = firstName.charAt(0);
      const color = getRandomColor();

      notifications.push({ name, location: "Online", action, time, avatar, color });
    });

    // Shuffle and limit to 5
    const shuffled = notifications.sort(() => Math.random() - 0.5).slice(0, 5);

    return NextResponse.json({ notifications: shuffled });
  } catch (error) {
    console.error("Error fetching social proof:", error);
    return NextResponse.json(
      { error: "Failed to fetch social proof" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function getRandomColor(): string {
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-red-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-teal-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
