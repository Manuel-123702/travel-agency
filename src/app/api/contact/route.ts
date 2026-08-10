import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email to tessohmanuel@gmail.com
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Travel Agency <noreply@travelagency.com>",
          to: "tessohmanuel@gmail.com",
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #1a365d; margin-bottom: 20px;">New Contact Form Submission</h2>
              <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              </div>
              <div style="margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Message:</strong></p>
                <p style="margin: 10px 0; padding: 15px; background-color: #edf2f7; border-radius: 6px;">${message}</p>
              </div>
              <p style="color: #718096; font-size: 12px; margin-top: 30px;">
                This message was sent from the Travel Agency contact form.
              </p>
            </div>
          `,
        });

        // Send confirmation email to the user
        await resend.emails.send({
          from: "Travel Agency <noreply@travelagency.com>",
          to: email,
          subject: "Thank you for contacting Travel Agency",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a365d;">Thank you for contacting us!</h1>
              <p style="color: #4a5568;">Dear ${name},</p>
              <p style="color: #4a5568;">We have received your message regarding "${subject}". Our team will review your inquiry and get back to you within 24 business hours.</p>
              <p style="color: #4a5568;">If you have any urgent questions, please don't hesitate to contact us directly at tessohmanuel@gmail.com or call us at +237 650 921 917.</p>
              <p style="color: #718096; font-size: 12px; margin-top: 30px;">Travel Agency - Your Gateway to International Success</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}