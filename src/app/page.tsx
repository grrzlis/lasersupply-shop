import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';
import { defaultLocale, locales, countryToLocaleMap, Locale } from '@/lib/i18n';

export const runtime = 'edge';

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const headerList = await headers();
  const cookieStore = await cookies();

  // 1. Check if user already has an explicit language cookie preference
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  let targetLocale: Locale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    // 2. Check Cloudflare Country Header (cf-ipcountry)
    const country = (headerList.get('cf-ipcountry') || '').toUpperCase();
    if (country && countryToLocaleMap[country]) {
      targetLocale = countryToLocaleMap[country];
    } else {
      // 3. Fallback to Accept-Language header
      const acceptLanguage = headerList.get('accept-language') || '';
      for (const loc of locales) {
        if (acceptLanguage.toLowerCase().includes(loc)) {
          targetLocale = loc;
          break;
        }
      }
    }
  }

  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (typeof value === 'string') q.set(key, value);
    else if (Array.isArray(value)) value.forEach(v => q.append(key, v));
  }
  const queryString = q.toString();

  redirect(`/${targetLocale}${queryString ? `?${queryString}` : ''}`);
}

