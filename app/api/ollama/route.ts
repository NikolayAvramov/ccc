import { NextResponse } from "next/server";

import {
  filterChatModels,
  filterEmbeddingModels,
  isEmbeddingModel,
  pickDefaultChatModel,
} from "@/lib/ollama/models";
import {
  buildRagUserMessage,
  formatContextForPrompt,
  resolveSystemPrompt,
  searchCarDocuments,
  shouldSkipRag,
} from "@/lib/rag/index";

const OLLAMA_BASE = process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434";

export async function GET() {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Ollama returned an error", details: await res.text() },
        { status: 502 },
      );
    }
    const data = await res.json();
    const allModels =
      (data.models as Array<{ name: string }> | undefined)?.map((m) => m.name) ??
      [];
    const chatModels = filterChatModels(allModels);
    const embedModels = filterEmbeddingModels(allModels);

    return NextResponse.json({
      ...data,
      chatModels,
      embedModels,
      defaultChatModel: pickDefaultChatModel(allModels),
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Cannot connect to Ollama. Start it locally (default: http://127.0.0.1:11434).",
      },
      { status: 503 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, prompt, stream = false } = body as {
      model?: string;
      prompt?: string;
      stream?: boolean;
    };

    if (!model?.trim() || !prompt?.trim()) {
      return NextResponse.json(
        { error: "model and prompt are required" },
        { status: 400 },
      );
    }

    if (isEmbeddingModel(model.trim())) {
      return NextResponse.json(
        {
          error:
            "nomic-embed-text е модел за документи (embeddings), не за чат.",
          hint: "Избери chat модел: qwen2.5:7b, llama3.2 или qwen2.5-coder:7b. Инсталирай с: ollama pull qwen2.5:7b",
        },
        { status: 400 },
      );
    }

    let userMessage = prompt.trim();
    const skipRag = shouldSkipRag(prompt.trim());

    try {
      if (!skipRag) {
        const results = await searchCarDocuments(prompt.trim());
        const context = formatContextForPrompt(results);
        userMessage = buildRagUserMessage(prompt.trim(), context);
      }
    } catch (ragError) {
      const message =
        ragError instanceof Error ? ragError.message : "RAG search failed";
      return NextResponse.json(
        {
          error: "Document search failed",
          details: message,
          hint: "Run: ollama pull nomic-embed-text, then POST /api/ollama/index to build the index.",
        },
        { status: 502 },
      );
    }

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model.trim(),
        stream: Boolean(stream),
        messages: [
          {
            role: "system",
            content: resolveSystemPrompt(prompt.trim(), !skipRag),
          },
          { role: "user", content: userMessage },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const details = await res.text();
      const hint = isEmbeddingModel(model.trim())
        ? "nomic-embed-text не поддържа чат. Избери друг модел."
        : "Провери дали моделът е инсталиран: ollama list";

      return NextResponse.json(
        { error: "Ollama chat failed", details, hint },
        { status: 502 },
      );
    }

    const data = await res.json();
    const content =
      typeof data.message?.content === "string"
        ? data.message.content
        : typeof data.response === "string"
          ? data.response
          : "";

    return NextResponse.json({
      ...data,
      response: content,
    });
  } catch {
    return NextResponse.json(
      { error: "Cannot connect to Ollama" },
      { status: 503 },
    );
  }
}
