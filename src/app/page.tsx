import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export const runtime = 'edge';

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (typeof value === 'string') q.set(key, value);
    else if (Array.isArray(value)) value.forEach(v => q.append(key, v));
  }
  const queryString = q.toString();
  redirect(`/${defaultLocale}${queryString ? `?${queryString}` : ''}`);
}

