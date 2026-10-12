'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { X, Check, Gauge, ShieldCheck, Truck, Wrench, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';

export function ProductModal({
  product,
  locale = 'en',
  isOpen,
  onClose,
}: {
  product: Product | null;
  locale?: Locale;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = React.useState(0);
  const t = messages[locale] || messages.en;

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const title = product.name_i18n?.[locale] || product.name;
  const fullDesc = product.full_description_i18n?.[locale] || product.full_description || product.description_i18n?.[locale] || product.description;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-[#ffffff] text-[#242423] w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#e5e5e5] shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#f5f5f5] hover:bg-[#242423] hover:text-[#ffffff] p-2 transition-colors border border-[#e5e5e5]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-[#f9f9f9] border border-[#e5e5e5] overflow-hidden">
              <Image
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#f5cb5c] text-[#242423] font-extrabold text-[11px] tracking-tight px-2.5 py-1 uppercase border border-[#242423]/10">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`relative w-16 h-16 shrink-0 border-2 transition-all ${
                      selectedImgIdx === idx ? 'border-[#f5cb5c] scale-95' : 'border-[#e5e5e5] hover:border-[#242423]'
                    }`}
                  >
                    <Image src={img} alt={`${title} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[12px] text-[#5f5e58]">
              <div className="flex items-center gap-2 p-2 bg-[#f9f9f9] border border-[#f0f0f0]">
                <Truck className="w-4 h-4 text-[#f5cb5c] shrink-0" />
                <span>EU Fast Tracked Dispatch</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#f9f9f9] border border-[#f0f0f0]">
                <ShieldCheck className="w-4 h-4 text-[#f5cb5c] shrink-0" />
                <span>100% Genuine Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Info */}
          <div className="flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888888] uppercase tracking-wider">
                <span>SKU: {product.supplier_sku}</span>
                <span>•</span>
                <span className="text-[#242423] font-bold">{product.laser_type}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#242423] leading-snug">
                {title}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 py-2 border-y border-[#f0f0f0]">
                <span className="text-3xl font-black text-[#242423]">
                  {product.price.toFixed(2)} €
                </span>
                {product.compare_at_price && (
                  <span className="text-sm text-[#888888] line-through font-mono">
                    {product.compare_at_price.toFixed(2)} €
                  </span>
                )}
                <span className="text-xs text-[#2e7d32] font-bold bg-[#e8f5e9] px-2 py-0.5 ml-auto">
                  {(t as any).inStock || 'In Stock · Ready to Ship'}
                </span>
              </div>

              {/* Laser Power / Specs Highlight */}
              <div className="flex items-center gap-2 text-xs font-mono bg-[#f7f7f7] border border-[#e5e5e5] p-2.5">
                <Gauge className="w-4 h-4 text-[#f5cb5c] shrink-0" />
                <span>{product.recommended_power}</span>
              </div>

              {/* Comprehensive Description Body */}
              <div className="text-sm text-[#444444] leading-relaxed space-y-3 prose prose-sm max-w-none max-h-60 overflow-y-auto pr-2">
                <div className="whitespace-pre-line font-sans">
                  {fullDesc}
                </div>
              </div>

              {/* Specs Grid */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#f0f0f0]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#242423]">
                    {(t as any).techSpecs || 'Technical Specifications'}:
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="bg-[#fafafa] p-1.5 border border-[#eeeeee]">
                        <span className="text-[#888888] block text-[10px]">{key}</span>
                        <span className="font-semibold text-[#242423] truncate block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#f0f0f0]">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 font-extrabold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#2e7d32] text-[#ffffff]'
                    : 'bg-[#f5cb5c] hover:bg-[#e6be4f] text-[#242423]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <span>{t.addToCart}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
