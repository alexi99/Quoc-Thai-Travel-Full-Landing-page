"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";
import { TOUR } from "@/lib/tour-data";

export function Testimonials() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = t.reviews.items.length;

  // Gentle auto-advance, paused on hover/focus for accessibility.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      7000,
    );
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-28 overflow-hidden ocean-gradient py-20 text-white sm:py-24"
      aria-labelledby="reviews-title"
    >
      <div className="container-page">
        <div id="reviews-title">
          <SectionHeading
            eyebrow={t.reviews.eyebrow}
            title={t.reviews.title}
            subtitle={t.reviews.subtitle}
            tone="light"
          />
        </div>

        {/* Aggregate rating */}
        <Reveal className="mt-8">
          <div className="mx-auto flex max-w-md flex-col items-center gap-1.5 rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-center backdrop-blur-md">
            <span className="text-2xl text-[var(--color-gold)]" aria-hidden="true">
              ★★★★★
            </span>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
              {TOUR.ratingValue} / 5
            </p>
            <p className="text-sm text-white/75">{t.reviews.aggregate}</p>
          </div>
        </Reveal>

        {/* Carousel */}
        <div
          className="relative mx-auto mt-10 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="overflow-hidden rounded-3xl"
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {t.reviews.items.map((review) => (
                <figure
                  key={review.name}
                  className="w-full shrink-0 border border-white/15 bg-white/10 p-7 backdrop-blur-md sm:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--color-gold)]"
                  >
                    “
                  </span>
                  <blockquote className="mt-2 text-lg leading-relaxed sm:text-xl">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl"
                    >
                      {review.flag}
                    </span>
                    <span>
                      <span className="block font-semibold">{review.name}</span>
                      <span className="block text-sm text-white/70">
                        {review.location} ·{" "}
                        <span className="text-[var(--color-gold)]">★★★★★</span> ·{" "}
                        {t.reviews.verified}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label={t.gallery.prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-xl hover:bg-white/20"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {t.reviews.items.map((review, i) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1} / ${count}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-[var(--color-gold)]"
                      : "w-2.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label={t.gallery.next}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-xl hover:bg-white/20"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
