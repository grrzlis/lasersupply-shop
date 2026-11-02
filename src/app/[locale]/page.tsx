import { Navbar } from '@/components/Navbar';
import { SlideOverCart } from '@/components/SlideOverCart';
import { CatalogWithSidebar } from '@/components/CatalogWithSidebar';
import { CategoryShowcase, NewsletterBand } from '@/components/CategoryShowcase';
import { BackToTop } from '@/components/BackToTop';
import { PRODUCTS } from '@/lib/products';
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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ code?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const authCode = resolvedSearchParams?.code;
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
        itemListElement: PRODUCTS.slice(0, 10).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            name: p.name_i18n?.[locale] || p.name,
            description: p.description_i18n?.[locale] || p.description,
            image: p.images[0],
            sku: p.supplier_sku || p.id,
            brand: {
              '@type': 'Brand',
              name: p.specs?.Brand || 'LaserSupply',
            },
            offers: {
              '@type': 'Offer',
              price: p.price.toFixed(2),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `https://lasersupply.org/${locale}#${p.id}`,
              priceValidUntil: '2027-12-31',
              validFrom: '2026-01-01T00:00:00Z',
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0.00',
                  currency: 'EUR',
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: ['LT', 'LV', 'EE', 'DE', 'FR', 'PL', 'ES', 'IT', 'NL', 'BE', 'AT', 'SE', 'FI', 'IE', 'DK', 'NO', 'CH', 'GB'],
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 1,
                    maxValue: 3,
                    unitCode: 'd',
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 5,
                    maxValue: 12,
                    unitCode: 'd',
                  },
                },
              },
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EU',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
              },
            },
          },
        })),
      },
    ],
  };

  const copy = homeCopy[locale] || homeCopy.en;

  return (
    <div className="min-h-screen bg-[#f1f4f6] text-[#1b283a] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale={locale} />
      <SlideOverCart locale={locale} />
      <BackToTop label={locale === 'lt' ? 'Į viršų' : 'Back to top'} />

      <section className="relative w-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden bg-[#1b283a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-laser.jpg"
          alt=""
          className="hero-photo absolute inset-0 w-full h-full object-cover object-[70%_45%]"
        />
        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 flex items-center min-h-[380px] sm:min-h-[480px] lg:min-h-[560px]">
          <div className="hero-offer-card w-full max-w-[540px] bg-[#9f241d] text-white rounded-md px-6 py-8 sm:px-10 sm:py-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 text-[32px] sm:text-[44px] font-extrabold uppercase leading-[1.05] tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/90">
              {t.subtitle}
            </p>
            <a
              href="#products"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 bg-white text-[#1b283a] text-[13px] font-bold uppercase tracking-wide hover:bg-[#f4f6f8]"
            >
              {copy.cta}
              <span aria-hidden>»</span>
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 flex-1 w-full space-y-12">
        <section id="catalog" className="space-y-6 scroll-mt-6">
          <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#1b283a]">
            {copy.catalog}
          </h2>
          <CategoryShowcase locale={locale} seeAll={copy.seeAll} viewAll={copy.viewAll} />
        </section>

        <section id="products" className="space-y-6 scroll-mt-6">
          <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#1b283a]">
            {copy.offers}
          </h2>
          <CatalogWithSidebar locale={locale} />
        </section>

        <section className="grid lg:grid-cols-[280px_1fr] bg-white overflow-hidden">
          <div className="bg-[#9f241d] text-white p-8 flex flex-col justify-end min-h-[220px]">
            <div className="text-[72px] font-black leading-none">ES</div>
            <p className="mt-2 text-[15px] font-semibold">{copy.warehouse}</p>
          </div>
          <div className="p-8 sm:p-10">
            <h2 className="text-[32px] font-bold tracking-tight">{copy.about}</h2>
            <p className="mt-3 text-[#9f241d] font-semibold">{copy.aboutLead}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#3c4a5a] max-w-2xl">{t.subtitle}</p>
          </div>
        </section>
      </main>

      <NewsletterBand
        title={copy.newsTitle}
        text={copy.newsText}
        placeholder={copy.email}
        button={copy.subscribe}
        thanks={copy.thanks}
        locale={locale}
        errorText={copy.subscribeError}
      />

      <footer id="contact" className="bg-[#1b283a] text-white">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-[28px] font-bold">{copy.contactTitle}</h2>
            <p className="mt-4 text-[15px] text-white/80">MB „Gists Group“</p>
            <p className="text-[15px] text-white/80">Vilnius, Lietuva</p>
            <a href="mailto:info@lasersupply.org" className="mt-3 inline-block text-[15px] underline underline-offset-4">
              info@lasersupply.org
            </a>
            <p className="mt-2 text-[14px] text-white/70">{(t as { footerHours?: string }).footerHours || 'Mon–Fri 09:00 – 18:00'}</p>
          </div>
          <div>
            <h3 className="text-[15px] font-bold uppercase tracking-wide">{copy.info}</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-white/80">
              <li><a className="hover:text-white" href={`/shipping?lang=${locale}`}>{copy.shipping}</a></li>
              <li><a className="hover:text-white" href={`/returns?lang=${locale}`}>{copy.returns}</a></li>
              <li><a className="hover:text-white" href={`/privacy?lang=${locale}`}>{copy.privacy}</a></li>
              <li><a className="hover:text-white" href="#catalog">{copy.catalog}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[15px] font-bold uppercase tracking-wide">LaserSupply</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">{t.subtitle}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 text-[13px] text-white/60 flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} LaserSupply.org · MB „Gists Group“</span>
            <span>Stripe · Apple Pay · Google Pay · Visa · Mastercard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const homeCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  cta: string;
  catalog: string;
  offers: string;
  seeAll: string;
  viewAll: string;
  warehouse: string;
  about: string;
  aboutLead: string;
  newsTitle: string;
  newsText: string;
  email: string;
  subscribe: string;
  thanks: string;
  subscribeError: string;
  contactTitle: string;
  info: string;
  shipping: string;
  returns: string;
  privacy: string;
}> = {
  en: {
    eyebrow: 'Special offer',
    title: 'Laser blanks and materials',
    cta: 'Shop now',
    catalog: 'Product catalog',
    offers: 'This week',
    seeAll: 'View all',
    viewAll: 'View all',
    warehouse: 'EU warehouse, ready to ship',
    about: 'Laser materials shop',
    aboutLead: 'Checked blanks for diode, CO2 and fiber',
    newsTitle: 'Subscribe for offers',
    newsText: 'Useful notes and real offers. No spam.',
    email: 'Your email address',
    subscribe: 'Subscribe',
    thanks: 'You are on the list.',
    subscribeError: 'Could not subscribe. Please try again.',
    contactTitle: 'Contact us',
    info: 'Information',
    shipping: 'Shipping',
    returns: 'Returns',
    privacy: 'Privacy policy',
  },
  lt: {
    eyebrow: 'Ypatingas pasiūlymas',
    title: 'Lazerio medžiagos ir ruošiniai',
    cta: 'Rinktis',
    catalog: 'Prekių katalogas',
    offers: 'Savaitės pasiūlymai',
    seeAll: 'Žiūrėti viską',
    viewAll: 'Žiūrėti viską',
    warehouse: 'ES sandėlis, paruošta siuntimui',
    about: 'Lazerio medžiagų parduotuvė',
    aboutLead: 'Patikrinti ruošiniai diodiniam, CO2 ir fiber lazeriui',
    newsTitle: 'Prenumeruokite naujienas ir geriausius pasiūlymus!',
    newsText: 'Nesiunčiame šlamšto. Tik naudingą informaciją ir tikrus pasiūlymus.',
    email: 'Jūsų el. pašto adresas',
    subscribe: 'Prenumeruoti',
    thanks: 'Įrašėme. Ačiū.',
    subscribeError: 'Nepavyko užprenumeruoti. Bandykite dar kartą.',
    contactTitle: 'Susisiekite su mumis',
    info: 'Informacija',
    shipping: 'Pristatymas',
    returns: 'Grąžinimas',
    privacy: 'Privatumo politika',
  },
  de: {
    eyebrow: 'Angebot',
    title: 'Laserrohlinge und Materialien',
    cta: 'Auswählen',
    catalog: 'Produktkatalog',
    offers: 'Diese Woche',
    seeAll: 'Alles ansehen',
    viewAll: 'Alles ansehen',
    warehouse: 'EU-Lager, versandbereit',
    about: 'Shop für Lasermaterial',
    aboutLead: 'Geprüfte Rohlinge für Dioden-, CO2- und Faserlaser',
    newsTitle: 'Angebote abonnieren',
    newsText: 'Nur nützliche Hinweise und echte Angebote.',
    email: 'E-Mail-Adresse',
    subscribe: 'Abonnieren',
    thanks: 'Sie sind dabei.',
    subscribeError: 'Abonnement fehlgeschlagen. Bitte erneut versuchen.',
    contactTitle: 'Kontakt',
    info: 'Information',
    shipping: 'Versand',
    returns: 'Rückgabe',
    privacy: 'Datenschutz',
  },
  fr: {
    eyebrow: 'Offre spéciale',
    title: 'Supports et matériaux laser',
    cta: 'Choisir',
    catalog: 'Catalogue',
    offers: 'Cette semaine',
    seeAll: 'Tout voir',
    viewAll: 'Tout voir',
    warehouse: 'Entrepôt UE, prêt à expédier',
    about: 'Boutique de matériaux laser',
    aboutLead: 'Supports contrôlés pour diode, CO2 et fibre',
    newsTitle: 'Recevoir les offres',
    newsText: 'Uniquement des informations utiles.',
    email: 'Votre e-mail',
    subscribe: "S'abonner",
    thanks: 'Vous êtes inscrit.',
    subscribeError: "Inscription impossible. Réessayez.",
    contactTitle: 'Contact',
    info: 'Information',
    shipping: 'Livraison',
    returns: 'Retours',
    privacy: 'Confidentialité',
  },
  es: {
    eyebrow: 'Oferta especial',
    title: 'Materiales y soportes láser',
    cta: 'Elegir',
    catalog: 'Catálogo',
    offers: 'Esta semana',
    seeAll: 'Ver todo',
    viewAll: 'Ver todo',
    warehouse: 'Almacén UE, listo para enviar',
    about: 'Tienda de materiales láser',
    aboutLead: 'Soportes comprobados para diodo, CO2 y fibra',
    newsTitle: 'Recibe ofertas',
    newsText: 'Solo información útil y ofertas reales.',
    email: 'Tu correo',
    subscribe: 'Suscribirse',
    thanks: 'Listo.',
    subscribeError: 'No se pudo suscribir. Inténtalo de nuevo.',
    contactTitle: 'Contacto',
    info: 'Información',
    shipping: 'Envío',
    returns: 'Devoluciones',
    privacy: 'Privacidad',
  },
  pl: {
    eyebrow: 'Oferta specjalna',
    title: 'Materiały i bazy laserowe',
    cta: 'Wybierz',
    catalog: 'Katalog',
    offers: 'W tym tygodniu',
    seeAll: 'Zobacz wszystko',
    viewAll: 'Zobacz wszystko',
    warehouse: 'Magazyn UE, gotowe do wysyłki',
    about: 'Sklep z materiałami laserowymi',
    aboutLead: 'Sprawdzone bazy do diody, CO2 i fibera',
    newsTitle: 'Zapisz się na oferty',
    newsText: 'Tylko przydatne informacje.',
    email: 'Twój e-mail',
    subscribe: 'Zapisz się',
    thanks: 'Zapisane.',
    subscribeError: 'Nie udało się zapisać. Spróbuj ponownie.',
    contactTitle: 'Kontakt',
    info: 'Informacje',
    shipping: 'Dostawa',
    returns: 'Zwroty',
    privacy: 'Prywatność',
  },
  lv: {
    eyebrow: 'Īpašais piedāvājums',
    title: 'Lāzera materiāli un sagataves',
    cta: 'Izvēlēties',
    catalog: 'Katalogs',
    offers: 'Šonedēļ',
    seeAll: 'Skatīt visu',
    viewAll: 'Skatīt visu',
    warehouse: 'ES noliktava, gatavs nosūtīšanai',
    about: 'Lāzera materiālu veikals',
    aboutLead: 'Pārbaudītas sagataves diodei, CO2 un šķiedrai',
    newsTitle: 'Pieteikties piedāvājumiem',
    newsText: 'Tikai noderīga informācija.',
    email: 'Jūsu e-pasts',
    subscribe: 'Pieteikties',
    thanks: 'Pieteikts.',
    subscribeError: 'Neizdevās pieteikties. Mēģiniet vēlreiz.',
    contactTitle: 'Sazinieties',
    info: 'Informācija',
    shipping: 'Piegāde',
    returns: 'Atgriešana',
    privacy: 'Privātums',
  },
  et: {
    eyebrow: 'Eripakkumine',
    title: 'Lasermaterjalid ja toorikud',
    cta: 'Vali',
    catalog: 'Kataloog',
    offers: 'Sel nädalal',
    seeAll: 'Vaata kõike',
    viewAll: 'Vaata kõike',
    warehouse: 'EL ladu, valmis saatmiseks',
    about: 'Lasermaterjalide pood',
    aboutLead: 'Kontrollitud toorikud dioodile, CO2-le ja fiibrile',
    newsTitle: 'Telli pakkumised',
    newsText: 'Ainult kasulik info.',
    email: 'Sinu e-post',
    subscribe: 'Telli',
    thanks: 'Oled nimekirjas.',
    subscribeError: 'Tellimine ebaõnnestus. Proovi uuesti.',
    contactTitle: 'Võta ühendust',
    info: 'Info',
    shipping: 'Tarne',
    returns: 'Tagastus',
    privacy: 'Privaatsus',
  },
};
