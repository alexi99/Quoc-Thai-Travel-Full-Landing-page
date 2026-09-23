"use client";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";

/** Section eyebrow + title block reused by most sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  tone = "emerald",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  tone?: "emerald" | "gold" | "light";
}) {
  const eyebrowColor =
    tone === "gold"
      ? "text-[var(--color-gold-deep)]"
      : tone === "light"
        ? "text-[var(--color-gold)]"
        : "text-[var(--color-emerald-deep)]";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-balance-wrap sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[17px] leading-relaxed ${tone === "light" ? "text-white/75" : "text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function Overview() {
  const { t } = useI18n();

  return (
    <section
      id="overview"
      className="surface-alt scroll-mt-28 border-y border-soft py-20 sm:py-24"
      aria-labelledby="overview-title"
    >
      <div className="container-page">
        <div id="overview-title">
          <SectionHeading
            eyebrow={t.overview.eyebrow}
            title={t.overview.title}
            subtitle={t.overview.subtitle}
          />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.overview.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <article className="group h-full rounded-3xl border border-soft surface p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-2xl surface-alt text-2xl transition-transform duration-300 group-hover:scale-110"
                >
                  {card.icon}
                </span>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {card.title}
                </h3>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-[var(--color-ocean)] dark:text-[#cfe3ff]">
                  {card.value}
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {card.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Route map */}
        <Reveal className="mt-14">
          <div className="grid gap-0 overflow-hidden rounded-3xl border border-soft surface shadow-[var(--shadow-soft)] lg:grid-cols-2">
            <div className="p-7 sm:p-9">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                {t.overview.mapTitle}
              </h3>
              <p className="mt-3 text-[15px] text-muted">{t.overview.mapDesc}</p>
              <ol className="mt-6 space-y-3">
                {t.overview.mapStops.map((stop, i) => (
                  <li key={stop} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full emerald-gradient text-xs font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="text-[15px] font-medium">{stop}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="min-h-[320px] w-full bg-[var(--surface-alt)] lg:min-h-full">
              <iframe
                title={t.overview.mapTitle}
                src="https://www.openstreetmap.org/export/embed.html?bbox=105.2%2C20.0%2C107.4%2C21.4&layer=mapnik&marker=20.9101%2C106.9855"
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
