import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";

export async function GET(req: NextRequest) {
  try {
    const sessionId =
      req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Missing session_id",
        },
        {
          status: 400,
        }
      );
    }

    const stripe = getStripe();

    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    const clerkId = session.metadata?.userId;

    if (!clerkId) {
      return NextResponse.json(
        {
          error: "User metadata missing.",
        },
        {
          status: 404,
        }
      );
    }

    const user = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const payment = await db.payment.findFirst({
      where: {
        stripePaymentId: session.payment_intent as string,
      },
      include: {
        invoice: true,
      },
    });

    return NextResponse.json({
      success: true,

      sessionId: session.id,

      paymentStatus: session.payment_status,

      customerName:
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),

      customerEmail: user.email,

      packageKey: session.metadata?.packageKey,

      packageName: session.metadata?.packageName,

      amount:
        payment?.amount ??
        session.amount_total ??
        0,

      currency:
        payment?.currency ??
        session.currency ??
        "USD",

      paymentId: payment?.id ?? null,

      paymentDate:
        payment?.createdAt ?? null,

      invoiceId:
        payment?.invoice?.id ?? null,

      invoiceNumber:
        payment?.invoice?.invoiceNumber ??
        null,
    });
  } catch (error) {
    console.error(error);
    try { captureException(error); } catch (_) {}

    return NextResponse.json(
      {
        error: "Unable to retrieve payment.",
      },
      {
        status: 500,
      }
    );
  }
}