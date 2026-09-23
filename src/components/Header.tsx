"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { LOCALE_META, LOCALE_ORDER, tpl, type Locale } from "@/i18n/config";
import { NAV_SECTIONS, TOUR } from "@/lib/tour-data";

type Availability = { date: string; spots: number } | null;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const { t, locale, setLocale, suggested, dismissSuggestion, theme, toggleTheme } =
    useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [availability, setAvailability] = useState<Availability>(null);
  const [urgencyClosed, setUrgencyClosed] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  // Scroll state: shrink/blur the header and drive the reading progress bar.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const height =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setProgress(Math.min(100, Math.max(0, (y / height) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the language dropdown on outside click / Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  // Live availability for the urgency banner (computed from real bookings).
  useEffect(() => {
    let active = true;
    fetch("/api/availability")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data?.date) setAvailability(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const localeDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, {
        day: "numeric",
        month: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const pick = (next: Locale) => {
    setLocale(next);
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full gold-gradient transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Urgency banner */}
        {availability && !urgencyClosed && (
          <div className="emerald-gradient text-white">
            <div className="container-page relative flex items-center justify-center gap-3 py-1.5 text-center text-[13px] font-medium sm:text-sm">
              <span aria-hidden="true">🔥</span>
              <p>
                {tpl(t.urgency.text, {
                  spots: availability.spots,
                  date: localeDate(availability.date),
                })}
              </p>
              <button
                type="button"
                onClick={() => scrollToId("booking")}
                className="hidden rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold underline-offset-2 hover:bg-white/30 sm:inline-block"
              >
                {t.urgency.cta}
              </button>
              <button
                type="button"
                onClick={() => setUrgencyClosed(true)}
                aria-label={t.common.close}
                className="absolute right-3 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div
          className={`border-b transition-all duration-300 ${
            scrolled
              ? "border-soft bg-[var(--page-bg)]/85 shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "border-transparent bg-[var(--page-bg)]/40 backdrop-blur-sm"
          }`}
        >
          <div
            className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? "py-2" : "py-3.5"
            }`}
          >
            {/* Logo */}
            <a
              href="#top"
              className="flex shrink-0 items-center gap-2.5"
              aria-label={TOUR.brand}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl emerald-gradient text-lg text-white shadow-[var(--shadow-soft)]">
                ⛰
              </span>
              <span className="leading-tight">
                <span className="block font-[family-name:var(--font-display)] text-[15px] font-bold tracking-tight sm:text-base">
                  Vietnam Wonders
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
                  Tour
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className="rounded-lg px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--page-fg)]"
                >
                  {t.nav[s.key]}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
                title={theme === "dark" ? t.common.lightMode : t.common.darkMode}
                className="hidden h-10 w-10 place-items-center rounded-full border border-soft text-base transition-colors hover:bg-[var(--surface-alt)] sm:grid"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              {/* Language selector */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label={t.nav.language}
                  className="flex h-10 items-center gap-1.5 rounded-full border border-soft px-3 text-sm font-medium transition-colors hover:bg-[var(--surface-alt)]"
                >
                  <span aria-hidden="true" className="text-base">
                    {LOCALE_META[locale].flag}
                  </span>
                  <span className="hidden sm:inline">{LOCALE_META[locale].label}</span>
                  <span aria-hidden="true" className="text-[10px] opacity-60">
                    ▼
                  </span>
                </button>
                {langOpen && (
                  <ul
                    role="listbox"
                    aria-label={t.nav.language}
                    className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-soft surface shadow-[var(--shadow-lift)]"
                  >
                    {LOCALE_ORDER.map((code) => (
                      <li key={code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={code === locale}
                          onClick={() => pick(code)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] transition-colors hover:bg-[var(--surface-alt)] ${
                            code === locale
                              ? "font-semibold text-[var(--color-emerald-deep)]"
                              : ""
                          }`}
                        >
                          <span aria-hidden="true" className="text-lg">
                            {LOCALE_META[code].flag}
                          </span>
                          {LOCALE_META[code].label}
                          {code === locale && (
                            <span aria-hidden="true" className="ml-auto">
                              ✓
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => scrollToId("booking")}
                className="hidden h-10 items-center rounded-full gold-gradient px-5 text-sm font-bold text-[#3b2a06] shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03] active:scale-100 sm:flex"
              >
                {t.common.bookNow}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={t.nav.menu}
                aria-expanded={menuOpen}
                className="grid h-10 w-10 place-items-center rounded-full border border-soft lg:hidden"
              >
                <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>

          {/* Mobile nav panel */}
          {menuOpen && (
            <nav
              className="border-t border-soft surface lg:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="container-page grid gap-1 py-3">
                {NAV_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        scrollToId(s.id);
                      }}
                      className="w-full rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-[var(--surface-alt)]"
                    >
                      {t.nav[s.key]}
                    </button>
                  </li>
                ))}
                <li className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToId("booking");
                    }}
                    className="flex-1 rounded-full gold-gradient px-5 py-3 text-base font-bold text-[#3b2a06]"
                  >
                    {t.common.bookNow}
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
                    className="grid h-12 w-12 place-items-center rounded-full border border-soft"
                  >
                    {theme === "dark" ? "☀️" : "🌙"}
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {/* Browser language suggestion */}
        {suggested && (
          <div className="container-page pt-2">
            <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-soft surface px-4 py-2.5 text-sm shadow-[var(--shadow-soft)]">
              <span aria-hidden="true" className="text-lg">
                {LOCALE_META[suggested].flag}
              </span>
              <p className="text-muted">
                {tpl(t.suggest.text, { lang: LOCALE_META[suggested].label })}
              </p>
              <button
                type="button"
                onClick={() => pick(suggested)}
                className="rounded-full emerald-gradient px-4 py-1.5 text-xs font-bold text-white"
              >
                {tpl(t.suggest.accept, { lang: LOCALE_META[suggested].label })}
              </button>
              <button
                type="button"
                onClick={dismissSuggestion}
                className="rounded-full border border-soft px-4 py-1.5 text-xs font-semibold text-muted"
              >
                {t.suggest.dismiss}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
