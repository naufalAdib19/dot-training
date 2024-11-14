import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = true;

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/product", request.url));
  }

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/product/:path*", "/"],
};
