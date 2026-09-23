"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";
import { DAY_IMAGES } from "@/lib/tour-data";

export function Itinerary() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const day = t.itinerary.days[active];

  return (
    <section
      id="itinerary"
      className="scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="itinerary-title"
    >
      <div className="container-page">
        <div id="itinerary-title">
          <SectionHeading
            eyebrow={t.itinerary.eyebrow}
            title={t.itinerary.title}
            subtitle={t.itinerary.subtitle}
          />
        </div>

        {/* Day tabs */}
        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label={t.itinerary.title}
            className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:px-0"
          >
            {t.itinerary.days.map((d, i) => (
              <button
                key={d.label}
                role="tab"
                id={`day-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`day-panel-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`flex min-w-[220px] flex-1 shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 sm:min-w-0 sm:max-w-xs ${
                  i === active
                    ? "border-[var(--color-emerald-brand)] bg-[var(--color-emerald-brand)]/10 shadow-[var(--shadow-soft)]"
                    : "border-soft surface hover:border-[var(--color-emerald-brand)]/50"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DAY_IMAGES[i]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-emerald-deep)]">
                    {d.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[15px] font-semibold">
                    {d.theme}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active day panel */}
        <div
          role="tabpanel"
          id={`day-panel-${active}`}
          aria-labelledby={`day-tab-${active}`}
          key={active}
          className="animate-fade-up mt-10 overflow-hidden rounded-3xl border border-soft surface shadow-[var(--shadow-soft)]"
        >
          <div className="relative h-56 w-full sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DAY_IMAGES[active]}
              alt={day.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/90 via-[#0b1b2e]/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#3b2a06]">
                {day.label}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                {day.title}
              </h3>
              <p className="mt-1 text-sm italic text-white/85 sm:text-base">
                “{day.theme}”
              </p>
            </div>
          </div>

          {/* Vertical timeline */}
          <ol className="relative space-y-0 p-6 sm:p-9">
            {day.items.map((item, i) => (
              <li key={`${item.time}-${i}`} className="relative flex gap-5 pb-8 last:pb-0">
                {/* connector */}
                {i < day.items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-9 h-full w-px bg-gradient-to-b from-[var(--color-emerald-brand)]/50 to-transparent"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm ${
                    item.star
                      ? "gold-gradient text-[#3b2a06] shadow-[0_0_0_5px_rgba(212,168,83,0.18)]"
                      : "emerald-gradient text-white"
                  }`}
                >
                  {item.star ? "★" : "•"}
                </span>

                <div
                  className={`min-w-0 flex-1 rounded-2xl p-4 transition-colors sm:p-5 ${
                    item.star
                      ? "border border-[var(--color-gold)]/45 bg-[var(--color-gold)]/10"
                      : "surface-alt"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <time className="rounded-md bg-[var(--color-ocean)] px-2 py-0.5 font-mono text-xs font-semibold text-white dark:bg-[#24405f]">
                      {item.time}
                    </time>
                    {item.star && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">
                        ⭐ {t.itinerary.starLabel}
                      </span>
                    )}
                  </div>
                  <h4 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold sm:text-xl">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-3 border-t border-soft surface-alt px-6 py-4 text-sm font-semibold sm:px-9">
            <span aria-hidden="true">🌙</span>
            <span className="text-muted">{t.itinerary.overnightLabel}:</span>
            <span>{day.overnight}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
