"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/tour-data";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="surface-alt scroll-mt-28 border-y border-soft py-20 sm:py-24"
      aria-labelledby="faq-title"
    >
      <div className="container-page">
        <div id="faq-title">
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {t.faq.items.map((item, i) => {
            const expanded = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i, 5) * 50}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    expanded
                      ? "border-[var(--color-emerald-brand)]/45 surface"
                      : "border-soft surface"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : i)}
                      aria-expanded={expanded}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold hover:bg-[var(--surface-alt)] sm:px-6"
                    >
                      <span className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 text-sm font-bold text-[var(--color-emerald-deep)]"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full surface-alt text-base transition-transform duration-300 ${
                          expanded ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!expanded}
                    className="px-5 pb-5 pl-12 text-[15px] leading-relaxed text-muted sm:px-6 sm:pl-14"
                  >
                    {item.a}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-3xl border border-soft surface p-7 text-center shadow-[var(--shadow-soft)]">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {t.faq.stillTitle}
            </h3>
            <p className="text-[15px] text-muted">{t.faq.stillText}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-transform hover:scale-[1.03]"
            >
              <span aria-hidden="true">💬</span>
              {t.faq.stillCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
