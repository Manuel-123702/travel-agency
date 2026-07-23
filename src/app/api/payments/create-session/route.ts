import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { applicationId, amount, currency = "USD", successUrl, cancelUrl } = await req.json();

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: `Payment for application ${applicationId || "general"}` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?status=success`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?status=cancel`,
    metadata: {
      applicationId: applicationId ?? "",
      userId: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
