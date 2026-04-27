import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CLASSIC_CARS_SEED } from "@/lib/classicCarsSeed";

const prisma = new PrismaClient();

function horsepowerToNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

async function isVaultAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    return user?.email === "test@w.bg";
  } catch {
    return false;
  }
}

export async function POST() {
  try {
    const allowed = await isVaultAdmin();
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let inserted = 0;
    let skipped = 0;

    for (const car of CLASSIC_CARS_SEED) {
      const existing = await prisma.classicCarArticle.findFirst({
        where: { name: car.name, year: car.year },
      });

      if (existing) {
        skipped += 1;
        continue;
      }

      await prisma.classicCarArticle.create({
        data: {
          name: car.name,
          year: car.year,
          country: car.country,
          make: car.make,
          era: car.era,
          type: car.type,
          produced: car.produced,
          engine: car.engine,
          horsepower: horsepowerToNumber(car.horsepower) as unknown as never,
          topSpeed: car.topSpeed,
          price: car.price,
          rarity: car.rarity,
          image: car.image,
          images: [car.image],
          description: car.description,
          fullHistory: car.fullHistory,
          highlights: car.highlights,
          designer: car.designer,
          weight: car.weight,
          raceHistory: car.raceHistory,
          collectorsInfo: car.collectorsInfo,
        },
      });
      inserted += 1;
    }

    return NextResponse.json({ success: true, inserted, skipped });
  } catch (error) {
    console.error("MIGRATE LOCAL VAULT DATA ERROR:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
