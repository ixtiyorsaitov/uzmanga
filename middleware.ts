import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. MANGA REDIRECT MANTIQI (Loopni oldini olish uchun)
  // Bu qism foydalanuvchi /mangas/lookism ga kirganda uni /mangas/lookism/main ga otadi
  const mangaRegex = /^\/mangas\/([^\/]+)$/;
  const match = pathname.match(mangaRegex);

  if (match) {
    const slug = match[1];
    // Agar slug 'create' bo'lmasa (chunki u protected route bo'lishi mumkin)
    if (slug !== "add") {
      return NextResponse.redirect(
        new URL(`/mangas/${slug}/main`, request.url),
      );
    }
  }

  // Himoyalangan sahifalar
  const protectedRoutes = [
    "/profile",
    "/dashboard",
    "/settings",
    "/manga/create",
  ];
  const authRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // ===== 2. Himoyalangan sahifalarga kirish =====
  if (isProtectedRoute) {
    if (!accessToken && !refreshToken) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ===== 3. Auth sahifalarga kirish (login/register) =====
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
