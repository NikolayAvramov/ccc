import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  try {
    const cars = await prisma.car.findMany({
      where: { owner: decoded.id },
    });
    console.log("my CARS:", cars);
    if (!cars) {
      return NextResponse.json({ error: "Cars not found" }, { status: 404 });
    }
    return NextResponse.json(cars);
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
