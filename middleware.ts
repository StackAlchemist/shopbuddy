import { NextRequest, NextResponse } from "next/server";

// Public routes
const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 👇 your auth cookie name
  const token = request.cookies.get("auth_token")?.value;

  // If NOT logged in & route is protected → redirect to login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in & trying to access login/register → redirect to lists
  if (token && (pathname === "/login" || pathname === "/register")) {
    const dashboardUrl = new URL("/lists", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
