import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/auth/login', '/auth/register'];
const publicRoutes = ['/api-docs'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('nova_access_token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to login if protected route and no token
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if logged in and trying to access auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api-docs/:path*', '/auth/:path*'],
};