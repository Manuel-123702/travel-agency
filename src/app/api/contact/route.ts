import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/browser";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields. Please complete all fields." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Log submission to server console / database
    console.log("📩 NEW CONTACT FORM SUBMISSION:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || "Not provided",
      subject,
      message,
    });

    // Send email via EmailJS
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;

    if (publicKey && serviceId && templateId) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: name,
            from_email: email,
            phone: phone || "Not provided",
            subject: subject,
            message: message,
            to_email: "tessohmanuel@gmail.com",
          },
          publicKey
        );
        console.log("✅ Email sent successfully via EmailJS");
      } catch (emailjsError) {
        console.warn("EmailJS email dispatch failed:", emailjsError);
      }
    } else {
      console.warn("EmailJS credentials not configured in environment variables");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! Our immigration team will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form route error:", error);
    return NextResponse.json(
      { success: true, message: "Inquiry received successfully!" },
      { status: 200 }
    );
  }
}