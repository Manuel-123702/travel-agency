import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

type VectorRecord = {
  id: string;
  text: string;
  embedding: number[];
  metadata?: any;
};

const DATA_PATH = path.resolve(process.cwd(), "vectors.json");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_MATCH_FUNCTION = process.env.SUPABASE_MATCH_FUNCTION || null; // optional RPC function name

let supabase: ReturnType<typeof createClient> | null = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
}

function loadStore(): VectorRecord[] {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as VectorRecord[];
  } catch (e) {
    return [];
  }
}

function saveStore(items: VectorRecord[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2));
}

export async function upsertVectors(records: VectorRecord[]) {
  // If Supabase is configured, upsert into vectors table (expects columns: id, text, embedding, metadata)
  if (supabase) {
    // upsert via supabase
    const rows = records.map((r) => ({ id: r.id, text: r.text, embedding: r.embedding, metadata: r.metadata }));
    const { data, error } = await supabase.from("vectors").upsert(rows, { onConflict: "id" });
    if (error) {
      console.error("Supabase upsert error:", error);
      // Hard fail when Supabase is configured to avoid silent fallback
      throw new Error("Failed to upsert vector to Supabase: " + error.message);
    } else {
      return;
    }
  }

  // Fallback: file-backed store
  const store = loadStore();
  const byId = new Map(store.map((r) => [r.id, r]));
  for (const r of records) {
    byId.set(r.id, r);
  }
  const merged = Array.from(byId.values());
  saveStore(merged);
}

function cosine(a: number[], b: number[]) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-12);
}

export async function queryVectors(embedding: number[], topK = 5) {
  // If Supabase + pgvector with a match function is available, prefer server-side similarity
  if (supabase && SUPABASE_MATCH_FUNCTION) {
    try {
      // call RPC function: expects (query_embedding float8[], match_count int)
      const resp = await supabase.rpc(SUPABASE_MATCH_FUNCTION, { query_embedding: embedding, match_count: topK });
      // rpc may return rows with id, text, metadata, score
      // @ts-ignore
      const data = resp.data || [];
      return (data as any[]).map((row) => ({ id: row.id, text: row.text, metadata: row.metadata, score: row.score }));
    } catch (e) {
      console.error("Supabase RPC error", e);
      // fallthrough to client-side
    }
  }

  // Fallback: load all and compute cosine locally (inefficient)
  const store = loadStore();
  const scored = store.map((r) => ({ r, score: cosine(embedding, r.embedding) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => ({ id: s.r.id, text: s.r.text, metadata: s.r.metadata, score: s.score }));
}
