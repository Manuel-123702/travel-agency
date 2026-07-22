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

    // Fetch invoices for this user
    const invoices = await db.invoice.findMany({
      where: { userId: user.id },
      include: {
        payment: {
          select: {
            id: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
          },
        },
        application: {
          select: {
            id: true,
            country: true,
            visaType: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate stats
    const pendingInvoices = invoices.filter(
      (inv) => !inv.payment || inv.payment.status !== "COMPLETED"
    ).length;

    const paidInvoices = invoices.filter(
      (inv) => inv.payment && inv.payment.status === "COMPLETED"
    ).length;

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

    return NextResponse.json({
      invoices,
      stats: {
        pendingInvoices,
        paidInvoices,
        totalAmount,
      },
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
