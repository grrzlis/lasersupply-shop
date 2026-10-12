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

// Crisp SVG flags for cross-browser / Windows reliability
function CountryFlag({ code }: { code: string }) {
  switch (code) {
    case 'lt':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 5 3">
          <rect width="5" height="1" y="0" fill="#FDB913" />
          <rect width="5" height="1" y="1" fill="#006A44" />
          <rect width="5" height="1" y="2" fill="#C1272D" />
        </svg>
      );
    case 'gb':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 60 30">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#s)" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case 'de':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 5 3">
          <rect width="5" height="1" y="0" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      );
    case 'fr':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 3 2">
          <rect width="1" height="2" x="0" fill="#002395" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
      );
    case 'es':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 3 2">
          <rect width="3" height="0.5" y="0" fill="#AA151B" />
          <rect width="3" height="1" y="0.5" fill="#F1BF00" />
          <rect width="3" height="0.5" y="1.5" fill="#AA151B" />
        </svg>
      );
    case 'pl':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 8 5">
          <rect width="8" height="2.5" y="0" fill="#FFFFFF" />
          <rect width="8" height="2.5" y="2.5" fill="#DC143C" />
        </svg>
      );
    case 'lv':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 5 3">
          <rect width="5" height="1.2" y="0" fill="#9E3039" />
          <rect width="5" height="0.6" y="1.2" fill="#FFFFFF" />
          <rect width="5" height="1.2" y="1.8" fill="#9E3039" />
        </svg>
      );
    case 'ee':
      return (
        <svg className="w-4 h-3 rounded-xs shadow-xs shrink-0" viewBox="0 0 33 21">
          <rect width="33" height="7" y="0" fill="#0072CE" />
          <rect width="33" height="7" y="7" fill="#000000" />
          <rect width="33" height="7" y="14" fill="#FFFFFF" />
        </svg>
      );
    default:
      return null;
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
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f6f6f6] hover:bg-[#eaeaea] border border-[#e5e5e5] rounded-md text-xs font-semibold text-[#242423] transition cursor-pointer"
        aria-label="Choose language"
      >
        <CountryFlag code={current.countryCode} />
        <span className="uppercase text-[11px] font-mono font-bold">{currentLocale}</span>
        <ChevronDown className="w-3 h-3 text-[#5f5e58]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-[#ffffff] border border-[#d4d4d4] rounded-md shadow-xl z-50 py-1 overflow-hidden">
          {locales.map((loc) => {
            const info = languageNames[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition cursor-pointer ${
                  isSelected ? 'bg-[#f5cb5c]/20 font-bold text-[#242423]' : 'hover:bg-[#f6f6f6] text-[#242423]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CountryFlag code={info.countryCode} />
                  <span>{info.name}</span>
                </span>
                <span className="text-[10px] uppercase font-mono text-[#8a8a8a]">{loc}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
