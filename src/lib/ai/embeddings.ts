const OPENAI_EMBED_MODEL = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";

export async function getEmbedding(text: string): Promise<number[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured");

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: OPENAI_EMBED_MODEL, input: text }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI embedding error: ${res.status} ${body}`);
  }

  const data = await res.json();
  return data.data[0].embedding as number[];
}
