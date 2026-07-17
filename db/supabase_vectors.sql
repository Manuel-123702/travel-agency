-- Run this on your Supabase/Postgres database to enable pgvector and create the vectors table.
-- Adjust embedding dimension to match your embedding model (e.g., 1536).

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS vectors (
  id text PRIMARY KEY,
  text text,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Optional helper RPC to find nearest vectors by cosine similarity (uses <-> operator)
CREATE OR REPLACE FUNCTION match_vectors(query_embedding vector, match_count int)
RETURNS TABLE(id text, text text, metadata jsonb, score float) AS $$
BEGIN
  RETURN QUERY
  SELECT id, text, metadata, 1 - (embedding <#> query_embedding) as score
  FROM vectors
  ORDER BY embedding <-> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Index for faster nearest neighbor search
CREATE INDEX IF NOT EXISTS idx_vectors_embedding ON vectors USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Note: adjust vector dimension (1536) to your embedding model's output size.
