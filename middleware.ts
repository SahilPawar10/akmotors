// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  // Redirect unauthenticated users
  if (!token && url.pathname.startsWith("/admin")) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
