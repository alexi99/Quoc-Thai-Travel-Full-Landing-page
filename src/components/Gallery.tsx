"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY_IMAGES } from "@/lib/tour-data";

/** Varying tile sizes create a masonry-like rhythm without layout shift. */
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export function Gallery() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((dir: number) => {
    setOpen((cur) =>
      cur === null
        ? cur
        : (cur + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }, []);

  // Keyboard controls + scroll lock for the lightbox.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  return (
    <section
      id="gallery"
      className="scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="gallery-title"
    >
      <div className="container-page">
        <div id="gallery-title">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
          />
        </div>

        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
          {GALLERY_IMAGES.map((src, i) => (
            <Reveal
              key={src}
              delay={(i % 4) * 60}
              className={`${SPANS[i] ?? ""} min-h-0`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${t.gallery.openHint}: ${t.gallery.captions[i]}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={t.gallery.captions[i]}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-[13px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {t.gallery.captions[i]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.captions[open]}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25"
          >
            ✕
          </button>
          <button
            type="button"
            aria-label={t.gallery.prev}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={t.gallery.next}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:right-6"
          >
            ›
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GALLERY_IMAGES[open]}
            alt={t.gallery.captions[open]}
            className="max-h-[78vh] w-auto max-w-[94vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-4 max-w-2xl text-center text-sm text-white/85">
            {t.gallery.captions[open]}{" "}
            <span className="ml-2 text-white/50">
              {open + 1} / {GALLERY_IMAGES.length}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
