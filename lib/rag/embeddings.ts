const OLLAMA_BASE = process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434";
export const DEFAULT_EMBED_MODEL =
  process.env.OLLAMA_EMBED_MODEL ?? "nomic-embed-text";

export async function embedText(
  text: string,
  model = DEFAULT_EMBED_MODEL,
): Promise<number[]> {
  const res = await fetch(`${OLLAMA_BASE}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt: text }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Ollama embeddings failed (${res.status}): ${await res.text()}`,
    );
  }

  const data = (await res.json()) as { embedding?: number[] };
  if (!Array.isArray(data.embedding) || data.embedding.length === 0) {
    throw new Error("Ollama returned an empty embedding");
  }

  return data.embedding;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
