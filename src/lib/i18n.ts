export const locales = ['en', 'de', 'fr', 'es', 'pl', 'lt', 'lv', 'et'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, { name: string; flag: string; countryCode: string }> = {
  en: { name: 'English', flag: '🇬🇧', countryCode: 'gb' },
  de: { name: 'Deutsch', flag: '🇩🇪', countryCode: 'de' },
  fr: { name: 'Français', flag: '🇫🇷', countryCode: 'fr' },
  es: { name: 'Español', flag: '🇪🇸', countryCode: 'es' },
  pl: { name: 'Polski', flag: '🇵🇱', countryCode: 'pl' },
  lt: { name: 'Lietuvių', flag: '🇱🇹', countryCode: 'lt' },
  lv: { name: 'Latviešu', flag: '🇱🇻', countryCode: 'lv' },
  et: { name: 'Eesti', flag: '🇪🇪', countryCode: 'ee' },
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
