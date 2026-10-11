export const locales = ['en', 'de', 'fr', 'es', 'pl', 'lt', 'lv', 'et'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  pl: { name: 'Polski', flag: '🇵🇱' },
  lt: { name: 'Lietuvių', flag: '🇱🇹' },
  lv: { name: 'Latviešu', flag: '🇱🇻' },
  et: { name: 'Eesti', flag: '🇪🇪' },
};

// Cloudflare cf-ipcountry mapping to locales
export const countryToLocaleMap: Record<string, Locale> = {
  // Lithuania
  LT: 'lt',
  // Latvia
  LV: 'lv',
  // Estonia
  EE: 'et',
  // Poland
  PL: 'pl',
  // Germany, Austria, Switzerland
  DE: 'de',
  AT: 'de',
  CH: 'de',
  // France, Belgium (FR)
  FR: 'fr',
  // Spain
  ES: 'es',
};
