import { CLASSIC_CARS_SEED } from "@/lib/classicCarsSeed";
import { loadBrandKnowledgeChunks } from "@/lib/rag/brandChunks";
import { prisma } from "@/lib/prisma";
import type { RagDocumentChunk } from "@/lib/rag/types";

type ArticleLike = {
  name: string;
  year: number;
  country: string;
  make: string;
  era: string;
  type: string;
  produced: number;
  engine: string;
  horsepower: string;
  topSpeed: number;
  price: string;
  rarity: string;
  designer: string;
  weight: string;
  description: string;
  fullHistory: string;
  highlights: string[] | unknown;
  raceHistory: string;
  collectorsInfo: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function articleToChunks(
  article: ArticleLike,
  source: "vault-seed" | "vault-db",
  idPrefix: string,
): RagDocumentChunk[] {
  const highlights = Array.isArray(article.highlights)
    ? article.highlights.filter((item): item is string => typeof item === "string")
    : [];

  const specs = [
    `Модел: ${article.name} (${article.year})`,
    `Марка: ${article.make}`,
    `Държава: ${article.country}`,
    `Ера: ${article.era}`,
    `Тип: ${article.type}`,
    `Произведени: ${article.produced}`,
    `Двигател: ${article.engine}`,
    `Мощност: ${article.horsepower} к.с.`,
    `Макс. скорост: ${article.topSpeed} км/ч`,
    `Цена (ориентир): ${article.price}`,
    `Рядкост: ${article.rarity}`,
    `Дизайнер: ${article.designer}`,
    `Тегло: ${article.weight}`,
  ].join("\n");

  const chunks: RagDocumentChunk[] = [
    {
      id: `${idPrefix}-specs`,
      text: `${article.name} (${article.year}) — технически профил:\n${specs}`,
      source,
      carName: article.name,
      field: "specs",
      year: article.year,
      make: article.make,
    },
    {
      id: `${idPrefix}-description`,
      text: `${article.name}: ${article.description}`,
      source,
      carName: article.name,
      field: "description",
      year: article.year,
      make: article.make,
    },
    {
      id: `${idPrefix}-history`,
      text: `${article.name} — история:\n${article.fullHistory}`,
      source,
      carName: article.name,
      field: "fullHistory",
      year: article.year,
      make: article.make,
    },
    {
      id: `${idPrefix}-race`,
      text: `${article.name} — състезателна история:\n${article.raceHistory}`,
      source,
      carName: article.name,
      field: "raceHistory",
      year: article.year,
      make: article.make,
    },
    {
      id: `${idPrefix}-collectors`,
      text: `${article.name} — информация за колекционери:\n${article.collectorsInfo}`,
      source,
      carName: article.name,
      field: "collectorsInfo",
      year: article.year,
      make: article.make,
    },
  ];

  if (highlights.length > 0) {
    chunks.push({
      id: `${idPrefix}-highlights`,
      text: `${article.name} — ключови акценти:\n${highlights.map((h) => `• ${h}`).join("\n")}`,
      source,
      carName: article.name,
      field: "highlights",
      year: article.year,
      make: article.make,
    });
  }

  return chunks;
}

function articleKey(name: string, year: number): string {
  return `${name.trim().toLowerCase()}|${year}`;
}

export async function loadCarDocumentChunks(): Promise<RagDocumentChunk[]> {
  const chunks: RagDocumentChunk[] = [];
  const dbArticleKeys = new Set<string>();

  try {
    const vaultArticles = await prisma.classicCarArticle.findMany({
      orderBy: { updatedAt: "desc" },
    });

    for (const article of vaultArticles) {
      dbArticleKeys.add(articleKey(article.name, article.year));
      const highlights = Array.isArray(article.highlights)
        ? (article.highlights as string[])
        : [];

      chunks.push(
        ...articleToChunks(
          { ...article, highlights },
          "vault-db",
          `vault-${article.id}`,
        ),
      );
    }
  } catch {
    // ClassicCarArticle table may not exist yet in some environments.
  }

  for (const article of CLASSIC_CARS_SEED) {
    if (dbArticleKeys.has(articleKey(article.name, article.year))) continue;

    chunks.push(
      ...articleToChunks(
        article,
        "vault-seed",
        `seed-${article.id}-${slugify(article.name)}`,
      ),
    );
  }

  try {
    const listings = await prisma.car.findMany({
      orderBy: { createdAt: "desc" },
    });

    for (const car of listings) {
      if (!car.description?.trim()) continue;

      chunks.push({
        id: `showroom-${car.id}`,
        text: [
          `Обява в шоурума: ${car.make} ${car.model} (${car.year})`,
          `Тип: ${car.type}`,
          `Цена: ${car.price}`,
          `Пробег: ${car.mileage}`,
          `Локация: ${car.location}`,
          `Описание: ${car.description}`,
        ].join("\n"),
        source: "showroom",
        carName: `${car.make} ${car.model}`,
        field: "listing",
        make: car.make,
      });
    }
  } catch {
    // Car table unavailable — seed data still works.
  }

  chunks.push(...loadBrandKnowledgeChunks());

  return chunks;
}
