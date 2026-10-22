import Link from 'next/link';
import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: '404 - Page Not Found | LaserSupply.org',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#ffffff] text-[#242423]">
      <div className="text-4xl font-black text-[#f5cb5c] mb-2">404</div>
      <h1 className="text-xl font-bold mb-2">Page Not Found / Puslapis nerastas</h1>
      <p className="text-xs text-[#5f5e58] max-w-md mb-6">
        The requested page does not exist or has been moved. / Ieškomas puslapis neegzistuoja arba buvo perkeltas.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#f5cb5c] hover:bg-[#f2bc2c] text-[#242423] text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition"
      >
        Return to Home / Grįžti į pradžią
      </Link>
    </div>
  );
}
