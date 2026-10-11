import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, countryToLocaleMap, Locale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api routes, and next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale (e.g. /de, /fr, /lt)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 1. Check user preference cookie if they manually changed language
  const userPreferredLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (userPreferredLocale && locales.includes(userPreferredLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${userPreferredLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 2. IP-based automatic detection via Cloudflare cf-ipcountry header
  // (or x-vercel-ip-country fallback in other environments)
  const country = (
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    ''
  ).toUpperCase();

  let detectedLocale: Locale = defaultLocale;
  if (country && countryToLocaleMap[country]) {
    detectedLocale = countryToLocaleMap[country];
  } else {
    // 3. Fallback: Parse Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      for (const loc of locales) {
        if (acceptLanguage.toLowerCase().includes(loc)) {
          detectedLocale = loc;
          break;
        }
      }
    }
  }

  // Redirect root or path to detected locale (e.g. / -> /lt, /de, /en)
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
  
  const response = NextResponse.redirect(url);
  // Set cookie for subsequent requests
  response.cookies.set('NEXT_LOCALE', detectedLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
