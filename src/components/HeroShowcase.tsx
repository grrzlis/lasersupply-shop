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
    id: 'prod_fil_20',
    category: {
      en: '3D Printing',
      lt: '3D Spausdinimas',
      de: '3D-Druck',
      fr: 'Impression 3D',
      es: 'Impresión 3D',
      pl: 'Druk 3D',
      lv: '3D Drukāšana',
      et: '3D-printimine',
    },
    title: {
      en: 'Elegoo Rapid PLA+ High-Speed (600 mm/s)',
      lt: 'Elegoo Rapid PLA+ High-Speed (600 mm/s)',
    },
    subtitle: {
      en: 'High-flow formula, 2.5x impact resistance',
      lt: 'Didelio takumo formulė, 2.5x smūginis atsparumas',
      de: 'High-Flow-Formel, 2,5x Schlagfestigkeit',
      fr: 'Formule haut débit, résistance chocs 2.5x',
      es: 'Fórmula de alto flujo, resistencia 2.5x',
      pl: 'Formuła high-flow, odporność 2.5x',
      lv: 'Augstas plūsmas formula, 2.5x triecienizturība',
      et: 'Kõrge voolavusega valem, 2.5x löögikindlus',
    },
    price: '24.29 €',
    rating: '4.95',
    reviews: '342',
    image: 'https://cdn.shopify.com/s/files/1/0296/9026/5648/files/Rapid-PLA-Filament-1KG-Grey.jpg',
    tag: {
      en: '⚡ 600 mm/s High-Speed',
      lt: '⚡ 600 mm/s Greitaeigis',
      de: '⚡ 600 mm/s High-Speed',
      fr: '⚡ 600 mm/s Rapide',
      es: '⚡ 600 mm/s Alta Velocidad',
      pl: '⚡ 600 mm/s Szybki',
      lv: '⚡ 600 mm/s Ātrgaitas',
      et: '⚡ 600 mm/s Kiire',
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
      lt: 'Cloudray Laser Welding Protective Shield OD8+',
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
  {
    id: 'prod_fil_28',
    category: {
      en: '3D Filaments',
      lt: '3D Filamentai',
      de: '3D-Filamente',
      fr: 'Filaments 3D',
      es: 'Filamentos 3D',
      pl: 'Filamenty 3D',
      lv: '3D Kvēldiegi',
      et: '3D-filamentid',
    },
    title: {
      en: 'Elegoo PLA Metallic Aluminum & Gunmetal',
      lt: 'Elegoo PLA Metallic Aluminum & Gunmetal',
    },
    subtitle: {
      en: 'Metallic sheen without brittleness, smooth feed',
      lt: 'Metalizuotas blizgesys be trapumo, tolygus padavimas',
      de: 'Metallischer Glanz ohne Sprödigkeit, flüssige Zufuhr',
      fr: 'Éclat métallique sans fragilité, alimentation fluide',
      es: 'Brillo metálico sin fragilidad, alimentación suave',
      pl: 'Metaliczny połysk bez kruchości, płynne podawanie',
      lv: 'Metālisks spīdums bez trausluma, vienmērīga padeve',
      et: 'Metallik läige ilma hapruseta, sujuv etteanne',
    },
    price: '25.64 €',
    rating: '4.94',
    reviews: '215',
    image: 'https://cdn.shopify.com/s/files/1/0296/9026/5648/files/bd3faf95010e20d13ba931ee629b96cc.jpg',
    tag: {
      en: '✨ Metallic Finish',
      lt: '✨ Metalizuota apdaila',
      de: '✨ Metallisches Finish',
      fr: '✨ Finition Métallique',
      es: '✨ Acabado Metálico',
      pl: '✨ Metaliczne Wykończenie',
      lv: '✨ Metāliska Apdare',
      et: '✨ Metallik Viimistlus',
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
      lt: 'Cloudray 6-in-1 Laser Engraving Jig 200×200mm',
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
    price: '18.90 €',
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
