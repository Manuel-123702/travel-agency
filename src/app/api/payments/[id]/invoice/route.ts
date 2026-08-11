import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

interface PaymentWithApplication {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  stripePaymentId: string | null;
  paypalOrderId: string | null;
  paypalPaymentId: string | null;
  orangeTransactionId: string | null;
  createdAt: Date;
  application: {
    id: string;
    country: string;
    visaType: string;
  } | null;
}

interface User {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

// GET /api/payments/[id]/invoice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clerkUser = await currentUser();
    const { id } = await params;

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const payment = await db.payment.findUnique({
      where: { id },
      include: {
        application: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF(payment as PaymentWithApplication, user as User);

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${payment.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}

async function generateInvoicePDF(payment: PaymentWithApplication, user: User) {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc.fontSize(20).font("Helvetica-Bold").text("INVOICE", { align: "right" });
      doc.moveDown();

      // Company info
      doc.fontSize(12).font("Helvetica").text("Travel Agency", 50, 50);
      doc.text("Immigration Consulting Services");
      doc.text("Yaoundé, Cameroon");
      doc.text("contact@travelagency.com");
      doc.text("+237 650 921 917");

      // Invoice details
      doc.moveDown(2);
      doc.fontSize(10).text(`Invoice #: ${payment.id}`, { align: "right" });
      doc.text(`Date: ${payment.createdAt.toLocaleDateString()}`, { align: "right" });
      doc.text(`Status: ${payment.status}`, { align: "right" });

      // Client info
      doc.moveDown(2);
      doc.fontSize(12).font("Helvetica-Bold").text("Bill To:");
      doc.fontSize(10).font("Helvetica").text(`${user.firstName} ${user.lastName}`);
      doc.text(user.email);

      // Payment details
      doc.moveDown(2);
      doc.fontSize(12).font("Helvetica-Bold").text("Payment Details:");
      doc.fontSize(10).font("Helvetica").text(`Amount: $${payment.amount.toFixed(2)}`);
      doc.text(`Currency: ${payment.currency}`);
      doc.text(`Payment Method: ${payment.paymentMethod}`);
      const transactionId = payment.stripePaymentId || payment.paypalOrderId || payment.paypalPaymentId || payment.orangeTransactionId || "N/A";
      doc.text(`Transaction ID: ${transactionId}`);

      // Application reference
      if (payment.application) {
        doc.moveDown(2);
        doc.fontSize(12).font("Helvetica-Bold").text("Application Reference:");
        doc.fontSize(10).font("Helvetica").text(`Application ID: ${payment.application.id}`);
        doc.text(`Country: ${payment.application.country}`);
        doc.text(`Visa Type: ${payment.application.visaType}`);
      }

      // Footer
      doc.moveDown(3);
      doc.fontSize(8).text("Thank you for your payment!", { align: "center" });
      doc.text("This is a computer-generated invoice.", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
