import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type Payload = {
  name: string;
  year: number;
  country: string;
  make: string;
  era: string;
  type: string;
  produced: number;
  engine: string;
  horsepower: number;
  topSpeed: number;
  price: string;
  rarity: string;
  image: string;
  images: string[];
  description: string;
  fullHistory: string;
  highlights: string[];
  designer: string;
  weight: string;
  raceHistory: string;
  collectorsInfo: string;
};

function horsepowerToNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function sanitize(data: globalThis.FormData, imagePaths: string[]): Payload {
  const highlightsRaw = String(data.get("highlights") ?? "");
  const highlights = highlightsRaw
    .split("\n")
    .map((h) => h.trim())
    .filter(Boolean);

  return {
    name: String(data.get("name") ?? ""),
    year: Number(data.get("year") ?? 0),
    country: String(data.get("country") ?? ""),
    make: String(data.get("make") ?? ""),
    era: String(data.get("era") ?? ""),
    type: String(data.get("type") ?? ""),
    produced: Number(data.get("produced") ?? 0),
    engine: String(data.get("engine") ?? ""),
    horsepower: horsepowerToNumber(String(data.get("horsepower") ?? "")),
    topSpeed: Number(data.get("topSpeed") ?? 0),
    price: String(data.get("price") ?? ""),
    rarity: String(data.get("rarity") ?? ""),
    image: imagePaths[0] ?? "",
    images: imagePaths,
    description: String(data.get("description") ?? ""),
    fullHistory: String(data.get("fullHistory") ?? ""),
    highlights,
    designer: String(data.get("designer") ?? ""),
    weight: String(data.get("weight") ?? ""),
    raceHistory: String(data.get("raceHistory") ?? ""),
    collectorsInfo: String(data.get("collectorsInfo") ?? ""),
  };
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

export async function GET() {
  const cars = await prisma.classicCarArticle.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  try {
    const allowed = await isVaultAdmin();
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.formData();
    const imageFiles = (data.getAll("images") as File[]).filter(
      (file) => file && file.size > 0 && file.type.startsWith("image/"),
    );
    if (imageFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }
    if (imageFiles.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed" },
        { status: 400 },
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imagePaths: string[] = [];
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      imagePaths.push(`/uploads/${fileName}`);
    }

    const payload = sanitize(data, imagePaths);
    const car = await prisma.classicCarArticle.create({
      data: payload,
    });
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("CREATE VAULT CAR ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create vault article" },
      { status: 500 },
    );
  }
}
