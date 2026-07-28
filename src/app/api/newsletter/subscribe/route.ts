import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send confirmation email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Travel Agency <noreply@travelagency.com>",
          to: email,
          subject: "Welcome to Travel Agency Newsletter",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a365d;">Welcome to Travel Agency!</h1>
              <p style="color: #4a5568;">Thank you for subscribing to our newsletter.</p>
              <p style="color: #4a5568;">You'll receive the latest immigration updates, policy changes, and success stories directly in your inbox.</p>
              <p style="color: #4a5568;">If you didn't subscribe to this newsletter, please ignore this email.</p>
              <p style="color: #718096; font-size: 12px;">Travel Agency - Your Gateway to International Success</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue even if email fails - subscription is saved
      }
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
