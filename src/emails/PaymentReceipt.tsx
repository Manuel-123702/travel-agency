import React from "react";

export default function PaymentReceipt({
  name,
  amount,
  currency,
}: {
  name?: string;
  amount: number;
  currency?: string;
}) {
  return (
    <html>
      <body style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          <h1 style={{ color: "#b45309" }}>Payment Received</h1>
          <p>Hi {name || "there"},</p>
          <p>
            We received your payment of <strong>{amount} {currency || "USD"}</strong>. Thank you for your trust.
          </p>
          <p>If you need a receipt or invoice, check your dashboard.</p>
          <hr />
          <p style={{ fontSize: 12, color: "#6b7280" }}>Travel Agency • Delivering immigration success</p>
        </div>
      </body>
    </html>
  );
}
