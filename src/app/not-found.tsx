import Link from 'next/link';
import type { Metadata } from 'next';
import { notFoundCopy } from '@/lib/policy-copy';
import { readLocale } from '@/lib/request-locale';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: '404 | LaserSupply.org',
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const locale = await readLocale();
  const copy = notFoundCopy[locale];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#f1f4f6] text-[#1b283a]">
      <div className="text-4xl font-black text-[#9f241d] mb-2">404</div>
      <h1 className="text-xl font-bold mb-2">{copy.title}</h1>
      <p className="text-sm text-[#5c6770] max-w-md mb-6">{copy.text}</p>
      <Link
        href={`/${locale}`}
        className="px-5 py-2.5 bg-[#9f241d] hover:bg-[#8c1f19] text-white text-xs font-bold uppercase tracking-wider transition"
      >
        {copy.home}
      </Link>
    </div>
  );
}
