import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, createConversation } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { participantIds = [], subject } = await req.json();
  // Ensure the creator is included
  const ids = Array.from(new Set([...participantIds, user.id]));

  const convo = await createConversation(ids, subject);
  return NextResponse.json(convo);
}
