import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getCurrentUser() {
  const { userId } = getAuth();
  if (!userId) return null;

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    throw new Error("Insufficient permissions");
  }
  return user;
}
