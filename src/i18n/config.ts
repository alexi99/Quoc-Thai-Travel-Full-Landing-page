import type { Dictionary } from "./types";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import { vi } from "./locales/vi";
import { es } from "./locales/es";
import { zh } from "./locales/zh";
import { it } from "./locales/it";
import { ko } from "./locales/ko";

export const LOCALES = ["en", "fr", "vi", "es", "zh", "it", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type LocaleMeta = {
  code: Locale;
  /** Endonym shown in the switcher. */
  label: string;
  flag: string;
  htmlLang: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: "en", label: "English", flag: "🇬🇧", htmlLang: "en" },
  fr: { code: "fr", label: "Français", flag: "🇫🇷", htmlLang: "fr" },
  vi: { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", htmlLang: "vi" },
  es: { code: "es", label: "Español", flag: "🇪🇸", htmlLang: "es" },
  zh: { code: "zh", label: "中文", flag: "🇨🇳", htmlLang: "zh-Hans" },
  it: { code: "it", label: "Italiano", flag: "🇮🇹", htmlLang: "it" },
  ko: { code: "ko", label: "한국어", flag: "🇰🇷", htmlLang: "ko" },
};

export const LOCALE_ORDER: Locale[] = ["en", "fr", "vi", "es", "zh", "it", "ko"];

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr,
  vi,
  es,
  zh,
  it,
  ko,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Map a raw navigator language such as "zh-TW" or "fr-CA" onto a supported locale. */
export function matchLocale(raw: string | undefined | null): Locale | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const base = lower.split("-")[0];
  if (base === "zh") return "zh";
  if (isLocale(base)) return base;
  return null;
}

/** Interpolate {placeholders} inside a translated string. */
export function tpl(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
