import { BRAND_ALIAS_MAP } from "@/lib/rag/brandKnowledge";
import type { RagDocumentChunk } from "@/lib/rag/types";

const EARLY_HISTORY_HINTS =
  /начал|ранн|основ|първ|произвежда|произвеждат|истори|found|early|beginning/i;

export function detectBrandInQuery(query: string): string | null {
  const normalized = query.toLowerCase();

  const tokens = normalized
    .split(/[\s,.;:!?()\-–—]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  for (const token of tokens) {
    const make = BRAND_ALIAS_MAP[token];
    if (make) return make;
  }

  const sortedAliases = Object.entries(BRAND_ALIAS_MAP).sort(
    (a, b) => b[0].length - a[0].length,
  );

  for (const [alias, make] of sortedAliases) {
    if (alias.length >= 3 && normalized.includes(alias)) {
      return make;
    }
  }

  return null;
}

export function keywordBoostForChunk(
  query: string,
  chunk: RagDocumentChunk,
): number {
  let boost = 0;
  const detectedMake = detectBrandInQuery(query);

  if (detectedMake && chunk.make?.toLowerCase() === detectedMake.toLowerCase()) {
    boost += 0.18;

    if (chunk.field === "early-history" && EARLY_HISTORY_HINTS.test(query)) {
      boost += 0.12;
    }

    if (chunk.field === "overview") {
      boost += 0.04;
    }

    if (chunk.field === "classic-era") {
      boost += 0.03;
    }
  }

  if (
    chunk.source === "brand-kb" &&
    EARLY_HISTORY_HINTS.test(query) &&
    chunk.field === "early-history"
  ) {
    boost += 0.05;
  }

  return boost;
}
