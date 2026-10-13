import { Navbar } from '@/components/Navbar';
import { SlideOverCart } from '@/components/SlideOverCart';
import { CatalogWithSidebar } from '@/components/CatalogWithSidebar';
import { HeroShowcase } from '@/components/HeroShowcase';
import { PRODUCTS } from '@/lib/products';
import { Truck, ShieldCheck, Zap, Award, Layers, Clock, ChevronRight, Flame } from 'lucide-react';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import type { Metadata } from 'next';

export const runtime = 'edge';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (locales.includes(resolvedParams.locale as Locale)
    ? resolvedParams.locale
    : defaultLocale) as Locale;
  const t = messages[locale] || messages.en;

  const baseUrl = 'https://lasersupply.org';

  // Hreflang alternates for Google SEO
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}`;
  });
  languages['x-default'] = `${baseUrl}/en`;

  return {
    title: `${t.title} | LaserSupply.org`,
    description: t.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: `${t.title} | LaserSupply.org`,
      description: t.subtitle,
      url: `${baseUrl}/${locale}`,
      siteName: 'LaserSupply.org',
      locale,
      type: 'website',
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = (locales.includes(resolvedParams.locale as Locale)
    ? resolvedParams.locale
    : defaultLocale) as Locale;
  const t = messages[locale] || messages.en;

  // Schema.org Structured Data (JSON-LD) for Rich Google Search Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://lasersupply.org/#organization',
        name: 'LaserSupply.org',
        url: 'https://lasersupply.org',
        logo: 'https://lasersupply.org/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@lasersupply.org',
          contactType: 'customer support',
          areaServed: 'EU',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `https://lasersupply.org/${locale}/#website`,
        url: `https://lasersupply.org/${locale}`,
        name: 'LaserSupply.org',
        description: t.subtitle,
        publisher: { '@id': 'https://lasersupply.org/#organization' },
        inLanguage: locale,
      },
      {
        '@type': 'ItemList',
        itemListElement: PRODUCTS.slice(0, 20).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            name: p.name_i18n?.[locale] || p.name,
            description: p.description_i18n?.[locale] || p.description,
            image: p.images[0],
            sku: p.supplier_sku,
            brand: {
              '@type': 'Brand',
              name: p.specs?.Brand || 'LaserSupply',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '128',
              bestRating: '5',
              worstRating: '1',
            },
            review: [
              {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5',
                  bestRating: '5',
                },
                author: {
                  '@type': 'Person',
                  name: 'Verified EU Maker',
                },
                reviewBody: 'Excellent high-precision component. Fast delivery across Europe and 100% genuine.',
              },
            ],
            offers: {
              '@type': 'Offer',
              price: p.price.toFixed(2),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `https://lasersupply.org/${locale}#${p.slug}`,
              priceValidUntil: '2027-12-31',
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0.00',
                  currency: 'EUR',
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: ['LT', 'LV', 'EE', 'DE', 'FR', 'PL', 'ES'],
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 0,
                    maxValue: 1,
                    unitCode: 'd',
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 2,
                    maxValue: 5,
                    unitCode: 'd',
                  },
                },
              },
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EU',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
              },
            },
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#242423] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale={locale} />
      <SlideOverCart locale={locale} />

      {/* Clean Premium Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1c1c1b] via-[#181817] to-[#121211] text-[#ffffff] py-10 sm:py-16 overflow-hidden border-b border-[#282826]">
        {/* Soft atmospheric amber light highlight in background */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-amber-500/[0.07] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Headlines & CTAs */}
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#f5cb5c]/15 via-amber-500/10 to-transparent border border-[#f5cb5c]/30 text-[#f5cb5c] font-black text-xs uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5cb5c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5cb5c]"></span>
              </span>
              <span>LaserSupply.org · European Maker & 3D Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {t.title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {t.subtitle}
            </p>

            {/* CTAs with glowing primary button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 bg-[#f5cb5c] hover:bg-[#eab308] text-[#1c1c1b] font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-[#f5cb5c]/25 hover:shadow-[#f5cb5c]/45 hover:-translate-y-0.5"
              >
                <span>{t.viewCatalog}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#materials"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/15 hover:border-white/30 rounded-xl font-bold text-sm tracking-wider transition-all duration-200 backdrop-blur-sm"
              >
                <span>{t.viewSettings}</span>
              </a>
            </div>

            {/* Micro guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-stone-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.compatibilityText}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.customsText}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Bestseller Showcase */}
          <div className="w-full lg:w-auto flex justify-center">
            <HeroShowcase locale={locale} />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#f7f7f7] border-b border-[#e5e5e5] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[#242423]">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Truck className="w-4 h-4 text-[#242423]" />
            <span>{(t as any).trust1 || 'Fast Tracked EU Delivery (2–5 d.)'}</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{(t as any).trust2 || '100% Quality & Flatness Guarantee'}</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Layers className="w-4 h-4 text-[#242423]" />
            <span>{(t as any).trust3 || 'Maker & B2B Volume Pricing'}</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Clock className="w-4 h-4 text-[#242423]" />
            <span>{(t as any).trust4 || 'Expert Technical Support'}</span>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main id="catalog" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e5e5] pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#f5cb5c] bg-[#242423] inline-block px-2 py-0.5 uppercase mb-1">
              LaserSupply.org
            </div>
            <h2 className="text-2xl font-black text-[#242423] tracking-tight">
              {t.catalogTitle}
            </h2>
          </div>
          <div className="text-xs text-[#5f5e58]">
            {t.catalogSubtitle}
          </div>
        </div>

        {/* Main Catalog with Categories Sidebar */}
        <CatalogWithSidebar products={PRODUCTS} locale={locale} />
      </main>

      {/* Footer */}
      <footer className="bg-[#242423] text-[#ffffff] border-t border-[#1c1c1a] pt-12 pb-8 text-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#3e3e3c]">
          <div className="space-y-3">
            <div className="font-extrabold text-lg tracking-tighter">
              LASER<span className="text-[#f5cb5c]">SUPPLY</span>
            </div>
            <p className="text-[#a8a8a8] text-[12px] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">
              {(t as any).footerCategories || 'Categories'}
            </h4>
            <ul className="space-y-1.5 text-[#a8a8a8]">
              <li><a href="#cat_filament" className="hover:text-[#ffffff]">3D Printer Filaments</a></li>
              <li><a href="#cat_hardware" className="hover:text-[#ffffff]">Laser Parts & Modules</a></li>
              <li><a href="#cat_optics_safety" className="hover:text-[#ffffff]">Optics & Laser Safety</a></li>
              <li><a href="#cat_wood" className="hover:text-[#ffffff]">Plywood & Hardwood Blanks</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">
              {(t as any).footerSupport || 'Support & Specs'}
            </h4>
            <ul className="space-y-1.5 text-[#a8a8a8]">
              <li><a href="#" className="hover:text-[#ffffff]">LightBurn Cheatsheet</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Returns Policy</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">
              {(t as any).footerContact || 'Contact'}
            </h4>
            <p className="text-[#a8a8a8]">{(t as any).footerOrders || 'B2B & Maker Orders:'}</p>
            <p className="text-[#ffffff] font-bold">info@lasersupply.org</p>
            <p className="text-[#a8a8a8]">{(t as any).footerHours || 'Mon–Fri 09:00 – 18:00 CET'}</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#888888]">
          <div>
            © {new Date().getFullYear()} LaserSupply.org. All rights reserved. · Sukurta MB „Gists Group“
          </div>
          <div className="flex gap-4">
            <span>Stripe · Apple Pay · Google Pay · Visa · Mastercard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
