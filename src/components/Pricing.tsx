"use client";

import { useI18n } from "@/components/I18nProvider";
import { SectionHeading } from "@/components/Overview";
import { Reveal } from "@/components/ui/Reveal";
import { TOUR } from "@/lib/tour-data";

export function Pricing() {
  const { t } = useI18n();

  return (
    <section
      id="pricing"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
      aria-labelledby="pricing-title"
    >
      {/* decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60rem 30rem at 15% 0%, rgba(16,185,129,0.10), transparent), radial-gradient(50rem 26rem at 90% 100%, rgba(212,168,83,0.14), transparent)",
        }}
      />
      <div className="container-page">
        <div id="pricing-title">
          <SectionHeading
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            subtitle={t.pricing.subtitle}
          />
        </div>

        {/* Price card */}
        <Reveal className="mt-12">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border-2 border-[var(--color-gold)]/50 surface text-center shadow-[var(--shadow-lift)]">
            <div className="gold-gradient px-6 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-[#3b2a06]">
              ✦ {t.pricing.badge}
            </div>
            <div className="px-6 py-10 sm:px-12">
              <div className="flex items-end justify-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-6xl font-bold leading-none text-[var(--color-ocean)] dark:text-white sm:text-7xl">
                  {t.pricing.amount}
                </span>
                <span className="pb-2 text-lg font-semibold text-muted">
                  {t.pricing.perPerson}
                </span>
              </div>
              <p className="mt-2 text-[15px] text-muted">{t.pricing.vnd}</p>

              <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 rounded-2xl surface-alt px-5 py-4 text-sm">
                <p className="font-semibold">
                  <span aria-hidden="true">👥</span> {t.pricing.groupNote}
                </p>
                <p className="text-muted">
                  <span aria-hidden="true">🧒</span> {t.pricing.childNote}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="mt-7 w-full rounded-full gold-gradient px-8 py-4 text-lg font-bold text-[#3b2a06] shadow-[0_18px_40px_-18px_rgba(212,168,83,0.9)] transition-transform hover:scale-[1.02] active:scale-100 sm:w-auto sm:px-12"
              >
                {t.pricing.cta} →
              </button>
              <p className="mt-4 text-[13px] text-muted">{t.pricing.guarantee}</p>
            </div>
          </div>
        </Reveal>

        {/* Included / not included */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-[var(--color-emerald-brand)]/30 bg-[var(--color-emerald-brand)]/[0.07] p-7">
              <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-bold">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full emerald-gradient text-sm text-white"
                >
                  ✓
                </span>
                {t.pricing.includedTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.pricing.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px]">
                    <span
                      aria-hidden="true"
                      className="mt-1 text-[var(--color-emerald-deep)]"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-3xl border border-soft surface-alt p-7">
              <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-bold">
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#b91c1c]/90 text-sm text-white"
                >
                  ✕
                </span>
                {t.pricing.notIncludedTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {t.pricing.notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-muted"
                  >
                    <span aria-hidden="true" className="mt-1 text-[#b91c1c]">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-soft surface px-4 py-3 text-[13px] text-muted">
                <span aria-hidden="true">💳</span> {TOUR.brand} · {TOUR.email} ·{" "}
                {TOUR.phone}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
