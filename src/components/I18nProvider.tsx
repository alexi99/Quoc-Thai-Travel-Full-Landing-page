"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  dictionaries,
  isLocale,
  matchLocale,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const STORAGE_KEY = "vwt.locale";
const THEME_KEY = "vwt.theme";
const SUGGEST_KEY = "vwt.langSuggestDismissed";

type Theme = "light" | "dark";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
  /** Locale detected from the browser that differs from the active one. */
  suggested: Locale | null;
  dismissSuggestion: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [suggested, setSuggested] = useState<Locale | null>(null);
  const [theme, setTheme] = useState<Theme>("light");

  // Restore saved preferences and detect the browser language on first paint.
  // These reads must happen after hydration (localStorage/navigator are
  // browser-only), so a one-off synchronous state sync here is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    // 1. Explicit ?lang= wins (these are the URLs used by our hreflang tags).
    const fromQuery = new URLSearchParams(window.location.search).get("lang");

    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }

    if (isLocale(fromQuery)) {
      setLocaleState(fromQuery);
      try {
        window.localStorage.setItem(STORAGE_KEY, fromQuery);
      } catch {
        /* ignore */
      }
    } else if (isLocale(saved)) {
      setLocaleState(saved);
    } else {
      const detected = matchLocale(navigator.language);
      let dismissed = false;
      try {
        dismissed = window.localStorage.getItem(SUGGEST_KEY) === "1";
      } catch {
        dismissed = false;
      }
      if (detected && detected !== DEFAULT_LOCALE && !dismissed) {
        setSuggested(detected);
      }
    }

    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem(THEME_KEY);
    } catch {
      savedTheme = null;
    }
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keep <html lang> and the document title in sync with the active locale.
  useEffect(() => {
    const dict = dictionaries[locale];
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
    document.title = dict.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", dict.meta.description);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setSuggested(null);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — preference is kept for the session only */
    }
    // Keep the URL shareable without triggering a navigation/reload.
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
  }, []);

  const dismissSuggestion = useCallback(() => {
    setSuggested(null);
    try {
      window.localStorage.setItem(SUGGEST_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
      suggested,
      dismissSuggestion,
      theme,
      toggleTheme,
    }),
    [locale, setLocale, suggested, dismissSuggestion, theme, toggleTheme],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
