import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    // Check if database is available
    await db.$connect();

    let user = await db.user.findUnique({ where: { clerkId: userId } });
    
    // If user doesn't exist in database, try to create them from Clerk
    if (!user) {
      try {
        const { currentUser } = await import("@clerk/nextjs/server");
        const clerkUser = await currentUser();
        
        if (clerkUser) {
          const email = clerkUser.emailAddresses?.[0]?.emailAddress;
          if (email) {
            user = await db.user.create({
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
              data: { userId: user.id },
            });
          
            await db.client.create({
              data: { userId: user.id },
            });
          }
        }
      } catch (error) {
        console.error("Failed to create user from Clerk:", error);
      }
    }
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ id: user.id, role: user.role, email: user.email });
  } catch (error) {
    console.error("Auth/me error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
