import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  unauthorizedResponse,
  handleApiError,
  badRequestResponse,
} from "@/lib/api";

// GET /api/users/profile
export async function GET(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
      include: {
        profile: true,
        client: true,
      },
    });

    if (!user) {
      return badRequestResponse("User profile not found");
    }

    return successResponse(user);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/users/profile
export async function PUT(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const body = await request.json();

    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      state,
      country,
      postalCode,
      nationality,
      avatarUrl,
    } = body;

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return badRequestResponse("User not found");
    }

    // Update User table
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        avatarUrl: avatarUrl ?? undefined,
      },
    });

    // Update UserProfile table
    const profile = await db.userProfile.update({
      where: {
        userId: user.id,
      },
      data: {
        phoneNumber: phoneNumber ?? undefined,
        address: address ?? undefined,
        city: city ?? undefined,
        state: state ?? undefined,
        country: country ?? undefined,
        postalCode: postalCode ?? undefined,
        nationality: nationality ?? undefined,
      },
    });

    return successResponse(
      profile,
      "Profile updated successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}