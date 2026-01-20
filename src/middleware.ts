import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/user-fix', '/firebase-test'];

// Admin-only routes
const adminRoutes = [
  '/admin/dashboard',
  '/admin/items',
  '/admin/tasks',
  '/admin/auditors',
  '/admin/reports',
  '/admin/settings',
];

// Auditor-only routes
const auditorRoutes = [
  '/auditor/dashboard',
  '/auditor/tasks',
  '/auditor/scan',
  '/auditor/history',
  '/auditor/profile',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie (you'll need to implement this based on your auth strategy)
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname === route);
  
  // If accessing public route, allow
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/auditor/dashboard', request.url));
  }

  // Check auditor routes
  const isAuditorRoute = auditorRoutes.some(route => pathname.startsWith(route));
  if (isAuditorRoute && userRole !== 'auditor') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
