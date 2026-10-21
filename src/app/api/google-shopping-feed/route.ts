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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const localeParam = (url.searchParams.get('locale') || defaultLocale) as Locale;
    const locale = locales.includes(localeParam) ? localeParam : 'en';

    const baseUrl = 'https://lasersupply.org';

    const itemsXml = PRODUCTS.map((p) => {
      // Localized name & description
      const title = p.name_i18n?.[locale] || p.name;
      const description = p.description_i18n?.[locale] || p.description;
      const productLink = `${baseUrl}/${locale}#${p.id}`;
      const mainImage = p.images?.[0] || 'https://lasersupply.org/icon-512.png';
      const additionalImages = (p.images || []).slice(1, 5);
      const googleCat = getGoogleCategory(p.category_id);
      const brand = (p.specs?.Brand as string) || (p.badge?.includes('Cloudray') ? 'Cloudray' : 'LaserSupply');
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
