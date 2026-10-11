'use client';

import React, { useSyncExternalStore } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function Navbar({ locale = 'en' }: { locale?: Locale }) {
  const { toggleCart, getTotalCount } = useCartStore();
  const isClient = useIsClient();
  const totalCount = isClient ? getTotalCount() : 0;
  const t = messages[locale] || messages.en;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#ffffff] border-b border-[#e5e5e5]">
      {/* Top Announcement Bar */}
      <div className="bg-[#f5cb5c] text-[#242423] py-2 px-4 text-center text-[12px] font-bold tracking-tight flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t.announcement}</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-tighter text-[#242423] font-sans">
            LASER<span className="text-[#f5cb5c] bg-[#242423] px-1.5 py-0.5 ml-0.5 text-xl">CRAFT</span>
          </span>
          <span className="text-[10px] font-mono uppercase bg-[#f5cb5c] text-[#242423] font-bold px-1.5 py-0.5">
            EU
          </span>
        </Link>

        {/* Navigation Categories */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-bold text-[#242423]">
          <Link href="#metal" className="hover:text-[#f5cb5c] transition">
            Anodized Metals
          </Link>
          <Link href="#wood" className="hover:text-[#f5cb5c] transition">
            Basswood Sheets
          </Link>
          <Link href="#tumblers" className="hover:text-[#f5cb5c] transition">
            Tumblers
          </Link>
          <Link href="#starter" className="hover:text-[#f5cb5c] transition">
            Starter Bundles
          </Link>
          <Link href="#settings" className="hover:text-[#f5cb5c] transition text-[#5f5e58]">
            LightBurn Settings
          </Link>
        </nav>

        {/* Search, Language Switcher & Cart */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#f6f6f6] border border-[#e5e5e5] px-3 py-1.5 rounded-full text-xs text-[#5f5e58] gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="bg-[#ffffff] border border-[#d4d4d4] px-1.5 py-0.2 rounded text-[10px] font-mono">⌘K</kbd>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher currentLocale={locale} />

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-[#f5cb5c] hover:bg-[#f2bc2c] text-[#242423] text-xs font-bold border border-[#242423]/10 transition cursor-pointer rounded-sm shadow-sm"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            {totalCount > 0 && (
              <span className="bg-[#242423] text-[#ffffff] font-mono text-[11px] px-2 py-0.5 font-bold rounded-full">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
