import { NextRequest, NextResponse } from "next/server";

// 🔓 Пејџи достапни за сите (без логирање)
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/showroom",
  "/privacy",
  "/terms",
];

// 🔐 Пејџи само за логирани корисници
const PROTECTED_ROUTES = [
  "/profile",
  "/conversations",
  "/add-car",
  "/edit",
  "/messages",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Провера дали е protected пејџ
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // 🍪 Земи JWT token од cookie
  const token = request.cookies.get("token")?.value;

  // ❌ Ако нема токен и ја пристапува protected рутата, редиректирај на login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Дозволи пристап
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Совпадај со сите request патеки освен:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|public).*)",
  ],
};
