"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { TOUR } from "@/lib/tour-data";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { t } = useI18n();
  const [offset, setOffset] = useState(0);

  // Subtle parallax on the background image.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.25));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[var(--color-ocean-deep)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-halong.jpg"
          alt="Sunrise over the limestone karst islands of Ha Long Bay, Vietnam"
          fetchPriority="high"
          decoding="async"
          className="h-[118%] w-full object-cover"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0b1b2e]/85 via-[#0b1b2e]/55 to-[#0b1b2e]/92"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0b1b2e]/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container-page w-full pb-28 pt-36 text-white sm:pt-40">
        <div className="max-w-3xl">
          {/* Rating badge */}
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold backdrop-blur-md sm:text-sm">
            <span aria-hidden="true" className="text-[var(--color-gold)]">
              ★★★★★
            </span>
            {t.hero.badge}
          </p>

          <h1
            className="animate-fade-up mt-6 font-[family-name:var(--font-display)] text-[2.35rem] font-bold leading-[1.1] text-balance-wrap drop-shadow-sm sm:text-6xl lg:text-[4.2rem]"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.title}{" "}
            <span className="bg-gradient-to-r from-[#f2d79a] via-[#d4a853] to-[#e8c47c] bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg font-medium text-white/90 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <button
              type="button"
              onClick={() => scrollToId("booking")}
              className="rounded-full gold-gradient px-8 py-4 text-base font-bold text-[#3b2a06] shadow-[0_18px_40px_-18px_rgba(212,168,83,0.9)] transition-transform hover:scale-[1.03] active:scale-100 sm:text-lg"
            >
              {t.hero.ctaPrimary} →
            </button>
            <button
              type="button"
              onClick={() => scrollToId("itinerary")}
              className="rounded-full border-2 border-white/60 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:text-lg"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          <p
            className="animate-fade-up mt-6 text-sm text-white/70"
            style={{ animationDelay: "300ms" }}
          >
            {t.common.from} <strong className="text-white">${TOUR.priceAdultUsd}</strong>{" "}
            {t.common.perPerson}
          </p>
        </div>

        {/* Trust badges */}
        <ul
          className="animate-fade-up mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          style={{ animationDelay: "360ms" }}
        >
          {t.hero.trust.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-emerald-brand)] text-xs text-white"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/70 md:flex"
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">
          {t.hero.scroll}
        </span>
        <span className="animate-float text-xl">↓</span>
      </div>
    </section>
  );
}
