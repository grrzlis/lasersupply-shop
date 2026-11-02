'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CATEGORIES } from '@/lib/categories';

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const chrome: Record<string, { tagline: string; catalog: string; search: string; contacts: string; shipping: string; returns: string; info: string; cart: string }> = {
  en: { tagline: 'Laser materials', catalog: 'Product catalog', search: 'Search materials...', contacts: 'Contact', shipping: 'Shipping', returns: 'Returns', info: 'Information', cart: 'Cart' },
  lt: { tagline: 'Lazerio medžiagos', catalog: 'Prekių katalogas', search: 'Ieškokite prekių...', contacts: 'Kontaktai', shipping: 'Pristatymas', returns: 'Grąžinimas', info: 'Informacija', cart: 'Krepšelis' },
  de: { tagline: 'Lasermaterial', catalog: 'Produktkatalog', search: 'Material suchen...', contacts: 'Kontakt', shipping: 'Versand', returns: 'Rückgabe', info: 'Information', cart: 'Warenkorb' },
  fr: { tagline: 'Matériaux laser', catalog: 'Catalogue', search: 'Rechercher...', contacts: 'Contact', shipping: 'Livraison', returns: 'Retours', info: 'Information', cart: 'Panier' },
  es: { tagline: 'Materiales láser', catalog: 'Catálogo', search: 'Buscar...', contacts: 'Contacto', shipping: 'Envío', returns: 'Devoluciones', info: 'Información', cart: 'Carrito' },
  pl: { tagline: 'Materiały laserowe', catalog: 'Katalog', search: 'Szukaj...', contacts: 'Kontakt', shipping: 'Dostawa', returns: 'Zwroty', info: 'Informacje', cart: 'Koszyk' },
  lv: { tagline: 'Lāzera materiāli', catalog: 'Katalogs', search: 'Meklēt...', contacts: 'Kontakti', shipping: 'Piegāde', returns: 'Atgriešana', info: 'Informācija', cart: 'Grozs' },
  et: { tagline: 'Lasermaterjalid', catalog: 'Kataloog', search: 'Otsi...', contacts: 'Kontakt', shipping: 'Tarne', returns: 'Tagastus', info: 'Info', cart: 'Ostukorv' },
};

export function Navbar({ locale = 'en' }: { locale?: Locale }) {
  const { toggleCart, getTotalCount } = useCartStore();
  const isClient = useIsClient();
  const totalCount = isClient ? getTotalCount() : 0;
  const t = messages[locale] || messages.en;
  const c = chrome[locale] || chrome.en;
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onSearch = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === 'string') setQuery(detail);
    };
    window.addEventListener('catalog-search', onSearch);
    return () => window.removeEventListener('catalog-search', onSearch);
  }, []);

  const publishSearch = (value: string) => {
    setQuery(value);
    window.dispatchEvent(new CustomEvent('catalog-search', { detail: value }));
  };

  const pickCategory = (id: string) => {
    setMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent('filter-catalog', { detail: { category: id, brand: 'all' } })
    );
    window.dispatchEvent(new CustomEvent('filter-category', { detail: id }));
    document.getElementById(id === 'all' ? 'catalog' : 'products')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const CartButton = () => (
    <button
      type="button"
      onClick={toggleCart}
      className="relative h-[50px] px-4 sm:px-5 bg-[#9f241d] hover:bg-[#8c1f19] text-white inline-flex items-center gap-2 font-bold uppercase tracking-wide transition-colors"
      aria-label={t.cart}
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="hidden sm:inline text-[13px]">{c.cart}</span>
      <span className="min-w-5 h-5 px-1 rounded-full bg-white text-[#9f241d] text-[11px] font-bold flex items-center justify-center">
        {totalCount}
      </span>
    </button>
  );

  return (
    <header className="relative z-40 w-full bg-white">
      <div className="border-b border-[#e6eaee]">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-11 flex items-center justify-between gap-4 text-[13px] text-[#1b283a]">
          <div className="flex items-center gap-5 min-w-0">
            <a href="mailto:info@lasersupply.org" className="truncate hover:text-[#9f241d]">
              info@lasersupply.org
            </a>
            <span className="hidden sm:inline text-[#5c6770]">
              {(t as { footerHours?: string }).footerHours || 'Mon–Fri 09:00 – 18:00'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-3 text-[13px]">
              <a href="#contact" className="hover:text-[#9f241d]">{c.contacts}</a>
              <span className="text-[#d5dbe2]">|</span>
              <Link href={`/shipping?lang=${locale}`} className="hover:text-[#9f241d]">{c.shipping}</Link>
              <span className="text-[#d5dbe2]">|</span>
              <Link href={`/returns?lang=${locale}`} className="hover:text-[#9f241d]">{c.returns}</Link>
            </nav>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-[92px] flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <svg width="46" height="38" viewBox="0 0 46 38" aria-hidden="true">
            <path d="M23 2 L44 20 H35 V36 H11 V20 H2 Z" fill="#9f241d" />
            <path d="M23 12 L31 20 H15 Z" fill="#ffffff" />
          </svg>
          <span className="leading-none">
            <span className="block text-[26px] sm:text-[30px] font-black tracking-tight text-[#1b283a]">
              LASERSUPPLY
            </span>
            <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1b283a] mt-1">
              {c.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold uppercase tracking-[0.04em] text-[#1b283a]">
          <a href="#catalog" className="text-[#9f241d] underline underline-offset-8 decoration-2">{c.catalog}</a>
          <Link href={`/shipping?lang=${locale}`} className="hover:text-[#9f241d]">{c.shipping}</Link>
          <Link href={`/returns?lang=${locale}`} className="hover:text-[#9f241d]">{c.returns}</Link>
          <Link href={`/privacy?lang=${locale}`} className="hover:text-[#9f241d]">{c.info}</Link>
          <button
            type="button"
            onClick={toggleCart}
            className="inline-flex items-center gap-2 hover:text-[#9f241d]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{c.cart}</span>
            <span className="min-w-5 h-5 px-1 rounded-full bg-[#9f241d] text-white text-[11px] font-bold flex items-center justify-center">
              {totalCount}
            </span>
          </button>
        </nav>
      </div>

      <div className="bg-[#1b283a]">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4 flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="h-[50px] px-4 sm:px-5 bg-[#9f241d] hover:bg-[#8c1f19] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-wide inline-flex items-center gap-2.5"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="hidden sm:inline">{c.catalog}</span>
            </button>
            {menuOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(92vw,420px)] bg-white shadow-xl border border-[#e6eaee] py-2 max-h-[70vh] overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => pickCategory(cat.id)}
                    className="w-full text-left px-4 py-2.5 text-[14px] text-[#1b283a] hover:bg-[#f4f6f8] hover:text-[#9f241d]"
                  >
                    {cat.name[locale] || cat.name.en}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex-1"
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <label className="relative block">
              <span className="sr-only">{c.search}</span>
              <input
                value={query}
                onChange={(event) => publishSearch(event.target.value)}
                placeholder={c.search}
                className="w-full h-[50px] bg-white px-4 pr-12 text-[15px] text-[#1b283a] placeholder:text-[#8b95a1] outline-none"
              />
              <Search className="w-4 h-4 text-[#8b95a1] absolute right-4 top-1/2 -translate-y-1/2" />
            </label>
          </form>

          <div className="shrink-0">
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
