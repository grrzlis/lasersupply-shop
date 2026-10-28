'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { Check, Gauge, Info } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import { ProductModal } from './ProductModal';

export function ProductCard({
  product,
  locale = 'en',
}: {
  product: Product;
  locale?: Locale;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const t = messages[locale] || messages.en;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div 
        onClick={() => setModalOpen(true)}
        className="bg-[#ffffff] border border-[#e5e5e5] hover:border-[#242423] transition-all duration-200 flex flex-col group overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
      >
        {/* Product Image */}
        <div className="relative aspect-square w-full bg-[#f9f9f9] border-b border-[#f0f0f0] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.badge && (
            <span className="absolute top-2 left-2 bg-[#f5cb5c] text-[#242423] font-extrabold text-[11px] tracking-tight px-2 py-0.5 uppercase border border-[#242423]/10">
              {product.badge}
            </span>
          )}

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-1 rounded-full">
            <Info className="w-4 h-4" />
          </div>

          <div className="absolute bottom-2 left-2 bg-[#242423]/90 text-[#ffffff] text-[10px] font-mono px-2 py-0.5">
            {product.laser_type}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-[14px] text-[#242423] leading-snug line-clamp-2 group-hover:text-[#f5cb5c] transition-colors">
              {product.name_i18n?.[locale] || product.name}
            </h3>
            <p className="text-[12px] text-[#5f5e58] mt-1 line-clamp-2 leading-relaxed">
              {product.description_i18n?.[locale] || product.description}
            </p>

            {/* Laser setting chip */}
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#242423] bg-[#f7f7f7] border border-[#e5e5e5] px-2 py-1 font-mono">
              <Gauge className="w-3 h-3 text-[#242423] shrink-0" />
              <span className="truncate">{product.recommended_power}</span>
            </div>
          </div>

          {/* Pricing and Action */}
          <div className="pt-3 border-t border-[#f0f0f0] space-y-2.5">
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-[#242423]">
                  {product.price.toFixed(2)} €
                </span>
                {product.compare_at_price && (
                  <span className="text-xs text-[#808080] line-through font-mono">
                    {product.compare_at_price.toFixed(2)} €
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded tracking-tight">
                ✓ {t.freeTrackedShipping || 'Free Shipping'}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full min-h-[42px] font-bold text-[13px] tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer uppercase ${
                added
                  ? 'bg-[#242423] text-[#ffffff]'
                  : 'bg-[#f5cb5c] hover:bg-[#f2bc2c] text-[#242423] border border-[#242423]/10'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> {t.addedToCart}
                </>
              ) : (
                t.addToCart
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup with Full Detailed Description */}
      <ProductModal
        product={product}
        locale={locale}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
