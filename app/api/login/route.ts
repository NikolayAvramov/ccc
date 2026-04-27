import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }
  const { password: _, ...safeUser } = user;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  const response = NextResponse.json(
    { message: "Login successful", user: safeUser },
    { status: 200 },
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });

  return response;
}
