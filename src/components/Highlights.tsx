"use client";

import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";

const CARD_IMAGES = [
  "/images/tam-coc.jpg",
  "/images/cabin-balcony.jpg",
  "/images/phat-diem.jpg",
  "/images/titop-island.jpg",
  "/images/cuisine.jpg",
  "/images/kayak-luon-cave.jpg",
];

export function Highlights() {
  const { t } = useI18n();

  return (
    <section
      id="highlights"
      className="surface-alt scroll-mt-28 border-y border-soft py-20 sm:py-24"
      aria-labelledby="highlights-title"
    >
      <div className="container-page">
        <div id="highlights-title">
          <SectionHeading
            eyebrow={t.highlights.eyebrow}
            title={t.highlights.title}
            subtitle={t.highlights.subtitle}
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.highlights.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 90}>
              <article className="group h-full overflow-hidden rounded-3xl border border-soft surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CARD_IMAGES[i]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/70 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/95 text-2xl shadow-lg"
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
