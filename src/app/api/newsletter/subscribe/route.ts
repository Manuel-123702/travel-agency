import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/browser";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists in database
    const existingSubscriber = await db.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // Save to database
    await db.newsletter.create({
      data: {
        email,
        subscribedAt: new Date(),
      },
    });

    // Send emails via EmailJS
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const subscriberTemplateId = process.env.EMAILJS_SUBSCRIBER_TEMPLATE_ID;
    const adminTemplateId = process.env.EMAILJS_ADMIN_TEMPLATE_ID;

    if (publicKey && serviceId && subscriberTemplateId && adminTemplateId) {
      try {
        // Send confirmation to subscriber
        await emailjs.send(
          serviceId,
          subscriberTemplateId,
          {
            to_email: email,
            subscribed_date: new Date().toLocaleDateString(),
          },
          publicKey
        );

        // Notify admin about new subscriber
        await emailjs.send(
          serviceId,
          adminTemplateId,
          {
            subscriber_email: email,
            subscribed_date: new Date().toLocaleString(),
            admin_email: "tessohmanuel@gmail.com",
          },
          publicKey
        );

        console.log("✅ Newsletter emails sent successfully via EmailJS");
      } catch (emailjsError) {
        console.warn("EmailJS email dispatch failed:", emailjsError);
      }
    } else {
      console.warn("EmailJS credentials not configured in environment variables");
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
