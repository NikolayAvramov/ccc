import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function makeId() {
  return Math.random().toString(36).substring(2, 12);
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    // text fields
    const make = data.get("make") as string;
    const model = data.get("model") as string;
    const type = data.get("type") as string;
    const price = data.get("price") as string;
    const mileage = data.get("mileage") as string;
    const description = data.get("description") as string;
    const location = data.get("location") as string;
    const year = data.get("year") as string;

    // 🍪 token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 📸 IMAGES
    const files = data.getAll("images") as File[];

    const uploadedPaths: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;

      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      uploadedPaths.push("/uploads/" + fileName);
    }

    // 💾 SAVE
    const car = await prisma.car.create({
      data: {
        id: makeId(),
        make,
        model,
        type,
        year,
        price,
        mileage,
        location,
        description,
        images: uploadedPaths, // ✅ ПЪТИЩА
        owner: decoded.id,
      },
    });

    return NextResponse.json(car);
  } catch (err) {
    console.log("💥 CREATE CAR ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
