import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = getAuth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: user.id, role: user.role });
}
