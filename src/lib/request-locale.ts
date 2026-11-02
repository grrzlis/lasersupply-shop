import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';

export async function readLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get('NEXT_LOCALE')?.value;
  if (value && locales.includes(value as Locale)) return value as Locale;
  return defaultLocale;
}
