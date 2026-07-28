import { NextResponse } from "next/server";
import { getEmbedding } from "@/lib/ai/embeddings";
import { upsertVectors } from "@/lib/ai/vectorStore";
import { getBlogPosts, getCountriesContent, getServices } from "@/lib/sanity";
import { requireAdmin } from "@/lib/auth";
import { incAiIngestRequest } from "@/lib/metrics";

interface VectorRecord {
  id: string;
  text: string;
  embedding: number[];
  metadata?: Record<string, unknown>;
}

// Ingest content from Sanity into the vector store: blog posts, countries, services
export async function POST() {
  await requireAdmin();
  incAiIngestRequest();

  const records: VectorRecord[] = [];

  // Blog posts
  const posts = await getBlogPosts(100);
  for (const p of posts || []) {
    const text = `${p.title}\n${p.excerpt || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `blog:${p._id}`, text, embedding: emb, metadata: { type: "blog", id: p._id } });
  }

  // Countries
  const countries = await getCountriesContent();
  for (const c of countries || []) {
    const text = `${c.name}\n${c.description || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `country:${c._id}`, text, embedding: emb, metadata: { type: "country", id: c._id } });
  }

  // Services
  const services = await getServices();
  for (const s of services || []) {
    const text = `${s.title}\n${s.summary || s.description || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `service:${s._id}`, text, embedding: emb, metadata: { type: "service", id: s._id } });
  }

  await upsertVectors(records);
  return NextResponse.json({ ingested: records.length });
}
