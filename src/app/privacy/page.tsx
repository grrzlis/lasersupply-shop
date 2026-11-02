import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { PolicyDocument } from '@/components/PolicyDocument';
import { privacyCopy } from '@/lib/policy-copy';
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
  const page = privacyCopy[await resolveLocale(lang)];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: 'https://lasersupply.org/privacy' },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: 'https://lasersupply.org/privacy',
    },
  };
}

export default async function PrivacyPolicyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = await resolveLocale(lang);
  return <PolicyDocument locale={locale} page={privacyCopy[locale]} icon={Shield} />;
}
