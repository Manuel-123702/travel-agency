import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        applications: {
          include: {
            timeline: {
              orderBy: { step: "asc" },
            },
            documents: true,
            appointments: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // If user doesn't exist in database, try to create them from Clerk
    if (!user) {
      try {
        const { currentUser } = await import("@clerk/nextjs/server");
        const clerkUser = await currentUser();
        
        if (clerkUser) {
          const email = clerkUser.emailAddresses?.[0]?.emailAddress;
          if (email) {
            const newUser = await db.user.create({
              data: {
                clerkId: userId,
                email,
                firstName: clerkUser.firstName ?? null,
                lastName: clerkUser.lastName ?? null,
                avatarUrl: clerkUser.imageUrl ?? null,
                role: "CLIENT",
              },
            });
            
            // Create associated profile records
            await db.userProfile.create({
              data: { userId: newUser.id },
            });
            
            await db.client.create({
              data: { userId: newUser.id },
            });
            
            // Refetch with applications
            user = await db.user.findUnique({
              where: { clerkId: userId },
              include: {
                applications: {
                  include: {
                    timeline: {
                      orderBy: { step: "asc" },
                    },
                    documents: true,
                    appointments: true,
                  },
                  orderBy: { createdAt: "desc" },
                },
              },
            });
          }
        }
      } catch (error) {
        console.error("Failed to create user from Clerk:", error);
      }
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      applications: user.applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
