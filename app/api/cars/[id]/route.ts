import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

// ---------------- GET ----------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Missing car id" }, { status: 400 });
  }

  const car = await prisma.car.findUnique({
    where: { id },
  });

  return Response.json(car);
}

// ---------------- PUT (EDIT) ----------------
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user: any = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await req.formData();

    const make = data.get("make") as string;
    const model = data.get("model") as string;
    const type = data.get("type") as string;
    const price = data.get("price") as string;
    const mileage = data.get("mileage") as string;
    const description = data.get("description") as string;
    const location = data.get("location") as string;
    const year = data.get("year") as string;

    const existingImages = JSON.parse(
      (data.get("existingImages") as string) || "[]",
    );

    const files = data.getAll("images") as File[];
    const uploadedPaths: string[] = [];

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of files) {
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      uploadedPaths.push("/uploads/" + fileName);
    }

    const oldCar = await prisma.car.findUnique({ where: { id } });

    if (!oldCar) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // 🔐 owner check
    if (oldCar.owner !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const oldImages = (oldCar.images as string[]) || [];
    // 🗑️ delete removed images
    const imagesToDelete = oldImages.filter(
      (img) => !existingImages.includes(img),
    );
    for (const img of imagesToDelete) {
      const filePath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        make,
        model,
        type,
        year,
        price,
        mileage,
        location,
        description,
        images: [...existingImages, ...uploadedPaths],
      },
    });

    return Response.json(updatedCar);
  } catch (err) {
    console.log("💥 UPDATE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user: any = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return Response.json({ error: "Car not found" }, { status: 404 });
    }

    // 🔐 owner check
    if (car.owner !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 🗑️ delete all images from disk
    const images = (car.images as string[]) || [];

    for (const img of images) {
      const filePath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 💥 delete from DB
    await prisma.car.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.log("💥 DELETE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
