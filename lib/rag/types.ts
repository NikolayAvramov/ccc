export type RagSource = "vault-seed" | "vault-db" | "showroom" | "brand-kb";

export type RagDocumentChunk = {
  id: string;
  text: string;
  source: RagSource;
  carName: string;
  field: string;
  year?: number;
  make?: string;
};

export type RagIndexedChunk = RagDocumentChunk & {
  embedding: number[];
};

export type RagIndex = {
  version: 1;
  embeddingModel: string;
  builtAt: string;
  chunkCount: number;
  chunks: RagIndexedChunk[];
};

export type RagSearchResult = {
  chunk: RagDocumentChunk;
  score: number;
};
