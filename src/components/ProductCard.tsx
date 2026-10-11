'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { Check, Gauge } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';

export function ProductCard({
  product,
  locale = 'en',
}: {
  product: Product;
  locale?: Locale;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);
  const t = messages[locale] || messages.en;

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] hover:border-[#242423] transition-all duration-200 flex flex-col group overflow-hidden">
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

        <div className="absolute bottom-2 left-2 bg-[#242423]/90 text-[#ffffff] text-[10px] font-mono px-2 py-0.5">
          {product.laser_type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-[14px] text-[#242423] leading-snug line-clamp-2 group-hover:text-[#f5cb5c] transition-colors">
            {product.name}
          </h3>
          <p className="text-[12px] text-[#5f5e58] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Laser setting chip */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#242423] bg-[#f7f7f7] border border-[#e5e5e5] px-2 py-1 font-mono">
            <Gauge className="w-3 h-3 text-[#242423] shrink-0" />
            <span className="truncate">{product.recommended_power}</span>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-[#f0f0f0] space-y-2.5">
          <div className="flex items-baseline justify-between">
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
            <span className="text-[11px] text-[#5f5e58]">{t.vatIncluded}</span>
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
  );
}
