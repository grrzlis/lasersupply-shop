import type { Metadata } from 'next';
import { Truck } from 'lucide-react';
import { PolicyDocument } from '@/components/PolicyDocument';
import { shippingCopy } from '@/lib/policy-copy';
import { readLocale } from '@/lib/request-locale';
import { locales, type Locale } from '@/lib/i18n';

export const runtime = 'edge';

async function resolveLocale(lang?: string): Promise<Locale> {
  if (lang && locales.includes(lang as Locale)) return lang as Locale;
  return readLocale();
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  const page = shippingCopy[await resolveLocale(lang)];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: 'https://lasersupply.org/shipping' },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: 'https://lasersupply.org/shipping',
    },
  };
}

export default async function ShippingPolicyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = await resolveLocale(lang);
  return <PolicyDocument locale={locale} page={shippingCopy[locale]} icon={Truck} />;
}
