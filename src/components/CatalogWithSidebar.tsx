'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/types/category';
import { ProductCard } from './ProductCard';
import { Locale } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/products';

const BRAND_LOGOS: Record<string, string> = {
  Cloudray: '/brands/cloudray.png',
  Sculpfun: '/brands/sculpfun.png',
  Polymaker: '/brands/polymaker.png',
  Elegoo: '/brands/elegoo.png',
  Ortur: '/brands/ortur.png',
};

export function CatalogWithSidebar({
  products = PRODUCTS,
  locale = 'en',
}: {
  products?: Product[];
  locale?: Locale;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleCategoryEvent = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) setActiveCategory(detail);
    };

    const handleCatalogFilter = (event: Event) => {
      const detail = (event as CustomEvent<{ category?: string; brand?: string }>).detail;
      if (!detail) return;
      if (detail.category) setActiveCategory(detail.category);
      setActiveBrand(detail.brand || 'all');
    };

    const handleSearch = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === 'string') setSearchQuery(detail);
    };

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('cat_')) setActiveCategory(hash);
    };

    window.addEventListener('filter-category', handleCategoryEvent);
    window.addEventListener('filter-catalog', handleCatalogFilter);
    window.addEventListener('catalog-search', handleSearch);
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('filter-category', handleCategoryEvent);
      window.removeEventListener('filter-catalog', handleCatalogFilter);
      window.removeEventListener('catalog-search', handleSearch);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const visibleCategories = CATEGORIES.filter((cat) => {
    if (cat.id === 'all') return true;
    return products.some((product) => product.category_id === cat.id);
  });

  const brands = Object.entries(
    products.reduce<Record<string, number>>((counts, product) => {
      const brand = product.specs?.Brand;
      if (!brand) return counts;
      counts[brand] = (counts[brand] || 0) + 1;
      return counts;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const brandLabel: Record<string, string> = {
    en: 'Brands we sell',
    lt: 'Gamintojai, kuriais prekiaujame',
    de: 'Marken',
    fr: 'Marques',
    es: 'Marcas',
    pl: 'Marki',
    lv: 'Zīmoli',
    et: 'Brändid',
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category_id === activeCategory;
    const matchesBrand = activeBrand === 'all' || product.specs?.Brand === activeBrand;
    const haystack = [
      product.name,
      product.name_i18n?.[locale],
      product.description,
      product.description_i18n?.[locale],
      product.laser_type,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return matchesCategory && matchesBrand && haystack.includes(searchQuery.toLowerCase());
  });

  return (
    <section id="catalog-products" className="space-y-6">
      <div>
        <h3 className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#1b283a] mb-3">
          {brandLabel[locale] || brandLabel.en}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => setActiveBrand('all')}
            className={`brand-tile aspect-square px-3 text-[13px] sm:text-[15px] font-black uppercase tracking-wide leading-tight ${
              activeBrand === 'all' ? 'bg-[#9f241d] text-white' : 'bg-white text-[#1b283a] hover:text-[#9f241d]'
            }`}
          >
            {visibleCategories[0]?.name[locale] || visibleCategories[0]?.name.en}
          </button>
          {brands.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveBrand(name)}
              className={`brand-tile aspect-square p-3 flex flex-col items-center justify-center gap-2 ${
                activeBrand === name
                  ? 'bg-white ring-2 ring-[#9f241d]'
                  : 'bg-white hover:ring-2 hover:ring-[#e4e8ec]'
              }`}
            >
              {BRAND_LOGOS[name] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={BRAND_LOGOS[name]}
                  alt={name}
                  className="w-[82%] h-[52%] object-contain"
                />
              ) : (
                <span className="text-[18px] font-black text-[#1b283a]">{name}</span>
              )}
              <span className="text-[13px] font-semibold text-[#6b7684]">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <CategoryMarquee
          categories={visibleCategories.slice(0, Math.ceil(visibleCategories.length / 2))}
          direction="left"
          activeCategory={activeCategory}
          locale={locale}
          onSelect={setActiveCategory}
        />
        <CategoryMarquee
          categories={visibleCategories.slice(Math.ceil(visibleCategories.length / 2))}
          direction="right"
          activeCategory={activeCategory}
          locale={locale}
          onSelect={setActiveCategory}
        />
      </div>

      <p className="sr-only">{filteredProducts.length}</p>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 lg:items-start">
        <FilterSidebar
          locale={locale}
          categories={visibleCategories}
          brands={brands}
          products={products}
          activeCategory={activeCategory}
          activeBrand={activeBrand}
          onCategory={setActiveCategory}
          onBrand={setActiveBrand}
          onClear={() => {
            setActiveCategory('all');
            setActiveBrand('all');
            setSearchQuery('');
            window.dispatchEvent(new CustomEvent('catalog-search', { detail: '' }));
          }}
        />

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-[15px] font-semibold text-[#1b283a]">
              {{
                en: 'No products found',
                lt: 'Prekių nerasta',
                de: 'Keine Produkte gefunden',
                fr: 'Aucun produit trouvé',
                es: 'No hay productos',
                pl: 'Nie znaleziono produktów',
                lv: 'Preces nav atrastas',
                et: 'Tooteid ei leitud',
              }[locale]}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveBrand('all');
                setSearchQuery('');
                window.dispatchEvent(new CustomEvent('catalog-search', { detail: '' }));
              }}
              className="mt-4 h-11 px-5 bg-[#9f241d] text-white text-[13px] font-bold uppercase"
            >
              {visibleCategories[0]?.name[locale] || visibleCategories[0]?.name.en}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} locale={locale} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const filterText: Record<Locale, { title: string; category: string; brand: string; clear: string; allBrands: string }> = {
  en: { title: 'Filter', category: 'Category', brand: 'Brand', clear: 'Clear', allBrands: 'All brands' },
  lt: { title: 'Filtras', category: 'Kategorija', brand: 'Gamintojas', clear: 'Išvalyti', allBrands: 'Visi gamintojai' },
  de: { title: 'Filter', category: 'Kategorie', brand: 'Marke', clear: 'Zurücksetzen', allBrands: 'Alle Marken' },
  fr: { title: 'Filtre', category: 'Catégorie', brand: 'Marque', clear: 'Effacer', allBrands: 'Toutes les marques' },
  es: { title: 'Filtro', category: 'Categoría', brand: 'Marca', clear: 'Limpiar', allBrands: 'Todas las marcas' },
  pl: { title: 'Filtr', category: 'Kategoria', brand: 'Marka', clear: 'Wyczyść', allBrands: 'Wszystkie marki' },
  lv: { title: 'Filtrs', category: 'Kategorija', brand: 'Zīmols', clear: 'Notīrīt', allBrands: 'Visi zīmoli' },
  et: { title: 'Filter', category: 'Kategooria', brand: 'Bränd', clear: 'Tühjenda', allBrands: 'Kõik brändid' },
};

function FilterSidebar({
  locale,
  categories,
  brands,
  products,
  activeCategory,
  activeBrand,
  onCategory,
  onBrand,
  onClear,
}: {
  locale: Locale;
  categories: Category[];
  brands: [string, number][];
  products: Product[];
  activeCategory: string;
  activeBrand: string;
  onCategory: (id: string) => void;
  onBrand: (name: string) => void;
  onClear: () => void;
}) {
  const text = filterText[locale] || filterText.en;
  const dirty = activeCategory !== 'all' || activeBrand !== 'all';
  const categoryCount = (id: string) =>
    id === 'all' ? products.length : products.filter((product) => product.category_id === id).length;

  return (
    <aside className="bg-white rounded-lg p-4 lg:sticky lg:top-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-[18px] font-bold text-[#1b283a]">{text.title}</h3>
        {dirty && (
          <button type="button" onClick={onClear} className="text-[13px] font-semibold text-[#9f241d]">
            {text.clear}
          </button>
        )}
      </div>

      <p className="text-[12px] font-bold uppercase tracking-wide text-[#6b7684] mb-2">{text.category}</p>
      <ul className="space-y-0.5">
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onCategory(cat.id)}
                className={`w-full flex items-center justify-between gap-3 px-2 py-1.5 text-left text-[14px] ${
                  active ? 'text-[#9f241d] font-bold' : 'text-[#1b283a] hover:text-[#9f241d]'
                }`}
              >
                <span className="min-w-0">{cat.name[locale] || cat.name.en}</span>
                <span className="text-[12px] font-semibold text-[#6b7684]">{categoryCount(cat.id)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[12px] font-bold uppercase tracking-wide text-[#6b7684] mb-2">{text.brand}</p>
      <ul className="space-y-0.5">
        <li>
          <button
            type="button"
            onClick={() => onBrand('all')}
            className={`w-full flex items-center justify-between gap-3 px-2 py-1.5 text-left text-[14px] ${
              activeBrand === 'all' ? 'text-[#9f241d] font-bold' : 'text-[#1b283a] hover:text-[#9f241d]'
            }`}
          >
            <span>{text.allBrands}</span>
            <span className="text-[12px] font-semibold text-[#6b7684]">{products.length}</span>
          </button>
        </li>
        {brands.map(([name, count]) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onBrand(name)}
              className={`w-full flex items-center justify-between gap-3 px-2 py-1.5 text-left text-[14px] ${
                activeBrand === name ? 'text-[#9f241d] font-bold' : 'text-[#1b283a] hover:text-[#9f241d]'
              }`}
            >
              <span>{name}</span>
              <span className="text-[12px] font-semibold text-[#6b7684]">{count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function CategoryMarquee({
  categories,
  direction,
  activeCategory,
  locale,
  onSelect,
}: {
  categories: Category[];
  direction: 'left' | 'right';
  activeCategory: string;
  locale: Locale;
  onSelect: (id: string) => void;
}) {
  if (categories.length === 0) return null;
  const track = [...categories, ...categories];

  return (
    <div className="category-marquee overflow-hidden">
      <div className={`category-marquee-track ${direction === 'right' ? 'is-right' : 'is-left'}`}>
        {track.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={`${cat.id}-${index}`}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 min-h-[64px] px-6 text-[14px] sm:text-[15px] font-bold uppercase tracking-wide whitespace-nowrap ${
                isActive
                  ? 'bg-[#9f241d] text-white'
                  : 'bg-white text-[#1b283a] hover:text-[#9f241d]'
              }`}
            >
              {cat.name[locale] || cat.name.en}
            </button>
          );
        })}
      </div>
    </div>
  );
}
