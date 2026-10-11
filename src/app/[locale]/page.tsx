import { Navbar } from '@/components/Navbar';
import { SlideOverCart } from '@/components/SlideOverCart';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { Truck, ShieldCheck, Zap, Award, Layers, Clock } from 'lucide-react';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import type { Metadata } from 'next';

export const runtime = 'edge';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


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

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#242423] flex flex-col font-sans">
      <Navbar locale={locale} />
      <SlideOverCart locale={locale} />

      {/* Hero Section */}
      <section className="bg-[#242423] text-[#ffffff] py-14 sm:py-20 relative overflow-hidden border-b border-[#1c1c1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#f5cb5c] text-[#242423] font-bold text-xs uppercase px-3 py-1 tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>LaserSupply.org · European Maker Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
              {t.title}
            </h1>

            <p className="text-[#d1dbbe] text-sm sm:text-base leading-relaxed max-w-xl">
              {t.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3.5 bg-[#f5cb5c] hover:bg-[#f2bc2c] text-[#242423] font-extrabold text-sm uppercase tracking-wider transition"
              >
                {t.viewCatalog}
              </a>
              <a
                href="#materials"
                className="px-6 py-3.5 bg-transparent hover:bg-[#ffffff]/10 text-[#ffffff] border border-[#ffffff]/30 font-bold text-sm tracking-wider transition"
              >
                {t.viewSettings}
              </a>
            </div>
          </div>

          {/* Quick highlight box */}
          <div className="w-full md:w-[380px] bg-[#2e2e2d] border border-[#3e3e3c] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#f5cb5c] border-b border-[#3e3e3c] pb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> {t.whyTitle}
            </h3>
            <ul className="space-y-3 text-xs text-[#e8eddf]">
              <li className="flex items-start gap-2">
                <span className="text-[#f5cb5c] font-bold">✓</span>
                <span>{t.compatibilityText}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5cb5c] font-bold">✓</span>
                <span>{t.customsText}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f5cb5c] font-bold">✓</span>
                <span>{t.settingsText}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#f7f7f7] border-b border-[#e5e5e5] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[#242423]">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Truck className="w-4 h-4 text-[#242423]" />
            <span>Fast Tracked EU Delivery (2–5 d.)</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Quality & Flatness Guarantee</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Layers className="w-4 h-4 text-[#242423]" />
            <span>Maker & B2B Volume Pricing</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <Clock className="w-4 h-4 text-[#242423]" />
            <span>Expert Technical Support</span>
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#242423] text-[#ffffff] border-t border-[#1c1c1a] pt-12 pb-8 text-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#3e3e3c]">
          <div className="space-y-3">
            <div className="font-extrabold text-lg tracking-tighter">
              LASER<span className="text-[#f5cb5c]">CRAFT</span>
            </div>
            <p className="text-[#a8a8a8] text-[12px] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">Categories</h4>
            <ul className="space-y-1.5 text-[#a8a8a8]">
              <li><a href="#metal" className="hover:text-[#ffffff]">Anodized Metals</a></li>
              <li><a href="#wood" className="hover:text-[#ffffff]">3mm Basswood Sheets</a></li>
              <li><a href="#tumblers" className="hover:text-[#ffffff]">Stainless Tumblers</a></li>
              <li><a href="#starter" className="hover:text-[#ffffff]">Starter Bundles</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">Support & Specs</h4>
            <ul className="space-y-1.5 text-[#a8a8a8]">
              <li><a href="#" className="hover:text-[#ffffff]">LightBurn Cheatsheet</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Returns Policy</a></li>
              <li><a href="#" className="hover:text-[#ffffff]">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#f5cb5c] uppercase text-[11px] tracking-wider">Contact</h4>
            <p className="text-[#a8a8a8]">B2B & Maker Orders:</p>
            <p className="text-[#ffffff] font-bold">support@lasersupply.org</p>
            <p className="text-[#a8a8a8]">Mon–Fri 09:00 – 18:00 CET</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#888888]">
          <div>© {new Date().getFullYear()} LaserSupply.org. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Stripe · Apple Pay · Google Pay · Visa · Mastercard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
