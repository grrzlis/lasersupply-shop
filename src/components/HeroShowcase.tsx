'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Flame, Star, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroShowcaseProps {
  locale: Locale;
}

const SHOWCASE_I18N: Record<Locale, {
  status: string;
  badge: string;
  viewButton: string;
  itemsCount: string;
  itemsLabel: string;
  deliveryTime: string;
  deliveryLabel: string;
  community: string;
}> = {
  en: {
    status: 'EU & Global Hubs · Ready to Ship',
    badge: 'Top Pick',
    viewButton: 'View Item',
    itemsCount: '130+',
    itemsLabel: 'In Stock',
    deliveryTime: '5–12 d.',
    deliveryLabel: 'Delivery',
    community: 'Makers Choice',
  },
  lt: {
    status: 'ES Sandėlis · Paruošta siuntimui',
    badge: 'Top Prekė',
    viewButton: 'Peržiūrėti',
    itemsCount: '130+',
    itemsLabel: 'Prekių ES',
    deliveryTime: '5–12 d.',
    deliveryLabel: 'Pristatymas',
    community: 'Makeriams',
  },
  de: {
    status: 'EU-Lager · Versandbereit',
    badge: 'Bestseller',
    viewButton: 'Ansehen',
    itemsCount: '130+',
    itemsLabel: 'Auf Lager',
    deliveryTime: '5–12 T.',
    deliveryLabel: 'Lieferzeit',
    community: 'Für Maker',
  },
  fr: {
    status: 'Entrepôt UE · Prêt à expédier',
    badge: 'Top Vente',
    viewButton: 'Voir',
    itemsCount: '130+',
    itemsLabel: 'En Stock',
    deliveryTime: '5–12 j.',
    deliveryLabel: 'Livraison',
    community: 'Pour Makers',
  },
  es: {
    status: 'Almacén UE · Listo para enviar',
    badge: 'Top Ventas',
    viewButton: 'Ver',
    itemsCount: '130+',
    itemsLabel: 'En Stock',
    deliveryTime: '5–12 d.',
    deliveryLabel: 'Entrega',
    community: 'Para Makers',
  },
  pl: {
    status: 'Magazyn UE · Gotowe do wysyłki',
    badge: 'Bestseller',
    viewButton: 'Zobacz',
    itemsCount: '130+',
    itemsLabel: 'W Magazynie',
    deliveryTime: '5–12 dni',
    deliveryLabel: 'Dostawa',
    community: 'Dla Twórców',
  },
  lv: {
    status: 'ES Noliktava · Gatavs nosūtīšanai',
    badge: 'Top Prece',
    viewButton: 'Apskatīt',
    itemsCount: '130+',
    itemsLabel: 'Noliktavā',
    deliveryTime: '5–12 d.',
    deliveryLabel: 'Piegāde',
    community: 'Meistariem',
  },
  et: {
    status: 'EL Ladu · Valmis saatmiseks',
    badge: 'Top Toode',
    viewButton: 'Vaata',
    itemsCount: '130+',
    itemsLabel: 'Laos',
    deliveryTime: '5–12 p.',
    deliveryLabel: 'Tarneaeg',
    community: 'Meistritele',
  },
};

interface FeaturedItem {
  id: string;
  category: Partial<Record<Locale, string>>;
  title: Partial<Record<Locale, string>>;
  subtitle: Partial<Record<Locale, string>>;
  price: string;
  rating: string;
  reviews: string;
  image: string;
  tag: Partial<Record<Locale, string>>;
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'prod_cloudray_48',
    category: {
      en: 'Metal Blanks',
      lt: 'Metalo Ruošiniai',
      de: 'Metall-Rohlinge',
      fr: 'Supports Métal',
      es: 'Soportes de Metal',
      pl: 'Bazy Metalowe',
      lv: 'Metāla Sagataves',
      et: 'Metalli Toorikud',
    },
    title: {
      en: 'Cloudray 100Pcs Matte Black Anodized Cards (86×54mm)',
      lt: 'Cloudray 100 vnt. Matinio Juodo Aliuminio Kortelės',
      de: 'Cloudray 100 Stück Eloxierte Aluminium-Visitenkarten',
      fr: 'Cloudray 100 Pcs Cartes Aluminium Anodisé Noir',
      es: 'Cloudray 100 Piezas Tarjetas de Aluminio Anodizado',
      pl: 'Cloudray 100 Szt. Wizytówki z Anodowanego Aluminium',
      lv: 'Cloudray 100 Gab. Anodēta Alumīnija Vizītkartes',
      et: 'Cloudray 100 Tk Anodeeritud Alumiiniumist Visiitkaardid',
    },
    subtitle: {
      en: 'Laser vaporizes anodized coating for high-contrast silver finish',
      lt: 'Lazeris atidengia ryškų, švarų sidabrinį kontrastą be pridegimų',
      de: 'Laser verdampft Eloxalschicht für scharfe weiße Kontraste',
      fr: 'Gravure nette révélant un contraste métallique brillant',
      es: 'Acabado nítido y duradero con alto contraste metálico',
      pl: 'Laser odsłania czysty metal o trwałym kontraście',
      lv: 'Lāzers atklāj spilgtu, paliekošu sudraba kontrastu',
      et: 'Laser loob terava ja püsiva valge kontrasti',
    },
    price: '23.08 €',
    rating: '4.98',
    reviews: '412',
    image: 'https://cdn.shopify.com/s/files/1/2222/7859/files/Metal-Business-Cards-1.jpg?v=1722581989',
    tag: {
      en: '🏆 #1 Best Selling Blank',
      lt: '🏆 Populiariausias Ruošinys',
      de: '🏆 Meistverkaufter Rohling',
      fr: '🏆 Meilleure Vente Support',
      es: '🏆 Más Vendido en Metales',
      pl: '🏆 Bestseller wśród Baz',
      lv: '🏆 Pieprasītākā Sagatave',
      et: '🏆 Enimmüüdud Toorik',
    },
  },
  {
    id: 'prod_sculpfun_75',
    category: {
      en: 'Wood & Plywood',
      lt: 'Mediena ir Fanera',
      de: 'Holz & Sperrholz',
      fr: 'Bois & Contreplaqué',
      es: 'Madera y Contrachapado',
      pl: 'Drewno i Sklejka',
      lv: 'Koks un Saplāksnis',
      et: 'Puit ja Vineer',
    },
    title: {
      en: 'Sculpfun Multi-Color Birch Plywood Sheets 6pcs A4',
      lt: 'Sculpfun Įvairiaspalvė Beržo Fanera 6 vnt. A4 (3mm)',
      de: 'Sculpfun Mehrfarbiges Birken-Sperrholz 6 Stk. A4',
      fr: 'Sculpfun Contreplaqué Bouleau Multicolore 6pcs A4',
      es: 'Sculpfun Contrachapado Abedul Multicolor 6uds A4',
      pl: 'Sculpfun Kolorowa Sklejka Brzozowa 6szt A4',
      lv: 'Sculpfun Krāsains Bērza Saplāksnis 6gab A4',
      et: 'Sculpfun Värviline Kasevineer 6tk A4',
    },
    subtitle: {
      en: 'Eco safe stains, no glue pockets, zero burning edges',
      lt: 'Ekologiški dažai, jokių klijų kišenių, švarūs pjūviai',
      de: 'Öko-zertifiziert, keine Leimnester, saubere Kanten',
      fr: 'Encres à l’eau écologiques, découpe nette sans brûlure',
      es: 'Tintes al agua ecológicos, cortes limpios sin quemaduras',
      pl: 'Bezpieczne bejce wodne, brak sęków, gładkie krawędzie',
      lv: 'Ekoloģiskas krāsas, tīras malas bez piedegumiem',
      et: 'Ohutud veepõhised värvid, puhtad lõikeservad',
    },
    price: '30.75 €',
    rating: '4.95',
    reviews: '168',
    image: 'https://cdn.shopify.com/s/files/1/0574/2765/6879/files/1_8953930a-9957-41a9-9685-618a5bc93c06.jpg?v=1733296181',
    tag: {
      en: '🌿 Triple-Inspected AAA Wood',
      lt: '🌿 Patikrinta AAA Medienos Kokybė',
      de: '🌿 AAA Birken-Qualität',
      fr: '🌿 Bois Qualité Supérieure AAA',
      es: '🌿 Madera de Abedul Grado AAA',
      pl: '🌿 Sklejka Brzozowa Klasy AAA',
      lv: '🌿 AAA Klases Bērzs',
      et: '🌿 AAA-Klassi Kask',
    },
  },
  {
    id: 'prod_cloudray_5',
    category: {
      en: 'Jigs & Fixtures',
      lt: 'Priedai & Ruošiniai',
      de: 'Schablonen & Zubehör',
      fr: 'Gabarits & Accessoires',
      es: 'Plantillas y Accesorios',
      pl: 'Szablony i Akcesoria',
      lv: 'Šabloni un Piederumi',
      et: 'Šabloonid ja Tarvikud',
    },
    title: {
      en: 'Cloudray 6-in-1 Laser Engraving Jig 200×200mm',
      lt: 'Cloudray 6-in-1 Lazerinio Graviravimo Šablonas 200×200mm',
      de: 'Cloudray 6-in-1 Lasergravur-Schablone 200×200mm',
      fr: 'Cloudray Gabarit de Gravure Laser 6-en-1 200×200mm',
      es: 'Cloudray Plantilla de Grabado Láser 6 en 1 200×200mm',
      pl: 'Cloudray Szablon do Grawerowania 6 w 1 200×200mm',
      lv: 'Cloudray 6-in-1 Lāzergravēšanas Šablons 200×200mm',
      et: 'Cloudray 6-in-1 Lasergraveerimise Rakis 200×200mm',
    },
    subtitle: {
      en: 'Universal fixture for business cards, pens & dog tags',
      lt: 'Universalus šablonas kortelėms, rašikliams ir žymekliams',
      de: 'Universelle Vorrichtung für Visitenkarten & Stifte',
      fr: 'Gabarit universel pour cartes, stylos et médailles',
      es: 'Plantilla universal para tarjetas, bolígrafos y placas',
      pl: 'Uniwersalny szablon do wizytówek, długopisów i nieśmiertelników',
      lv: 'Universāls šablons vizītkartēm un pildspalvām',
      et: 'Universaalne rakis visiitkaartidele ja pastakatele',
    },
    price: '21.54 €',
    rating: '4.96',
    reviews: '280',
    image: 'https://cdn.shopify.com/s/files/1/2222/7859/files/6-in-1-Laser-Engraving-Jig_01_9e34f2b7-cb79-407c-a979-dbaa518d2af7.jpg?v=1788510814',
    tag: {
      en: '🎯 Precision Jig',
      lt: '🎯 Tikslus pozicionavimas',
      de: '🎯 Präzise Positionierung',
      fr: '🎯 Positionnement Précis',
      es: '🎯 Posicionamiento Preciso',
      pl: '🎯 Precyzyjne Pozycjonowanie',
      lv: '🎯 Precīza Pozicionēšana',
      et: '🎯 Täpne Positsioneerimine',
    },
  },
  {
    id: 'prod_cloudray_1',
    category: {
      en: 'Laser Equipment',
      lt: 'Lazerinė Įranga',
      de: 'Laserausrüstung',
      fr: 'Équipement Laser',
      es: 'Equipos Láser',
      pl: 'Sprzęt Laserowy',
      lv: 'Lāzera Aprīkojums',
      et: 'Laserseadmed',
    },
    title: {
      en: 'Cloudray Laser Welding Protective Shield OD8+',
      lt: 'Cloudray Apsauginis Lazerinis Skydas OD8+',
      de: 'Cloudray Laserschutzschild OD8+',
      fr: 'Cloudray Écran de Protection Laser OD8+',
      es: 'Cloudray Pantalla de Protección Láser OD8+',
      pl: 'Cloudray Osłona Ochronna do Lasera OD8+',
      lv: 'Cloudray Lāzera Aizsargekrāns OD8+',
      et: 'Cloudray Laserikaitsekilp OD8+',
    },
    subtitle: {
      en: '1064nm certified protection for industrial lasers',
      lt: '1064nm apsauga pramoniniams ir dirbtuvių lazeriams',
      de: '1064nm zertifizierter Schutz für Industrielaser',
      fr: 'Protection certifiée 1064nm pour lasers industriels',
      es: 'Protección certificada 1064nm para láseres',
      pl: 'Certyfikowana ochrona 1064nm dla laserów',
      lv: '1064nm sertificēta aizsardzība lāzeriem',
      et: '1064nm sertifitseeritud kaitse laseritele',
    },
    price: '60.75 €',
    rating: '4.98',
    reviews: '189',
    image: 'https://cdn.shopify.com/s/files/1/2222/7859/files/17895406893127.png?v=1789540722',
    tag: {
      en: '🛡️ OD8+ Certified',
      lt: '🛡️ OD8+ Sertifikuota',
      de: '🛡️ OD8+ Zertifiziert',
      fr: '🛡️ Certifié OD8+',
      es: '🛡️ Certificado OD8+',
      pl: '🛡️ Certyfikat OD8+',
      lv: '🛡️ OD8+ Sertificēts',
      et: '🛡️ OD8+ Sertifitseeritud',
    },
  },
];

export function HeroShowcase({ locale }: HeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = FEATURED_ITEMS[activeIndex];
  const t = SHOWCASE_I18N[locale] || SHOWCASE_I18N.en;

  const currentCategory = current.category[locale] || current.category.en || '';
  const currentTitle = current.title[locale] || current.title.en || '';
  const currentSubtitle = current.subtitle[locale] || current.subtitle.en || '';
  const currentTag = current.tag[locale] || current.tag.en || '';

  return (
    <div className="w-full max-w-[440px] mx-auto lg:mx-0">
      {/* Elegantiška moderni tamsi kortelė be sunkių rėmų */}
      <div className="bg-[#1f1f1e] border border-[#333331] rounded-2xl p-4 sm:p-5 shadow-2xl relative">
        {/* Viršutinė eilutė: statusas ir ženkliukas */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {t.status}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#f5cb5c] bg-[#f5cb5c]/10 border border-[#f5cb5c]/25 px-2 py-0.5 rounded-full uppercase">
            <Flame className="w-3 h-3" /> {t.badge}
          </span>
        </div>

        {/* Kompaktiška horizontali vitrina: nuotrauka kairėje, aprašymas dešinėje */}
        <div className="py-4 flex gap-4 items-center">
          {/* Prekės nuotrauka su apsauga nuo tuščių kadrų */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-white p-2 border border-stone-800 shadow-inner flex items-center justify-center">
            <Image
              key={current.id}
              src={current.image}
              alt={currentTitle}
              fill
              sizes="128px"
              className="object-contain p-1.5 transition-transform duration-500 hover:scale-105"
              priority
              unoptimized
            />
          </div>

          {/* Prekės informacija */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#f5cb5c]">
              {currentCategory}
            </div>
            <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
              {currentTitle}
            </h4>
            <div className="text-[11px] text-stone-400 line-clamp-1">
              {currentSubtitle || currentTag}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-lg font-black text-white">
                {current.price}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] text-amber-400 font-semibold bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                <Star className="w-3 h-3 fill-amber-400" />
                {current.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Veiksmo mygtukas ir navigacijos taškai */}
        <div className="pt-3 border-t border-[#2d2d2b] flex items-center justify-between">
          {/* Taškai perjungimui */}
          <div className="flex items-center gap-1.5">
            {FEATURED_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={item.title[locale] || item.title.en}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 bg-[#f5cb5c]'
                    : 'w-2 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          {/* Užsakymo nuoroda */}
          <a
            href={`#catalog`}
            className="inline-flex items-center gap-1.5 bg-[#f5cb5c] hover:bg-[#eab308] text-[#1c1c1b] px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-[1.02]"
          >
            <span>{t.viewButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Kompaktiška garantijų juosta po kortele */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-stone-300">
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-white">{t.itemsCount}</div>
          <div className="text-[9px] text-stone-400 uppercase">{t.itemsLabel}</div>
        </div>
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-emerald-400">{t.deliveryTime}</div>
          <div className="text-[9px] text-stone-400 uppercase">{t.deliveryLabel}</div>
        </div>
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-amber-400">4.9 ★</div>
          <div className="text-[9px] text-stone-400 uppercase">{t.community}</div>
        </div>
      </div>
    </div>
  );
}
