import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch completed payments with receipts
    const payments = await db.payment.findMany({
      where: {
        userId: user.id,
        status: "COMPLETED",
        receiptUrl: { not: null },
      },
      include: {
        application: {
          select: {
            id: true,
            country: true,
            visaType: true,
          },
        },
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to receipt format
    const receipts = payments.map((payment: any) => ({
      id: payment.id,
      paymentId: payment.id,
      invoiceNumber: payment.invoice?.invoiceNumber || null,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      receiptUrl: payment.receiptUrl,
      createdAt: payment.createdAt,
      application: payment.application,
    }));

    return NextResponse.json({
      receipts,
      count: receipts.length,
    });
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return NextResponse.json(
      { error: "Failed to fetch receipts" },
      { status: 500 }
    );
  }
}
