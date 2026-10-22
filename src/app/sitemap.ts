import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export const runtime = 'edge';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lasersupply.org';
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Add each localized home page
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: locale === 'en' ? 1.0 : 0.9,
    });
  }

  // Add policies
  entries.push({
    url: `${baseUrl}/shipping`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
  entries.push({
    url: `${baseUrl}/returns`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
  entries.push({
    url: `${baseUrl}/privacy`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  return entries;
}
