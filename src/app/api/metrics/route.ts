import { NextResponse } from "next/server";
import { getMetrics, metricsContentType } from "@/lib/metrics";
import { captureException } from "@/lib/sentry";

export async function GET() {
  try {
    const metrics = await getMetrics();
    return new Response(metrics, {
      status: 200,
      headers: {
        "Content-Type": metricsContentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Failed to collect metrics", e);
    try { await captureException(e); } catch (_) {}
    return NextResponse.json({ error: "Failed to collect metrics" }, { status: 500 });
  }
}
