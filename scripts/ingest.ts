import { getBlogPosts, getCountriesContent, getServices } from "@/lib/sanity";
import { getEmbedding } from "@/lib/ai/embeddings";
import { upsertVectors } from "@/lib/ai/vectorStore";
import { initSentry, captureException } from "@/lib/sentry";

initSentry();

async function run() {
  console.log("Starting ingestion...");

  const records: any[] = [];

  const posts = await getBlogPosts(500);
  for (const p of posts || []) {
    const text = `${p.title}\n${p.excerpt || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `blog:${p._id}`, text, embedding: emb, metadata: { type: "blog", id: p._id } });
  }

  const countries = await getCountriesContent();
  for (const c of countries || []) {
    const text = `${c.name}\n${c.description || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `country:${c._id}`, text, embedding: emb, metadata: { type: "country", id: c._id } });
  }

  const services = await getServices();
  for (const s of services || []) {
    const text = `${s.title}\n${s.summary || s.description || ""}`;
    const emb = await getEmbedding(text);
    records.push({ id: `service:${s._id}`, text, embedding: emb, metadata: { type: "service", id: s._id } });
  }

  console.log(`Generated ${records.length} vectors, upserting to store...`);
  await upsertVectors(records);
  console.log("Ingestion complete.");
}

run().catch((e) => {
  console.error(e);
  try { captureException(e); } catch (_) {}
  process.exit(1);
});
