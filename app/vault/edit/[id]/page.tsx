import ClassicCarArticleForm from "@/app/components/ClassicCarArticleForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditVaultCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.classicCarArticle.findUnique({ where: { id } });

  if (!article) {
    notFound();
  }

  return (
    <ClassicCarArticleForm
      mode="edit"
      articleId={article.id}
      initialData={{
        name: article.name,
        year: String(article.year),
        country: article.country,
        make: article.make,
        era: article.era,
        type: article.type,
        produced: String(article.produced),
        engine: article.engine,
        horsepower: String(article.horsepower),
        topSpeed: String(article.topSpeed),
        price: article.price,
        rarity: article.rarity,
        image: article.image,
        images: ((article.images as string[]) ?? [article.image]).filter(Boolean),
        description: article.description,
        fullHistory: article.fullHistory,
        highlights: ((article.highlights as string[]) ?? []).join("\n"),
        designer: article.designer,
        weight: article.weight,
        raceHistory: article.raceHistory,
        collectorsInfo: article.collectorsInfo,
      }}
    />
  );
}
