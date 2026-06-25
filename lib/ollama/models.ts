const EMBED_MODEL_PATTERNS = [
  /embed/i,
  /nomic-embed/i,
  /mxbai-embed/i,
  /all-minilm/i,
  /snowflake-arctic-embed/i,
  /\bbge-/i,
];

const PREFERRED_CHAT_MODELS = [
  "qwen2.5:7b",
  "llama3.2",
  "llama3.1",
  "mistral",
  "gemma2",
  "phi3",
];

export function isEmbeddingModel(name: string): boolean {
  return EMBED_MODEL_PATTERNS.some((pattern) => pattern.test(name));
}

export function filterChatModels(names: string[]): string[] {
  return names.filter((name) => !isEmbeddingModel(name));
}

export function filterEmbeddingModels(names: string[]): string[] {
  return names.filter((name) => isEmbeddingModel(name));
}

export function pickDefaultChatModel(names: string[]): string {
  const chatModels = filterChatModels(names);
  if (chatModels.length === 0) return "";

  for (const preferred of PREFERRED_CHAT_MODELS) {
    const match = chatModels.find(
      (name) =>
        name === preferred ||
        name.startsWith(`${preferred}:`) ||
        name.startsWith(preferred),
    );
    if (match) return match;
  }

  const nonCoder = chatModels.find((name) => !/coder/i.test(name));
  return nonCoder ?? chatModels[0];
}
