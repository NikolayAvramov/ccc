import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // 🔥 това трие cookie-то
    path: "/",
  });

  return res;
}
