import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      applicationId,
      userId,
      amount,
      currency = "USD",
      paymentMethod,
      // Stripe specific
      paymentMethodId,
      // PayPal specific
      paypalOrderId,
      // Orange Money specific
      orangePhoneNumber,
      // MTN MoMo specific
      mtnPhoneNumber,
    } = body;

    // Validate required fields
    if (!applicationId || !userId || !amount || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create payment record
    const payment = await db.payment.create({
      data: {
        applicationId,
        userId,
        amount,
        currency,
        paymentMethod: paymentMethod as PaymentMethod,
        status: PaymentStatus.PENDING,
      },
    });

    // Process payment based on method
    let paymentResult;

    switch (paymentMethod) {
      case "STRIPE":
        paymentResult = await processStripePayment(
          payment.id,
          userId,
          amount,
          currency,
          paymentMethodId
        );
        break;

      case "PAYPAL":
        paymentResult = await processPayPalPayment(
          payment.id,
          userId,
          amount,
          currency,
          paypalOrderId
        );
        break;

      case "ORANGE_MONEY":
        paymentResult = await processOrangeMoneyPayment(
          payment.id,
          userId,
          amount,
          currency,
          orangePhoneNumber
        );
        break;

      case "MTN_MOMO":
        paymentResult = await processMTNMoMoPayment(
          payment.id,
          userId,
          amount,
          currency,
          mtnPhoneNumber
        );
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported payment method" },
          { status: 400 }
        );
    }

    // Extract metadata and clientSecret safely if present in result
    const metadata =
      "metadata" in paymentResult && paymentResult.metadata
        ? paymentResult.metadata
        : {};
    const clientSecret =
      "clientSecret" in paymentResult ? paymentResult.clientSecret : null;

    // Update payment with result
    const updatedPayment = await db.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentResult.success
          ? PaymentStatus.COMPLETED
          : PaymentStatus.FAILED,
        ...metadata,
      },
    });

    // If payment successful, generate invoice and receipt
    if (paymentResult.success) {
      await generateInvoice(updatedPayment);
      await generateReceipt(updatedPayment);
      await sendPaymentConfirmationEmail(updatedPayment);
    }

    return NextResponse.json({
      success: paymentResult.success,
      payment: updatedPayment,
      clientSecret,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}

// Stripe payment processing
async function processStripePayment(
  paymentId: string,
  userId: string,
  amount: number,
  currency: string,
  paymentMethodId?: string
) {
  try {
    const stripe = getStripe();

    // Create or get Stripe customer
    const user = await db.user.findUnique({ where: { id: userId } });
    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user?.email,
        metadata: { userId },
      });
      customerId = customer.id;

      await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: paymentMethodId ? true : false,
      metadata: { paymentId },
    });

    // Update payment with Stripe IDs
    await db.payment.update({
      where: { id: paymentId },
      data: {
        stripeCustomerId: customerId,
        stripePaymentId: paymentIntent.id,
      },
    });

    return {
      success: paymentIntent.status === "succeeded",
      clientSecret: paymentIntent.client_secret,
      metadata: {
        stripeCustomerId: customerId,
        stripePaymentId: paymentIntent.id,
      },
    };
  } catch (error) {
    console.error("Stripe payment error:", error);
    return { success: false, error: "Stripe payment failed" };
  }
}

// PayPal payment processing (placeholder)
async function processPayPalPayment(
  paymentId: string,
  userId: string,
  amount: number,
  currency: string,
  orderId?: string
) {
  // TODO: Implement PayPal API integration
  return {
    success: false,
    error: "PayPal integration not yet implemented",
  };
}

// Orange Money payment processing (placeholder)
async function processOrangeMoneyPayment(
  paymentId: string,
  userId: string,
  amount: number,
  currency: string,
  phoneNumber?: string
) {
  // TODO: Implement Orange Money API integration
  return {
    success: false,
    error: "Orange Money integration not yet implemented",
  };
}

// MTN MoMo payment processing (placeholder)
async function processMTNMoMoPayment(
  paymentId: string,
  userId: string,
  amount: number,
  currency: string,
  phoneNumber?: string
) {
  // TODO: Implement MTN MoMo API integration
  return {
    success: false,
    error: "MTN MoMo integration not yet implemented",
  };
}

interface PaymentResult {
  success: boolean;
  clientSecret?: string;
  metadata?: Record<string, any>;
  error?: string;
}

interface Payment {
  id: string;
  applicationId: string;
  userId: string;
  amount: number;
  currency: string;
  stripeCustomerId?: string | null;
  stripePaymentId?: string | null;
  receiptUrl?: string | null;
}

// Generate invoice
async function generateInvoice(payment: Payment) {
  try {
    const invoiceNumber = `INV-${Date.now()}-${payment.id.slice(-6)}`;

    const invoice = await db.invoice.create({
      data: {
        applicationId: payment.applicationId,
        userId: payment.userId,
        paymentId: payment.id,
        invoiceNumber,
        amount: payment.amount,
        currency: payment.currency,
      },
    });

    return invoice;
  } catch (error) {
    console.error("Invoice generation error:", error);
    throw error;
  }
}

// Generate receipt (placeholder - would use PDF generation library)
async function generateReceipt(payment: Payment) {
  try {
    // TODO: Implement PDF receipt generation using jsPDF or similar
    const receiptUrl = `/receipts/${payment.id}.pdf`;

    await db.payment.update({
      where: { id: payment.id },
      data: { receiptUrl },
    });

    return receiptUrl;
  } catch (error) {
    console.error("Receipt generation error:", error);
    throw error;
  }
}

// Send payment confirmation email (placeholder)
async function sendPaymentConfirmationEmail(payment: Payment) {
  try {
    // TODO: Implement email sending using Resend, SendGrid, or similar
    console.log(`Sending payment confirmation email for payment ${payment.id}`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
