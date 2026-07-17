import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = getAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { conversationId, receiverId, content } = await req.json();
  const message = await db.createMessage({
    conversationId,
    senderId: user.id,
    receiverId,
    content,
  });

  return NextResponse.json(message);
}
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  successResponse,
  createdResponse,
  unauthorizedResponse,
  badRequestResponse,
  handleApiError,
} from "@/lib/api";
import { sendMessageSchema } from "@/lib/validations";

// POST /api/messages
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const sender = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!sender) {
      return unauthorizedResponse("User not found");
    }

    const body = await request.json();

    const validatedData = sendMessageSchema.parse(body);

    const conversation = await db.conversation.findUnique({
      where: {
        id: validatedData.conversationId,
      },
    });

    if (!conversation) {
      return badRequestResponse("Conversation not found");
    }

    const receiver = await db.user.findUnique({
      where: {
        id: validatedData.receiverId,
      },
    });

    if (!receiver) {
      return badRequestResponse("Receiver not found");
    }

    const message = await db.message.create({
      data: {
        conversationId: conversation.id,

        senderId: sender.id,

        receiverId: receiver.id,

        content: validatedData.content,
      },
    });

    await db.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        lastMessage: validatedData.content,
        lastMessageAt: new Date(),
      },
    });

    await db.notification.create({
      data: {
        userId: receiver.id,

        title: "New Message",

        message: `${sender.firstName ?? "Someone"} sent you a message.`,

        type: "MESSAGE",
      },
    });

    return createdResponse(
      message,
      "Message sent successfully."
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// GET /api/messages
export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return unauthorizedResponse();
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      return unauthorizedResponse("User not found");
    }

    const conversations = await db.conversation.findMany({
      where: {
        participantIds: {
          has: user.id,
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    return successResponse(conversations);
  } catch (error) {
    return handleApiError(error);
  }
}