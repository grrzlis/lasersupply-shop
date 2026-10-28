import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

export const runtime = 'edge';

// Map internal category IDs to official Google Product Categories
function getGoogleCategory(catId: string): string {
  switch (catId) {
    case 'cat_wood':
      return 'Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies > Woodworking';
    case 'cat_metal':
      return 'Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies > Jewelry Making & Beading';
    case 'cat_optics_safety':
      return 'Business & Industrial > Work Safety Protective Gear > Safety Glasses & Goggles';
    case 'cat_hardware':
      return 'Hardware > Hardware Accessories > Tool Parts & Accessories';
    case 'cat_filament':
      return 'Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies';
    default:
      return 'Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies';
  }
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Excluded products from Google Shopping feed:
// Complete heavy machines and hardware where dropship supplier cost exceeds Google market retail benchmarks
const EXCLUDED_FEED_IDS = new Set([
  'prod_sculpfun_72', // Sculpfun C1 Mini + RA Roller (Cost 169 > Benchmark 151.30)
  'prod_sculpfun_69', // Sculpfun C1 6W Mini
  'prod_sculpfun_82', // Sculpfun C1 3W Mini
  'prod_sculpfun_78', // Sculpfun iCube Ultra Machine
  'prod_sculpfun_89', // Sculpfun iCube Pro Max 10W Machine
  'prod_sculpfun_90', // Sculpfun iCube 3W Machine
  'prod_sculpfun_91', // Sculpfun iCube Pro 5W Machine
  'prod_sculpfun_86', // Sculpfun S40 MAX 48W Machine
  'prod_sculpfun_92', // Sculpfun SF-A9 40W Machine
  'prod_sculpfun_93', // Sculpfun SF-A9 20W Machine
  'prod_sculpfun_67', // Sculpfun E1 Pro Enclosed Machine
  'prod_sculpfun_68', // Sculpfun E1 Enclosed Machine
  'prod_sculpfun_79', // Sculpfun iCube Air Assist Kit (Cost 69.99 > Benchmark 62.75)
  'prod_sculpfun_80', // Sculpfun iCube iCAM Camera
  'prod_cloudray_16', // Cloudray E Series Head Set (Cost 99 > Benchmark 61.46)
  'prod_cloudray_29', // Cloudray 0-2KW Raytools BT220 (Industrial 1240 €)
  'prod_cloudray_31', // Cloudray 800mm Electric Lift Column (673 €)
  'prod_cloudray_37', // Cloudray TEYU CW5200 Industrial Water Chiller (776 €)
  'prod_cloudray_38', // Cloudray 0-60W Power Meter (1483 €)
  'prod_ortur_100',   // Ortur R2 Smart Laser Engraver (984 €)
  'prod_ortur_99',    // Ortur Laser Master 2 Pro S2 (377 €)
  'prod_ortur_98',    // Ortur 1.3W IR LR4-1A Module (403 €)
  'prod_ortur_97',    // Ortur R1 Laser Engraver (309 €)
  'prod_ortur_95',    // Ortur Laser Master 3 LE (134 €)
]);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const localeParam = (url.searchParams.get('locale') || defaultLocale) as Locale;
    const locale = locales.includes(localeParam) ? localeParam : 'en';

    const baseUrl = 'https://lasersupply.org';

    // Only include competitive, profitable products in the Google Shopping Feed
    const eligibleProducts = PRODUCTS.filter((p) => !EXCLUDED_FEED_IDS.has(p.id));

    const itemsXml = eligibleProducts.map((p) => {
      // Localized name & description
      const title = p.name_i18n?.[locale] || p.name;
      const description = p.description_i18n?.[locale] || p.description;
      const productLink = `${baseUrl}/${locale}#${p.id}`;
      const mainImage = p.images?.[0] || 'https://lasersupply.org/icon-512.png';
      const additionalImages = (p.images || []).slice(1, 5);
      const googleCat = getGoogleCategory(p.category_id);
      let brand = (p.specs?.Brand as string) || '';
      if (!brand) {
        if (p.name.includes('Cloudray') || p.badge?.includes('Cloudray')) brand = 'Cloudray';
        else if (p.name.includes('Sculpfun') || p.badge?.includes('Sculpfun')) brand = 'Sculpfun';
        else if (p.name.includes('Ortur') || p.badge?.includes('Ortur')) brand = 'Ortur';
        else if (p.name.includes('Elegoo') || p.badge?.includes('Elegoo')) brand = 'Elegoo';
        else if (p.name.includes('Polymaker') || p.badge?.includes('Polymaker')) brand = 'Polymaker';
        else brand = 'LaserSupply';
      }
      const mpn = p.supplier_sku || p.cj_pid || p.id;
      const priceFormatted = `${Number(p.price).toFixed(2)} EUR`;

      const additionalImagesXml = additionalImages
        .map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
        .join('\n');

      return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(productLink)}</g:link>
      <g:image_link>${escapeXml(mainImage)}</g:image_link>
${additionalImagesXml ? additionalImagesXml + '\n' : ''}      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>${escapeXml(brand)}</g:brand>
      <g:google_product_category>${escapeXml(googleCat)}</g:google_product_category>
      <g:mpn>${escapeXml(mpn)}</g:mpn>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:shipping>
        <g:country>LT</g:country>
        <g:service>Tracked Express</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>LV</g:country>
        <g:service>Tracked Express</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>EE</g:country>
        <g:service>Tracked Express</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>DK</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>PL</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>ES</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>IT</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>NL</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>BE</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>AT</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>SE</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>FI</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>IE</g:country>
        <g:service>EU Tracked Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>NO</g:country>
        <g:service>Tracked International Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>CH</g:country>
        <g:service>Tracked International Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Tracked International Courier</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard International Tracked</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>CA</g:country>
        <g:service>Standard International Tracked</g:service>
        <g:price>0.00 EUR</g:price>
      </g:shipping>
    </item>`;
    }).join('\n');

    const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>LaserSupply.org Google Shopping Product Feed</title>
    <link>${baseUrl}</link>
    <description>Europe&apos;s leading supplier of laser engraving blanks, materials, and maker accessories.</description>
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(feedXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=14400',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Feed generation error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
