import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, country, projectType } = await req.json();

    // Validate required fields
    if (!fullName || !email || !country || !projectType) {
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
          subject: `New Immigration Evaluation: ${projectType} to ${country}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #1a365d; margin-bottom: 20px;">New Immigration Evaluation Request</h2>
              <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p style="margin: 5px 0;"><strong>Preferred Destination:</strong> ${country}</p>
                <p style="margin: 5px 0;"><strong>Immigration Goal:</strong> ${projectType}</p>
              </div>
              <p style="color: #718096; font-size: 12px; margin-top: 30px;">
                This evaluation request was submitted via the Travel Agency website.
              </p>
            </div>
          `,
        });

        // Send confirmation email to the user
        await resend.emails.send({
          from: "Travel Agency <noreply@travelagency.com>",
          to: email,
          subject: "Immigration Evaluation Received",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a365d;">Evaluation Request Received!</h1>
              <p style="color: #4a5568;">Dear ${fullName},</p>
              <p style="color: #4a5568;">Thank you for submitting your immigration evaluation request for ${projectType} to ${country}.</p>
              <p style="color: #4a5568;">Our immigration experts will review your information and contact you within 24 business hours to discuss your options and next steps.</p>
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
      { success: true, message: "Evaluation submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Evaluation form error:", error);
    return NextResponse.json(
      { error: "Failed to submit evaluation" },
      { status: 500 }
    );
  }
}