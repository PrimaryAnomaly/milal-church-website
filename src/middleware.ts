import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeFromAcceptLanguage,
  LOCALE_COOKIE,
} from "@/i18n/config";

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(existing)) {
    return NextResponse.next();
  }

  const locale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, locale || defaultLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)",
  ],
};
