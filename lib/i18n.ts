export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeHtmlLang(locale: Locale) {
  return locale === "id" ? "id" : "en";
}

export function localeOpenGraph(locale: Locale) {
  return locale === "id" ? "id_ID" : "en_SG";
}

export function localeAlternateOpenGraph(locale: Locale) {
  return locale === "id" ? ["en_SG", "en_MY"] : ["id_ID", "en_MY"];
}
