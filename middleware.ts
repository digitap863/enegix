import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Panel UI Paths
  const isAdminUIPath = pathname.startsWith("/admin");
  if (isAdminUIPath) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("enegix_admin_session");
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const session = await verifyToken(sessionCookie.value);
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("enegix_admin_session");
      return response;
    }
  }

  // 2. Protect Admin Internal APIs (under /api/admin)
  const isAdminAPIPath = pathname.startsWith("/api/admin");
  if (isAdminAPIPath) {
    if (pathname === "/api/admin/login") {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("enegix_admin_session");
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. No session found." },
        { status: 401 }
      );
    }

    const session = await verifyToken(sessionCookie.value);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session expired or invalid." },
        { status: 401 }
      );
    }
  }

  // 3. Protect Mutating Public APIs (blogs, projects, contacts)
  const isBlogsAPI = pathname.startsWith("/api/blogs");
  const isProjectsAPI = pathname.startsWith("/api/projects");
  if (isBlogsAPI || isProjectsAPI) {
    const isMutation = !["GET", "HEAD", "OPTIONS"].includes(request.method);
    if (isMutation) {
      const sessionCookie = request.cookies.get("enegix_admin_session");
      const session = sessionCookie ? await verifyToken(sessionCookie.value) : null;
      if (!session) {
        return NextResponse.json(
          { success: false, error: "Unauthorized. Admin credentials required to modify data." },
          { status: 401 }
        );
      }
    }
  }

  const isContactAPI = pathname.startsWith("/api/contact");
  if (isContactAPI) {
    const requiresAdmin = !["POST", "OPTIONS"].includes(request.method);
    if (requiresAdmin) {
      const sessionCookie = request.cookies.get("enegix_admin_session");
      const session = sessionCookie ? await verifyToken(sessionCookie.value) : null;
      if (!session) {
        return NextResponse.json(
          { success: false, error: "Unauthorized. Admin credentials required to access enquiries." },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/blogs/:path*",
    "/api/projects/:path*",
    "/api/contact/:path*",
  ],
};
