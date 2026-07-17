import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";

export const config = { api: { bodyParser: false } } as any;

async function buffer(readable: any) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const buf = await req.arrayBuffer();
  const raw = Buffer.from(buf);
  let event: any;

  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err: any) {
    try { captureException(err); } catch (_) {}
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    // create payment record
    try {
      await db.createPayment({
        applicationId: metadata.applicationId || "",
        userId: metadata.userId || "",
        amount: session.amount_total || 0,
        currency: session.currency || "USD",
        stripePaymentId: session.payment_intent || undefined,
        status: "COMPLETED",
      } as any);
      // notify the user via in-app + email if possible
      try {
        const userId = metadata.userId;
        if (userId) {
          const { notifyUserById } = await import("@/lib/notifications");
          await notifyUserById(userId, "Payment received", `Payment of ${session.amount_total / 100} ${session.currency} received.`, {
            sendEmail: true,
            emailSubject: "Payment received",
            emailBody: `<p>We have received your payment of <strong>${session.amount_total / 100} ${session.currency}</strong>. Thank you.</p>`,
          });
        }
      } catch (e) {
        console.error("Failed to send payment notification", e);
        try { captureException(e); } catch (_) {}
      }
      } catch (e) {
      console.error("Failed to create payment record", e);
      try { captureException(e); } catch (_) {}
    }
  }

  return NextResponse.json({ received: true });
}
