import React from "react";

export default function AppointmentConfirmation({
  name,
  title,
  scheduledAt,
}: {
  name?: string;
  title: string;
  scheduledAt: string;
}) {
  return (
    <html>
      <body style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          <h1 style={{ color: "#b45309" }}>Appointment Confirmed</h1>
          <p>
            Hi {name || "there"},
          </p>
          <p>
            Your appointment <strong>{title}</strong> is confirmed for <strong>{scheduledAt}</strong>.
          </p>
          <p>
            We look forward to speaking with you.
          </p>
          <hr />
          <p style={{ fontSize: 12, color: "#6b7280" }}>Travel Agency • Delivering immigration success</p>
        </div>
      </body>
    </html>
  );
}
