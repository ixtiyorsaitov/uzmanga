// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const { pathname } = request.nextUrl;

  // Himoyalangan sahifalar
  const protectedRoutes = ['/profile', '/dashboard', '/settings', '/manga/create'];
  const authRoutes = ['/login', '/register'];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);

  // ===== 1. Himoyalangan sahifalarga kirish =====
  if (isProtectedRoute) {
    // Token yo'q bo'lsa -> Login
    if (!accessToken && !refreshToken) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Access token eskirgan, lekin refresh token bor bo'lsa
    // Client-side'da axios interceptor avtomatik yangilaydi
    // Middleware faqat cookie mavjudligini tekshiradi
    return NextResponse.next();
  }

  // ===== 2. Auth sahifalarga kirish (login/register) =====
  if (isAuthRoute && (accessToken || refreshToken)) {
    // Agar token bor bo'lsa, home'ga yo'naltirish
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};