import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
  paginatedResponse,
  getPaginationParams,
} from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return unauthorizedResponse();
    }

    const prismaUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!prismaUser) {
      return unauthorizedResponse();
    }

    const unreadOnly =
      request.nextUrl.searchParams.get("unread") ===
      "true";

    const { page, limit, skip } =
      getPaginationParams(request);

    const where = {
      userId: prismaUser.id,
      ...(unreadOnly && {
        isRead: false,
      }),
    };

    const [notifications, total, unreadCount] =
      await Promise.all([
        db.notification.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),

        db.notification.count({
          where,
        }),

        db.notification.count({
          where: {
            userId: prismaUser.id,
            isRead: false,
          },
        }),
      ]);

    return paginatedResponse(
      {
        notifications,
        unreadCount,
      },
      total,
      page,
      limit
    );
  } catch (error) {
    return handleApiError(error);
  }
}