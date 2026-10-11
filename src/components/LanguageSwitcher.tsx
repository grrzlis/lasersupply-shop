'use client';

import React from 'react';
import { locales, languageNames, Locale } from '@/lib/i18n';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

function setLocaleCookie(locale: string) {
  if (typeof window !== 'undefined') {
    window.document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
  }
}

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    setIsOpen(false);
    setLocaleCookie(newLocale);

    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || `/${newLocale}`);
  };

  const current = languageNames[currentLocale] || languageNames.en;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f6f6f6] hover:bg-[#eaeaea] border border-[#e5e5e5] text-xs font-semibold text-[#242423] transition cursor-pointer"
        aria-label="Choose language"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="hidden sm:inline uppercase text-[11px] font-mono">{currentLocale}</span>
        <ChevronDown className="w-3 h-3 text-[#5f5e58]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-[#ffffff] border border-[#242423] shadow-lg z-50 py-1">
          {locales.map((loc) => {
            const info = languageNames[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition cursor-pointer ${
                  isSelected ? 'bg-[#f5cb5c] font-bold text-[#242423]' : 'hover:bg-[#f6f6f6] text-[#242423]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{info.flag}</span>
                  <span>{info.name}</span>
                </span>
                <span className="text-[10px] uppercase font-mono text-[#5f5e58]">{loc}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
