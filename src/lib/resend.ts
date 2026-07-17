import Resend from "resend";
import React from "react";
import ReactDOMServer from "react-dom/server";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendEmail(opts: { to: string; subject: string; html: string; from?: string }) {
  const from = opts.from || process.env.RESEND_FROM_EMAIL || "no-reply@travelagency.com";
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping email send for:", opts.subject);
    return null;
  }

  try {
    const res = await resend.emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return res;
  } catch (err) {
    console.error("Failed to send email via Resend", err);
    throw err;
  }
}

type TemplateName = "appointment" | "payment";

export async function sendTemplatedEmail(name: TemplateName, to: string, props: any, subject?: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, skipping templated email send: ", name);
    return null;
  }

  let Component: React.FC<any> | null = null;
  if (name === "appointment") {
    Component = (await import("@/emails/AppointmentConfirmation")).default;
  }
  if (name === "payment") {
    Component = (await import("@/emails/PaymentReceipt")).default;
  }

  if (!Component) throw new Error("Unknown email template");

  const element = React.createElement(Component, props);
  const html = ReactDOMServer.renderToStaticMarkup(element);

  return sendEmail({ to, subject: subject || "Notification", html });
}
