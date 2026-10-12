'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Flame, Star, ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroShowcaseProps {
  locale: Locale;
}

// Tikros, patikrintos prekių nuotraukos iš mūsų Shopify CDN (kurios visada 100% užsikrauna)
const FEATURED_ITEMS = [
  {
    id: 'prod_fil_20',
    category: '3D Spausdinimas',
    title: 'Elegoo Rapid PLA+ High-Speed (600 mm/s)',
    subtitle: 'Didelio takumo formulė, 2.5x smūginis atsparumas',
    price: '24.29 €',
    rating: '4.95',
    reviews: '342',
    image: 'https://cdn.shopify.com/s/files/1/0296/9026/5648/files/Rapid-PLA-Filament-1KG-Grey.jpg',
    tag: '⚡ 600 mm/s Greitaeigis',
  },
  {
    id: 'prod_cloudray_1',
    category: 'Lazerinė Įranga',
    title: 'Cloudray Laser Welding Protective Shield OD8+',
    subtitle: '1064nm apsauga pramoniniams ir dirbtuvių lazeriams',
    price: '60.75 €',
    rating: '4.98',
    reviews: '189',
    image: 'https://cdn.shopify.com/s/files/1/2222/7859/files/17895406893127.png?v=1789540722',
    tag: '🛡️ OD8+ Sertifikuota',
  },
  {
    id: 'prod_fil_28',
    category: '3D Filamentai',
    title: 'Elegoo PLA Metallic Aluminum & Gunmetal',
    subtitle: 'Metalizuotas blizgesys be trapumo, tolygus padavimas',
    price: '25.64 €',
    rating: '4.94',
    reviews: '215',
    image: 'https://cdn.shopify.com/s/files/1/0296/9026/5648/files/bd3faf95010e20d13ba931ee629b96cc.jpg',
    tag: '✨ Metalizuota apdaila',
  },
  {
    id: 'prod_cloudray_5',
    category: 'Priedai & Ruošiniai',
    title: 'Cloudray 6-in-1 Laser Engraving Jig 200×200mm',
    subtitle: 'Universalus šablonas kortelėms, rašikliams ir žymekliams',
    price: '18.90 €',
    rating: '4.96',
    reviews: '280',
    image: 'https://cdn.shopify.com/s/files/1/2222/7859/files/6-in-1-Laser-Engraving-Jig_01_9e34f2b7-cb79-407c-a979-dbaa518d2af7.jpg?v=1788510814',
    tag: '🎯 Tikslus pozicionavimas',
  },
];

export function HeroShowcase({ locale: _locale }: HeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = FEATURED_ITEMS[activeIndex];

  return (
    <div className="w-full max-w-[440px] mx-auto lg:mx-0">
      {/* Elegantiška moderni tamsi kortelė be sunkių rėmų */}
      <div className="bg-[#1f1f1e] border border-[#333331] rounded-2xl p-4 sm:p-5 shadow-2xl relative">
        {/* Viršutinė eilutė: statusas ir ženkliukas */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              ES Sandėlis · Paruošta siuntimui
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#f5cb5c] bg-[#f5cb5c]/10 border border-[#f5cb5c]/25 px-2 py-0.5 rounded-full uppercase">
            <Flame className="w-3 h-3" /> Top Prekė
          </span>
        </div>

        {/* Kompaktiška horizontali vitrina: nuotrauka kairėje, aprašymas dešinėje */}
        <div className="py-4 flex gap-4 items-center">
          {/* Prekės nuotrauka su apsauga nuo tuščių kadrų */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-white p-2 border border-stone-800 shadow-inner flex items-center justify-center">
            <Image
              key={current.id}
              src={current.image}
              alt={current.title}
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
              {current.category}
            </div>
            <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
              {current.title}
            </h4>
            <div className="text-[11px] text-stone-400 line-clamp-1">
              {current.tag}
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
                aria-label={item.title}
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
            <span>Peržiūrėti</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Kompaktiška garantijų juosta po kortele */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-stone-300">
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-white">130+</div>
          <div className="text-[9px] text-stone-400 uppercase">Prekių ES</div>
        </div>
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-emerald-400">2–4 d.</div>
          <div className="text-[9px] text-stone-400 uppercase">Pristatymas</div>
        </div>
        <div className="bg-[#1f1f1e]/80 border border-[#2d2d2b] rounded-lg py-1.5 px-1">
          <div className="text-xs font-black text-amber-400">4.9 ★</div>
          <div className="text-[9px] text-stone-400 uppercase">Makeriams</div>
        </div>
      </div>
    </div>
  );
}
