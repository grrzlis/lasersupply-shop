'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Flame, Star, ArrowRight, Zap, Box } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroShowcaseProps {
  locale: Locale;
}

const FEATURED_ITEMS = [
  {
    id: 'elegoo-rapid-pla-plus-black',
    badge: '3D Spausdinimas',
    title: 'ELEGOO Rapid PLA+ (600 mm/s)',
    subtitle: 'High-speed 1.75mm · Warp-free',
    price: '18.99 €',
    rating: '4.95',
    reviews: '342',
    image: 'https://ae01.alicdn.com/kf/S7a83d6e5a6f24d108d4b3b2762a1b9c9R.jpg',
    tag: '⚡ 600 mm/s',
  },
  {
    id: 'sculpfun-s30-pro-max-laser-module',
    badge: 'Lazerinė Įranga',
    title: 'SCULPFUN S30 Pro Max 20W',
    subtitle: 'Ultra-fine Quad Diode · Air Assist',
    price: '389.00 €',
    rating: '4.98',
    reviews: '189',
    image: 'https://ae01.alicdn.com/kf/Sfaea54ffb4b449ff8c9ef5a0dbd3fcfaw.jpg',
    tag: '🔥 20W Optical',
  },
  {
    id: 'laser-honeycomb-working-table-400x400',
    badge: 'Priedai & Saugumas',
    title: 'Aliuminio Korio Stalas 400x400mm',
    subtitle: 'Greitas dūmų šalinimas · Apsauginė plokštė',
    price: '46.99 €',
    rating: '4.92',
    reviews: '512',
    image: 'https://ae01.alicdn.com/kf/S8f95c02bcfcb445cbe25712c75a4087cw.jpg',
    tag: '🛡️ Heavy Duty',
  },
  {
    id: 'polymaker-polyterra-pla-matte-charcoal',
    badge: '3D Filamentas',
    title: 'Polymaker PolyTerra PLA Matte',
    subtitle: 'Premium matinė tekstūra · Eco ritė',
    price: '19.99 €',
    rating: '4.97',
    reviews: '276',
    image: 'https://ae01.alicdn.com/kf/S6283b5df5b1049ea9e048cbb37a6bca2w.jpg',
    tag: '🌿 Eco Spool',
  },
];

export function HeroShowcase({ locale }: HeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = FEATURED_ITEMS[activeIndex];

  return (
    <div className="relative w-full max-w-[420px] mx-auto lg:mx-0">
      {/* Ambient background glow behind card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#f5cb5c]/40 via-amber-500/20 to-orange-600/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />

      {/* Main Glass Card */}
      <div className="relative bg-[#1c1c1b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f5cb5c 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Header badge row */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
              EU Sandėlis · Tiesioginis Siuntimas
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#f5cb5c] bg-[#f5cb5c]/10 border border-[#f5cb5c]/30 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3" /> Bestseller
          </span>
        </div>

        {/* Product Visual Area */}
        <div className="relative my-4 aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center group">
          <Image
            key={current.id}
            src={current.image}
            alt={current.title}
            fill
            sizes="(max-width: 420px) 100vw, 420px"
            className="object-contain p-3 transition-all duration-700 ease-out transform group-hover:scale-105"
            priority
          />

          {/* Floating Tag */}
          <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-bold text-white flex items-center gap-1 shadow-lg">
            <span>{current.tag}</span>
          </div>

          {/* Rating Pill */}
          <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{current.rating}</span>
            <span className="text-white/50 text-[10px]">({current.reviews})</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 relative z-10">
          <div className="text-[11px] font-bold tracking-wider text-[#f5cb5c] uppercase">
            {current.badge}
          </div>
          <h4 className="text-base font-extrabold text-white line-clamp-1">
            {current.title}
          </h4>
          <p className="text-xs text-stone-400 line-clamp-1">
            {current.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between relative z-10">
          <div>
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">ES Kaina su PVM</div>
            <div className="text-2xl font-black text-white tracking-tight">
              {current.price}
            </div>
          </div>

          <a
            href={`#${current.id}`}
            className="inline-flex items-center gap-1.5 bg-[#f5cb5c] hover:bg-[#eab308] text-[#1c1c1b] px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#f5cb5c]/20 hover:shadow-[#f5cb5c]/40 hover:scale-[1.02]"
          >
            <span>Užsakyti</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Slide selectors / dots */}
        <div className="flex items-center justify-center gap-1.5 pt-3.5 mt-2">
          {FEATURED_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 bg-[#f5cb5c]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mini Trust Bar under showcase */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/[0.03] border border-white/5 rounded-lg py-2 px-1">
          <div className="text-[13px] font-extrabold text-white">130+</div>
          <div className="text-[9px] text-stone-400 uppercase tracking-wider">Prekių ES</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-lg py-2 px-1">
          <div className="text-[13px] font-extrabold text-emerald-400">2–4 d.</div>
          <div className="text-[9px] text-stone-400 uppercase tracking-wider">Pristatymas</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-lg py-2 px-1">
          <div className="text-[13px] font-extrabold text-amber-400">4.9 ★</div>
          <div className="text-[9px] text-stone-400 uppercase tracking-wider">Makeriams</div>
        </div>
      </div>
    </div>
  );
}
