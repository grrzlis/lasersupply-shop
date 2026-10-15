import { NextResponse } from 'next/server';
import { locales } from '@/lib/i18n';

export const runtime = 'edge';

export async function GET() {
  const baseUrl = 'https://lasersupply.org';
  const now = new Date().toISOString();

  const urls = locales.map(
    (loc) => `  <url>
    <loc>${baseUrl}/${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${loc === 'en' ? '1.0' : '0.9'}</priority>
  </url>`
  );

  urls.push(`  <url>
    <loc>${baseUrl}/returns</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=14400',
    },
  });
}
