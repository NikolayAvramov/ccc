import { carMakesAndModels } from "@/app/add-car/carData";
import { BRAND_KNOWLEDGE } from "@/lib/rag/brandKnowledge";
import type { RagDocumentChunk } from "@/lib/rag/types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveModelsForMake(
  make: string,
  fallbackModels: string[] = [],
): string[] {
  const entry = Object.entries(carMakesAndModels).find(
    ([key]) => key.toLowerCase() === make.toLowerCase(),
  );
  if (entry) {
    return entry[1].filter((model) => typeof model === "string" && model.trim());
  }
  return fallbackModels;
}

export function loadBrandKnowledgeChunks(): RagDocumentChunk[] {
  const chunks: RagDocumentChunk[] = [];

  for (const brand of BRAND_KNOWLEDGE) {
    const prefix = `brand-${slugify(brand.make)}`;
    const models = resolveModelsForMake(brand.make, brand.models ?? []);

    chunks.push({
      id: `${prefix}-overview`,
      text: [
        `Марка: ${brand.make}`,
        `Държава: ${brand.country}`,
        `Основана: ${brand.founded}`,
        `Алтернативни имена: ${brand.aliases.join(", ")}`,
        brand.heritage,
      ].join("\n"),
      source: "brand-kb",
      carName: brand.make,
      field: "overview",
      make: brand.make,
    });

    chunks.push({
      id: `${prefix}-early-history`,
      text: [
        `${brand.make} — какво произвеждаше в началото и ранна история:`,
        brand.earlyHistory,
      ].join("\n"),
      source: "brand-kb",
      carName: brand.make,
      field: "early-history",
      make: brand.make,
    });

    chunks.push({
      id: `${prefix}-classic-era`,
      text: [
        `${brand.make} — класическа ера и важни модели:`,
        brand.classicEra,
      ].join("\n"),
      source: "brand-kb",
      carName: brand.make,
      field: "classic-era",
      make: brand.make,
    });

    if (models.length > 0) {
      const modelLines = models.slice(0, 80).join(", ");
      chunks.push({
        id: `${prefix}-models`,
        text: [
          `${brand.make} — известни модели и серии (списък):`,
          modelLines,
          models.length > 80
            ? `… и още ${models.length - 80} модела в каталога на Classic Car Center.`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        source: "brand-kb",
        carName: brand.make,
        field: "models",
        make: brand.make,
      });
    }
  }

  return chunks;
}
