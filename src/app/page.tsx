import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export default function RootPage() {
  // Edge middleware will automatically redirect based on IP / headers,
  // this acts as standard Next.js fallback to English
  redirect(`/${defaultLocale}`);
}
