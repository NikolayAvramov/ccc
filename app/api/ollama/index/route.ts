import { NextResponse } from "next/server";

import { buildRagIndex, getIndexStatus } from "@/lib/rag/index";

export async function GET() {
  try {
    const status = await getIndexStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to read RAG index status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const index = await buildRagIndex();
    return NextResponse.json({
      ok: true,
      builtAt: index.builtAt,
      chunkCount: index.chunkCount,
      embeddingModel: index.embeddingModel,
      message:
        "Индексът е готов. Асистентът вече търси в документите преди отговор.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to build RAG index",
        details: message,
        hint: "Увери се, че Ollama работи и изпълни: ollama pull nomic-embed-text",
      },
      { status: 502 },
    );
  }
}
