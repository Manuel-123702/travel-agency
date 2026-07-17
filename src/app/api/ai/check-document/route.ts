import { NextResponse } from "next/server";
import { captureException } from "@/lib/sentry";
import { requireAdmin } from "@/lib/auth";
import { incAiDocumentCheck } from "@/lib/metrics";

export async function POST(req: Request) {
  // Reject large requests early
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 20000) {
    return NextResponse.json({ error: "Request payload too large" }, { status: 413 });
  }

  await requireAdmin();
  incAiDocumentCheck();
  const body = await req.json();
  const { fileName, fileSize, mimeType, fileUrl } = body;
  if (!fileName || !mimeType) return NextResponse.json({ error: "Missing file info" }, { status: 400 });

  // Rate limit by IP
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const { rateLimit } = await import("@/lib/rateLimiter");
    const rl = await rateLimit(`rl:doc:${ip}`, 50, 60 * 60); // 50 document checks per hour
    const headers = {
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
    };
    if (!rl.ok) {
      const now = Math.floor(Date.now() / 1000);
      const retryAfter = Math.max(0, rl.resetAt - now);
      (headers as any)["Retry-After"] = String(retryAfter);
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429, headers });
    }
  } catch (e) {
    // ignore rate limiter failures
    console.error("Rate limiter error", e);
    try { captureException(e); } catch (_) {}
  }

  const issues: string[] = [];
  if (fileSize && fileSize > 10 * 1024 * 1024) issues.push("File is larger than 10MB");
  const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(mimeType)) issues.push("Unsupported file type");

  // rudimentary image check based on extension
  if (mimeType.startsWith("image/")) {
    // we could call a vision/ocr API here; scaffolded for now
    // placeholder: warn about low resolution if filename contains "scan"
    if (fileName.toLowerCase().includes("scan")) issues.push("File looks like a scan; ensure it's high-res and legible");
  }

  return NextResponse.json({ ok: issues.length === 0, issues });
}
