export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { label: string; flag: string; native: string }> = {
  en: { label: "English", flag: "🇬🇧", native: "English" },
  fr: { label: "French", flag: "🇫🇷", native: "Français" },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
