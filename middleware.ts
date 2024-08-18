import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let locales = ["en-US", "es-ES"];
let defaultLocale = "en-US";

export function middleware(request: NextRequest) {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  });
  const languages = negotiator.languages();

  // Check if there is any supported locale in the pathname
  const { pathname ,basePath} = request.nextUrl;
  
  console.log(pathname,"aqui",basePath)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  console.log(pathnameHasLocale)
  if (pathnameHasLocale) return;
  console.log("aaaa")
  // Redirect if there is no locale
  const locale = match(languages, locales, defaultLocale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
