import fs from "fs/promises";
import path from "path";

import {
  cosineSimilarity,
  DEFAULT_EMBED_MODEL,
  embedText,
} from "@/lib/rag/embeddings";
import { keywordBoostForChunk } from "@/lib/rag/brandSearch";
import { loadCarDocumentChunks } from "@/lib/rag/documents";
import { isAssistantMetaQuestion, isBulgarianQuery } from "@/lib/rag/query";
import type { RagIndex, RagSearchResult } from "@/lib/rag/types";

const INDEX_DIR = path.join(process.cwd(), ".rag");
const INDEX_PATH = path.join(INDEX_DIR, "index.json");
const TOP_K = 5;
const MIN_SCORE = 0.38;

const SOURCE_PRIORITY: Record<string, number> = {
  "brand-kb": 4,
  "vault-db": 3,
  showroom: 2,
  "vault-seed": 1,
};

let cachedIndex: RagIndex | null = null;

async function ensureIndexDir(): Promise<void> {
  await fs.mkdir(INDEX_DIR, { recursive: true });
}

export async function getIndexStatus(): Promise<{
  ready: boolean;
  builtAt: string | null;
  chunkCount: number;
  embeddingModel: string;
  indexPath: string;
}> {
  const index = await loadIndex();
  return {
    ready: Boolean(index),
    builtAt: index?.builtAt ?? null,
    chunkCount: index?.chunkCount ?? 0,
    embeddingModel: index?.embeddingModel ?? DEFAULT_EMBED_MODEL,
    indexPath: INDEX_PATH,
  };
}

async function loadIndexFromDisk(): Promise<RagIndex | null> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    const parsed = JSON.parse(raw) as RagIndex;
    if (parsed.version !== 1 || !Array.isArray(parsed.chunks)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function loadIndex(): Promise<RagIndex | null> {
  if (cachedIndex) return cachedIndex;
  cachedIndex = await loadIndexFromDisk();
  return cachedIndex;
}

export async function buildRagIndex(
  embeddingModel = DEFAULT_EMBED_MODEL,
): Promise<RagIndex> {
  await ensureIndexDir();

  const documents = await loadCarDocumentChunks();
  if (documents.length === 0) {
    throw new Error("No car documents found to index");
  }

  const chunks = [];
  for (const doc of documents) {
    const embedding = await embedText(doc.text, embeddingModel);
    chunks.push({ ...doc, embedding });
  }

  const index: RagIndex = {
    version: 1,
    embeddingModel,
    builtAt: new Date().toISOString(),
    chunkCount: chunks.length,
    chunks,
  };

  await fs.writeFile(INDEX_PATH, JSON.stringify(index), "utf8");
  cachedIndex = index;
  return index;
}

export async function ensureRagIndex(): Promise<RagIndex> {
  const existing = await loadIndex();
  if (existing) return existing;
  return buildRagIndex();
}

export async function searchCarDocuments(
  query: string,
  topK = TOP_K,
): Promise<RagSearchResult[]> {
  const index = await ensureRagIndex();
  const queryEmbedding = await embedText(query, index.embeddingModel);

  const scored = index.chunks
    .map((chunk) => ({
      chunk: {
        id: chunk.id,
        text: chunk.text,
        source: chunk.source,
        carName: chunk.carName,
        field: chunk.field,
        year: chunk.year,
        make: chunk.make,
      },
      score:
        cosineSimilarity(queryEmbedding, chunk.embedding) +
        keywordBoostForChunk(query, {
          id: chunk.id,
          text: chunk.text,
          source: chunk.source,
          carName: chunk.carName,
          field: chunk.field,
          year: chunk.year,
          make: chunk.make,
        }),
    }))
    .filter((item) => item.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  const deduped: RagSearchResult[] = [];
  const seen = new Set<string>();

  for (const item of scored) {
    const key = `${item.chunk.carName}|${item.chunk.field}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
    if (deduped.length >= topK) break;
  }

  deduped.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      (SOURCE_PRIORITY[b.chunk.source] ?? 0) -
      (SOURCE_PRIORITY[a.chunk.source] ?? 0)
    );
  });

  return deduped;
}

export function shouldSkipRag(query: string): boolean {
  return isAssistantMetaQuestion(query);
}

export function formatContextForPrompt(results: RagSearchResult[]): string {
  if (results.length === 0) {
    return "Няма намерени релевантни документи в базата данни за този въпрос.";
  }

  return results
    .map((result, index) => {
      const meta = [
        result.chunk.carName,
        result.chunk.year ? String(result.chunk.year) : null,
        result.chunk.field,
      ]
        .filter(Boolean)
        .join(" · ");

      return `[Документ ${index + 1}: ${meta}]\n${result.chunk.text}`;
    })
    .join("\n\n---\n\n");
}

export const RAG_SYSTEM_PROMPT = `Ти си автомобилен асистент на Classic Car Center.
Помагаш САМО с теми за коли и автомобили.

БЪЛГАРСКИ ЕЗИК (задължително при български въпрос):
- Пиши на СТАНДАРТЕН български, не на руски и не на машинен превод.
- НЕ използвай: „Здравствуйте“, „Вы“, „майсторство“ в смисъл на skill, „дайте мен“.
- Използвай: „Здравейте“, „можете“, „помогна“, „поддръжка“, „характеристики“.
- Изреченията трябва да звучат естествено на български.
- Терминология: шаси, двигател, каросерия, оригиналност, пробег, реставрация.

Език:
- Български въпрос → отговор на български.
- Английски въпрос → отговор на английски.

Контекст от документи:
- При автомобилни въпроси получаваш КОНТЕКСТ от базата данни (марки, модели, Vault, шоурум).
- Отговаряй ПРЕДИМНО на база контекста.
- При въпроси за марка (напр. Škoda, BMW) използвай секциите за ранна история и класическа ера.
- Ако няма достатъчно данни — кажи честно, не измисляй.
- При възможност споменавай конкретната марка или модел от контекста.

Ограничения:
- Off-topic въпроси → кратък отказ и покана за автомобилен въпрос.`;

export const META_SYSTEM_PROMPT = `${RAG_SYSTEM_PROMPT}

Въпросът е за теб самия (език, възможности, как работиш).
- НЕ цитирай документи за коли.
- Обясни кратко и ясно на български:
  1) отговаряш на български или английски според езика на въпроса;
  2) при въпроси за коли първо търсиш в базата данни на Classic Car Center (Vault и шоурум);
  3) помагаш с класически автомобили, характеристики, история, колекционерство.
- Дай 2–4 изречения, без излишна лирика.`;

export function resolveSystemPrompt(query: string, useRag: boolean): string {
  if (!useRag && isAssistantMetaQuestion(query)) return META_SYSTEM_PROMPT;
  if (isBulgarianQuery(query)) {
    return `${RAG_SYSTEM_PROMPT}\n\nПотребителят пише на български — отговори изцяло на български.`;
  }
  return RAG_SYSTEM_PROMPT;
}

export function buildRagUserMessage(
  prompt: string,
  context: string,
): string {
  return `КОНТЕКСТ ОТ БАЗАТА ДАННИ (Classic Car Center):

${context}

---

ВЪПРОС НА ПОТРЕБИТЕЛЯ:
${prompt.trim()}`;
}
