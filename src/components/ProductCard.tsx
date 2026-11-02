'use client';

import React from 'react';
import { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';
import { laserTypeLabel } from '@/lib/laser-type';
import { ProductModal } from './ProductModal';

export function ProductCard({
  product,
  locale = 'en',
  index = 0,
}: {
  product: Product;
  locale?: Locale;
  index?: number;
}) {
  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const t = messages[locale] || messages.en;
  const name = product.name_i18n?.[locale] || product.name;

  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
        className="product-card group bg-white rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
      >
        <div className="relative aspect-[4/3] bg-[#f7f9fb] border-b border-[#eef1f4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#9f241d] text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1">
              {product.badge}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 flex flex-col p-4">
          <h3 className="font-semibold text-[15px] leading-snug text-[#1b283a] line-clamp-2 group-hover:text-[#9f241d] transition-colors">
            {name}
          </h3>
          <p className="text-[12px] text-[#6b7684] mt-1.5 line-clamp-1">
            {laserTypeLabel(product.laser_type, locale)}
          </p>
          <div className="mt-auto pt-4 flex items-end justify-between gap-3">
            <div className="text-[20px] font-semibold text-[#9f241d] leading-none">
              {product.price.toFixed(2)} €
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`text-[12px] font-bold uppercase tracking-wide transition-colors ${
                added ? 'text-emerald-700' : 'text-[#1b283a] hover:text-[#9f241d]'
              }`}
            >
              {added ? (
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {t.addedToCart}
                </span>
              ) : (
                t.addToCart
              )}
            </button>
          </div>
        </div>
      </article>

      <ProductModal
        product={product}
        locale={locale}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
