import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cars = await prisma.car.findMany({});

    if (!cars) {
      return Response.json({ error: "Cars not found" }, { status: 404 });
    }
    return Response.json(cars);
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
