import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the cookies from the request
  const isAdmin = req.cookies.get('isAdmin')?.value === 'true';
  const isLoggedIn = req.cookies.get('isLoggedIn')?.value === 'true';

  // Allow access to the root route, login, and signup without any checks if not logged in
  if (!isLoggedIn) {
    if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.next();
    }
    // Redirect to home if trying to access any other route without being logged in
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If logged in but not an admin, redirect to business dashboard and allow access to its subroutes
  if (isLoggedIn && !isAdmin) {
    if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/businessDashboard', req.url));
    }
    if (!pathname.startsWith('/businessDashboard')) {
      return NextResponse.redirect(new URL('/businessDashboard', req.url));
    }
  }

  // If logged in and is an admin, allow access to admin dashboard and its subroutes, restrict access to other routes
  if (isLoggedIn && isAdmin) {
    if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/adminDashboard', req.url));
    }
    if (!pathname.startsWith('/adminDashboard')) {
      return NextResponse.redirect(new URL('/adminDashboard', req.url));
    }
  }

  // Default action: allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/businessDashboard/:path*',
    '/adminDashboard/:path*'
  ],
};
