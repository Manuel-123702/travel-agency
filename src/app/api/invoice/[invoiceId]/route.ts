import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { db } from "@/lib/db";
import { captureException } from "@/lib/sentry";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const { invoiceId } = await params;

    const invoice = await db.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        user: true,
        payment: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // ===========================
    // HEADER
    // ===========================

    doc
      .fontSize(24)
      .text("Travel Agency", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .text("PAYMENT RECEIPT", {
        align: "center",
      });

    doc.moveDown(2);

    // ===========================
    // COMPANY
    // ===========================

    doc
      .fontSize(12)
      .text("Travel Agency Immigration Services");

    doc.text("Email: support@travelagency.com");

    doc.text("Website: https://your-domain.com");

    doc.moveDown();

    // ===========================
    // CUSTOMER
    // ===========================

    doc.fontSize(14).text("Customer");

    doc.moveDown(0.5);

    doc.text(
      `${invoice.user.firstName ?? ""} ${invoice.user.lastName ?? ""}`
    );

    doc.text(invoice.user.email);

    doc.moveDown();

    // ===========================
    // INVOICE
    // ===========================

    doc.fontSize(14).text("Invoice Details");

    doc.moveDown(0.5);

    doc.text(`Invoice #: ${invoice.invoiceNumber}`);

    doc.text(`Invoice ID: ${invoice.id}`);

    doc.text(
      `Payment Status: ${invoice.payment?.status ?? "COMPLETED"}`
    );

    doc.text(
      `Date: ${invoice.createdAt.toLocaleDateString()}`
    );

    doc.moveDown();

    // ===========================
    // PAYMENT
    // ===========================

    doc.fontSize(14).text("Payment");

    doc.moveDown(0.5);

    doc.text(
      `Amount Paid: ${(invoice.amount / 100).toFixed(2)} ${invoice.currency}`
    );

    doc.moveDown(2);

    doc
      .fontSize(18)
      .text("THANK YOU!", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        "Your payment has been received successfully.",
        {
          align: "center",
        }
      );

    doc.end();

const pdf = await pdfPromise;

const uint8 = new Uint8Array(pdf);

return new NextResponse(uint8, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
  },
});
  } catch (error) {

    console.error(error);
    try { captureException(error); } catch (_) {}

    return NextResponse.json(
      {
        error: "Unable to generate invoice",
      },
      {
        status: 500,
      }
    );
  }
}