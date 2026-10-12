'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/lib/categories';
import { ProductCard } from './ProductCard';
import { Locale } from '@/lib/i18n';
import { 
  Layers, 
  Shield, 
  Coffee, 
  TreePine, 
  Tag, 
  Sparkles, 
  Wrench, 
  Package, 
  Check,
  Search
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  TreePine: <TreePine className="w-4 h-4" />,
  Tag: <Tag className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
};

export function CatalogWithSidebar({
  products,
  locale = 'en',
}: {
  products: Product[];
  locale?: Locale;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleCategoryEvent = (e: any) => {
      if (e.detail) {
        setActiveCategory(e.detail);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('cat_')) {
        setActiveCategory(hash);
      } else if (hash === 'catalog') {
        setActiveCategory('all');
      }
    };

    window.addEventListener('filter-category', handleCategoryEvent);
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('filter-category', handleCategoryEvent);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category_id === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.laser_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Left Sidebar: Categories */}
      <aside className="w-full lg:w-[260px] flex-shrink-0 bg-[#ffffff] border border-[#e5e5e5] p-5 space-y-6 lg:sticky lg:top-24">
        <div>
          <div className="text-[11px] font-mono font-bold uppercase text-[#5f5e58] tracking-wider mb-2">
            Categories
          </div>
          <h3 className="text-base font-extrabold text-[#242423]">
            Material Catalog
          </h3>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a8a8a] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blanks..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#e0e0e0] focus:border-[#242423] focus:outline-none transition"
          />
        </div>

        {/* Category List */}
        <nav className="flex flex-col space-y-1">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? products.length 
              : products.filter(p => p.category_id === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const el = document.getElementById('catalog-products');
                  if (el && window.innerWidth < 1024) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold transition text-left w-full ${
                  isActive
                    ? 'bg-[#242423] text-[#ffffff]'
                    : 'text-[#242423] hover:bg-[#f5f5f5]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-[#f5cb5c]' : 'text-[#8a8a8a]'}>
                    {(cat.icon && iconMap[cat.icon]) || <Layers className="w-4 h-4" />}
                  </span>
                  <span className="truncate">{cat.name[locale] || cat.name.en}</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-[#3e3e3c] text-[#f5cb5c]' : 'bg-[#f0f0f0] text-[#666666]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Laser compatibility indicator */}
        <div className="pt-4 border-t border-[#e5e5e5] space-y-2 text-[11px] text-[#5f5e58]">
          <div className="font-bold text-[#242423] uppercase text-[10px] tracking-wider">
            Laser Ready
          </div>
          <p className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> Diode (xTool, Ortur, Creality)
          </p>
          <p className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> CO2 & Fiber Certified
          </p>
        </div>
      </aside>

      {/* Right Content: Product Grid */}
      <section id="catalog-products" className="flex-1 w-full space-y-6">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
          <div className="text-xs text-[#5f5e58]">
            Showing <strong className="text-[#242423]">{filteredProducts.length}</strong> items
          </div>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs font-bold text-[#f5cb5c] bg-[#242423] px-2.5 py-1 hover:bg-[#333333] transition"
            >
              Reset filter ✕
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-12 text-center space-y-3">
            <p className="text-sm font-bold text-[#242423]">No products found</p>
            <p className="text-xs text-[#5f5e58]">Try adjusting your search query or category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#242423] text-[#ffffff] font-bold text-xs uppercase"
            >
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
