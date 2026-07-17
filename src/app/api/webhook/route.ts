import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "Missing Stripe signature",
      },
      {
        status: 400,
      }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      {
        error: "Missing STRIPE_WEBHOOK_SECRET",
      },
      {
        status: 500,
      }
    );
  }

  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);
    try { captureException(err); } catch (_) {}

    return NextResponse.json(
      {
        error: "Invalid webhook signature",
      },
      {
        status: 400,
      }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(
        event.data.object as Stripe.Checkout.Session
      );
      break;

    case "payment_intent.payment_failed": {
      const paymentIntent =
        event.data.object as Stripe.PaymentIntent;

      console.log(
        "Payment failed:",
        paymentIntent.id,
        paymentIntent.last_payment_error?.message
      );

      break;
    }

    default:
      console.log(`Unhandled event ${event.type}`);
  }

  return NextResponse.json({
    received: true,
  });
}
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  // Only continue if Stripe confirms the payment
  if (session.payment_status !== "paid") {
    return;
  }

  const metadata = session.metadata;

  if (!metadata) {
    console.log("Missing checkout metadata");
    return;
  }

  // This is the Clerk ID sent from /api/checkout
  const clerkId = metadata.userId;

  if (!clerkId) {
    console.log("Missing Clerk user ID");
    return;
  }

  // This is the application saved in Checkout metadata
  const applicationId = metadata.applicationId;

  if (!applicationId) {
    console.log("Missing application ID");
    return;
  }

  // Find the user
  const user = await db.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    console.log("User not found");
    return;
  }

  // Prevent duplicate webhook execution
  const existingPayment = await db.payment.findFirst({
    where: {
      stripePaymentId: String(session.payment_intent),
    },
  });

  if (existingPayment) {
    console.log("Payment already exists");
    return;
  }

  // Make sure the application exists
  const application = await db.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!application) {
    console.log("Application not found");
    return;
  }

  // Save payment
  const payment = await db.payment.create({
    data: {
      applicationId: application.id,
      userId: user.id,

      amount: session.amount_total ?? 0,

      currency:
        session.currency?.toUpperCase() ?? "USD",

      status: "COMPLETED",

      stripePaymentId:
        String(session.payment_intent),

      stripeCustomerId:
        typeof session.customer === "string"
          ? session.customer
          : null,

      stripeInvoiceId:
        typeof session.invoice === "string"
          ? session.invoice
          : null,
    },
  });

  // Create invoice
  await db.invoice.create({
    data: {
      applicationId: application.id,

      userId: user.id,

      paymentId: payment.id,

      invoiceNumber: `INV-${Date.now()}`,

      amount: payment.amount,

      currency: payment.currency,
    },
  });

  // Notify user
  await db.notification.create({
    data: {
      userId: user.id,

      title: "Payment Successful",

      message: `Your payment for ${
        metadata.packageName ?? "your package"
      } has been received successfully.`,

      type: "PAYMENT",
    },
  });

  console.log("====================================");
  console.log("PAYMENT SAVED SUCCESSFULLY");
  console.log("User:", user.email);
  console.log("Application:", application.id);
  console.log("Package:", metadata.packageName);
  console.log("Amount:", payment.amount / 100, payment.currency);
  console.log("Stripe Payment:", payment.stripePaymentId);
  console.log("====================================");
}