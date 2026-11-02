'use client';

import { FormEvent, useState } from 'react';
import { CATEGORIES } from '@/lib/categories';
import { PRODUCTS } from '@/lib/products';
import { Locale } from '@/lib/i18n';

function openCatalog(categoryId: string, brand = 'all') {
  window.dispatchEvent(
    new CustomEvent('filter-catalog', {
      detail: { category: categoryId, brand },
    })
  );
  window.dispatchEvent(new CustomEvent('filter-category', { detail: categoryId }));
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function shortLabel(name: string) {
  return name
    .replace(/^(Cloudray|Sculpfun|Polymaker|Elegoo|Ortur)\s+/i, '')
    .replace(/\s+[–—]\s+.*$/, '')
    .replace(/\s+\(\d+[^)]*\)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function CategoryShowcase({
  locale,
  seeAll,
  viewAll,
}: {
  locale: Locale;
  seeAll: string;
  viewAll?: string;
}) {
  const categories = CATEGORIES.filter(
    (cat) => cat.id !== 'all' && PRODUCTS.some((product) => product.category_id === cat.id)
  );

  return (
    <div className="space-y-5">
      {viewAll && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => openCatalog('all')}
            className="text-[13px] font-bold uppercase tracking-wide text-[#9f241d] hover:underline"
          >
            {viewAll} »
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-7">
        {categories.map((cat) => {
          const items = PRODUCTS.filter((product) => product.category_id === cat.id);
          const brands = Object.entries(
            items.reduce<Record<string, number>>((counts, product) => {
              const brand = product.specs?.Brand;
              if (!brand) return counts;
              counts[brand] = (counts[brand] || 0) + 1;
              return counts;
            }, {})
          ).sort((a, b) => b[1] - a[1]);

          const subLinks =
            brands.length > 0
              ? brands.slice(0, 6).map(([brand, count]) => ({
                  key: brand,
                  label: `${brand} (${count})`,
                  onClick: () => openCatalog(cat.id, brand),
                }))
              : items.slice(0, 6).map((product) => ({
                  key: product.id,
                  label: shortLabel(product.name_i18n?.[locale] || product.name),
                  onClick: () => openCatalog(cat.id),
                }));

          const thumb =
            items.find((product) => product.images[0] && !product.images[0].includes('.png'))
              ?.images[0] || items.find((product) => product.images[0])?.images[0];
          const title = cat.name[locale] || cat.name.en;

          return (
            <article
              key={cat.id}
              className="category-card bg-white rounded-lg px-7 py-8 sm:px-9 sm:py-10 flex flex-col h-full min-h-[300px] lg:min-h-[320px]"
            >
              <button
                type="button"
                onClick={() => openCatalog(cat.id)}
                className="text-left text-[22px] sm:text-[26px] font-bold text-[#1b283a] tracking-tight hover:text-[#9f241d] transition-colors"
              >
                {title}
              </button>
              <div className="h-px bg-[#e4e8ec] mt-4 mb-5" />
              <div className="flex items-start gap-6 flex-1">
                <ul className="flex-1 min-w-0 space-y-2.5">
                  {subLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        type="button"
                        onClick={link.onClick}
                        title={link.label}
                        className="w-full text-left text-[15px] sm:text-[16px] leading-snug text-[#3c4a5a] hover:text-[#9f241d] break-words"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
                {thumb && (
                  <button
                    type="button"
                    onClick={() => openCatalog(cat.id)}
                    className="hidden sm:block w-[160px] h-[140px] xl:w-[180px] xl:h-[150px] shrink-0 overflow-hidden bg-[#eef1f4]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => openCatalog(cat.id)}
                className="mt-6 self-start text-[15px] sm:text-[16px] font-semibold text-[#1b283a] underline underline-offset-4 decoration-[#1b283a] hover:text-[#9f241d] hover:decoration-[#9f241d]"
              >
                {seeAll}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function NewsletterBand({
  title,
  text,
  placeholder,
  button,
  thanks,
  locale,
  errorText = 'Could not subscribe. Please try again.',
}: {
  title: string;
  text: string;
  placeholder: string;
  button: string;
  thanks: string;
  locale?: string;
  errorText?: string;
}) {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const email = new FormData(form).get('email');
    if (typeof email !== 'string' || !email.trim()) return;

    setPending(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale }),
      });
      if (!res.ok) {
        setError(errorText);
        return;
      }
      setDone(true);
    } catch {
      setError(errorText);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="bg-[#141e2a] text-white">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
        <p className="mt-3 text-[15px] text-white/75 max-w-xl">{text}</p>
        {done ? (
          <p className="mt-6 text-[16px] font-semibold text-white">{thanks}</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row max-w-2xl gap-0">
            <label className="sr-only" htmlFor="newsletter-email">
              {placeholder}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              disabled={pending}
              style={{ backgroundColor: '#ffffff', color: '#1b283a' }}
              className="h-[52px] w-full sm:flex-1 min-w-0 px-4 bg-white text-[#1b283a] placeholder:text-[#6b7785] border border-[#d5d8e0] outline-none focus:ring-2 focus:ring-[#9f241d] disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={pending}
              className="h-[52px] px-8 bg-[#9f241d] hover:bg-[#8c1f19] disabled:opacity-70 text-white text-[13px] font-bold uppercase tracking-wide"
            >
              {pending ? '…' : button}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-[14px] text-[#ffb4ae]">{error}</p>}
      </div>
    </section>
  );
}
