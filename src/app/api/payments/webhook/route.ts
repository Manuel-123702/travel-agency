import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";
import Stripe from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const buf = await req.arrayBuffer();
  const raw = Buffer.from(buf);
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    try { captureException(err); } catch (_) {}
    return NextResponse.json({ error: `Webhook error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    // create payment record
    try {
      await db.createPayment({
        applicationId: metadata.applicationId || "",
        userId: metadata.userId || "",
        amount: session.amount_total || 0,
        currency: session.currency || "USD",
        stripePaymentId: session.payment_intent as string | undefined,
        status: "COMPLETED",
      });
      // notify the user via in-app + email if possible
      try {
        const userId = metadata.userId;
        if (userId) {
          const { notifyUserById } = await import("@/lib/notifications");
          await notifyUserById(userId, "Payment received", `Payment of ${(session.amount_total || 0) / 100} ${session.currency} received.`, {
            sendEmail: true,
            emailSubject: "Payment received",
            emailBody: `<p>We have received your payment of <strong>${(session.amount_total || 0) / 100} ${session.currency}</strong>. Thank you.</p>`,
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
