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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const car = await prisma.classicCarArticle.findUnique({ where: { id } });
  if (!car) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(car);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const allowed = await isVaultAdmin();
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.classicCarArticle.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await req.formData();
    const existingImagesRaw = String(data.get("existingImages") ?? "[]");
    let keptImages: string[] = [];
    try {
      const parsed = JSON.parse(existingImagesRaw);
      keptImages = Array.isArray(parsed) ? parsed.filter((p) => typeof p === "string") : [];
    } catch {
      keptImages = [];
    }

    const newFiles = (data.getAll("images") as File[]).filter(
      (file) => file && file.size > 0 && file.type.startsWith("image/"),
    );

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedPaths: string[] = [];
    for (const file of newFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      uploadedPaths.push(`/uploads/${fileName}`);
    }

    const oldImages = ((existing.images as string[]) ?? [existing.image]).filter(Boolean);
    const nextImages = [...keptImages, ...uploadedPaths].slice(0, 5);
    if (nextImages.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    const removedImages = oldImages.filter((img) => !nextImages.includes(img));
    for (const img of removedImages) {
      if (!img.startsWith("/uploads/")) continue;
      const oldPath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const payload = sanitize(data, nextImages);
    const updated = await prisma.classicCarArticle.update({
      where: { id },
      data: payload,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE VAULT CAR ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update vault article" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const allowed = await isVaultAdmin();
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.classicCarArticle.findUnique({ where: { id } });
    const images = ((existing?.images as string[]) ?? [existing?.image]).filter(Boolean);
    for (const img of images) {
      if (!img.startsWith("/uploads/")) continue;
      const filePath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await prisma.classicCarArticle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE VAULT CAR ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete vault article" },
      { status: 500 },
    );
  }
}
