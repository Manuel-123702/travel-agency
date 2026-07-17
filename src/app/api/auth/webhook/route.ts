import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";

export async function POST(req: Request) {
  const body = await req.text();

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", {
      status: 400,
    });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    try { captureException(err); } catch (_) {}

    return new Response("Invalid webhook", {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "user.created": {
        const {
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
        } = event.data;

        const email = email_addresses[0]?.email_address;

        if (!email) {
          break;
        }

        const existingUser = await db.user.findUnique({
          where: {
            clerkId: id,
          },
        });

        if (!existingUser) {
          const user = await db.user.create({
            data: {
              clerkId: id,
              email,
              firstName: first_name ?? null,
              lastName: last_name ?? null,
              avatarUrl: image_url ?? null,
              role: "CLIENT",
            },
          });

          await db.userProfile.create({
            data: {
              userId: user.id,
            },
          });

          await db.client.create({
            data: {
              userId: user.id,
            },
          });

          console.log("✅ User created:", email);
        }

        break;
      }

      case "user.updated": {
        const {
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
        } = event.data;

        await db.user.update({
          where: {
            clerkId: id,
          },
          data: {
            email: email_addresses[0]?.email_address,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
            avatarUrl: image_url ?? null,
          },
        });

        console.log("✅ User updated");

        break;
      }

      case "user.deleted": {
        const id = event.data.id;

        if (!id) {
          break;
        }

        await db.user.delete({
          where: {
            clerkId: id,
          },
        });

        console.log("✅ User deleted");

        break;
      }

      default:
        console.log(`Ignored webhook event: ${event.type}`);
    }

    return new Response("Webhook processed", {
      status: 200,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    try { captureException(error); } catch (_) {}

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}