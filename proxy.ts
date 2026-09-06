import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicAdminPath } from "./lib/admin-path";
import { defaultLocale, locales } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.includes(".")
  ) {
    return;
  }

  if (isPublicAdminPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.rewrite(url);
  }

  if (process.env.NODE_ENV !== "production" && (pathname === "/admin" || pathname.startsWith("/admin/"))) {
    return;
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
