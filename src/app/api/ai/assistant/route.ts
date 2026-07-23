import { NextResponse } from "next/server";
import { getEmbedding } from "@/lib/ai/embeddings";
import { queryVectors } from "@/lib/ai/vectorStore";
import { requireAdmin } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimiter";
import { auth } from "@clerk/nextjs/server";
import { captureException } from "@/lib/sentry";
import { incAiAssistantRequest } from "@/lib/metrics";

export async function POST(req: Request) {
  await requireAdmin();

  const body = await req.json();
  const question = body.question;
  if (!question) return NextResponse.json({ error: "Missing question" }, { status: 400 });

  // Basic input validation and size limits
  if (typeof question !== "string" || question.length > 3000) {
    return NextResponse.json({ error: "Question too long (max 3000 characters)" }, { status: 400 });
  }

  // Rate limit per-user or per-IP
  const authObj = await auth();
  const userId = authObj.userId;
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const key = userId ? `rl:user:${userId}` : `rl:ip:${ip}`;
  const rl = await rateLimit(key, 20, 60 * 60); // 20 requests per hour
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(rl.limit),
    "X-RateLimit-Remaining": String(rl.remaining),
    "X-RateLimit-Reset": String(rl.resetAt),
  };
  if (!rl.ok) {
    const now = Math.floor(Date.now() / 1000);
    const retryAfter = Math.max(0, rl.resetAt - now);
    headers["Retry-After"] = String(retryAfter);
    return NextResponse.json({ error: "Rate limit exceeded", retry_after: rl.resetAt }, { status: 429, headers });
  }

  incAiAssistantRequest();

  // get embedding for the question
  try {
    const qEmb = await getEmbedding(question);
    const hits = await queryVectors(qEmb, 5);

    // build context from hits
    const contextText = hits.map((h: any) => `- ${h.text}`).join("\n");

    // Simple prompt: combine context and question and call an LLM
    const prompt = `You are an assistant for Travel Agency. Use the following context to answer the question. Context:\n${contextText}\nQuestion: ${question}`;

    // Call OpenAI ChatCompletion if available
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json({ answer: "OPENAI_API_KEY not configured. Context hits:", hits }, { headers });
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini", messages: [{ role: "user", content: prompt }], max_tokens: 600 }),
    });
    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ answer, hits }, { headers });
  } catch (e: any) {
    try { captureException(e); } catch (_) {}
    return NextResponse.json({ error: e.message }, { status: 500, headers });
  }
}
