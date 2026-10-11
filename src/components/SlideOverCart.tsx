'use client';

import React from 'react';
import { useCartStore } from '@/lib/cart-store';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { messages } from '@/lib/translations';

export function SlideOverCart({ locale = 'en' }: { locale?: Locale }) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [loading, setLoading] = React.useState(false);
  const t = messages[locale] || messages.en;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            images: i.product.images,
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe Checkout test redirect: ' + (data.message || 'Ready for API keys'));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 50.0;
  const progressToFreeShipping = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1c1c1a]/50 backdrop-blur-[2px] transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] text-[#1c1c1a] border-l border-[#ddd9cf] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#ddd9cf] flex items-center justify-between bg-[#fafaf8]">
            <div className="flex items-center gap-2">
              <span className="bg-[#1c1c1a] text-[#f0c84a] p-1 font-bold">
                <Zap className="w-3.5 h-3.5 fill-[#f0c84a]" />
              </span>
              <h2 className="text-[15px] font-bold tracking-tight">{t.cart}</h2>
              <span className="bg-[#e9e6df] text-[11px] font-mono px-2 py-0.5 font-bold text-[#1c1c1a]">
                {items.length}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-[#5f5e58] hover:text-[#1c1c1a] hover:bg-[#e9e6df] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="px-5 py-3 bg-[#f6f5f2] border-b border-[#ddd9cf] text-xs">
            {totalPrice >= freeShippingThreshold ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> {t.freeShippingUnlocked}
              </span>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#5f5e58] text-[12px]">
                  <span>{(freeShippingThreshold - totalPrice).toFixed(2)} € {t.awayFromFreeShipping}</span>
                  <span className="font-mono">{progressToFreeShipping.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#ddd9cf] overflow-hidden">
                  <div
                    className="h-full bg-[#f0c84a] transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#5f5e58] space-y-3">
                <p className="text-sm">{t.cartEmpty}</p>
                <button
                  onClick={closeCart}
                  className="px-4 py-2 bg-[#f0c84a] text-[#1c1c1a] font-bold text-xs border border-[#ddd9cf] cursor-pointer"
                >
                  {t.browseBlanks}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-[#fbfbfa] border border-[#ddd9cf] items-center"
                >
                  <div className="relative w-16 h-16 border border-[#ddd9cf] bg-[#f6f5f2] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold text-[#1c1c1a] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[13px] font-bold text-[#1c1c1a] font-mono mt-0.5">
                      {item.product.price.toFixed(2)} €
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#ddd9cf] bg-[#ffffff]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#5f5e58] hover:text-[#1c1c1a]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#5f5e58] hover:text-[#1c1c1a]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-[#5f5e58] hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#ddd9cf] bg-[#fafaf8] space-y-3.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] text-[#5f5e58]">{t.totalWithVat}</span>
                <span className="text-xl font-bold text-[#1c1c1a] bg-[#f0c84a] px-2 py-0.5">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full min-h-[44px] px-4 bg-[#f0c84a] hover:bg-[#e5bc3b] text-[#1c1c1a] font-bold text-[13px] flex items-center justify-center gap-2 border border-[#1c1c1a]/15 shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                {loading ? '...' : t.checkoutStripe}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#5f5e58]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.paymentMethods}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
