"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { TOUR, whatsappLink } from "@/lib/tour-data";

const SOCIALS = [
  { label: "Facebook", icon: "f", href: "https://facebook.com" },
  { label: "Instagram", icon: "◎", href: "https://instagram.com" },
  { label: "TripAdvisor", icon: "◉", href: "https://tripadvisor.com" },
  { label: "WhatsApp", icon: "✆", href: whatsappLink() },
];

export function Footer() {
  const { t, locale } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return;
    setBusy(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setDone(true);
      setEmail("");
    } catch {
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="ocean-gradient pb-24 pt-16 text-white sm:pb-10">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl emerald-gradient text-lg">
                ⛰
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold">
                {TOUR.brand}
              </span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-white/70">
              {t.footer.tagline}
            </p>
            <ul className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-base transition-colors hover:bg-[var(--color-emerald-brand)]"
                  >
                    <span aria-hidden="true">{s.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label={t.footer.linksTitle}>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {t.footer.linksTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {t.footer.links.map((link) => (
                <li key={link}>
                  <a
                    href="#top"
                    className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-[14px] text-white/75">
              <li className="flex gap-2.5">
                <span aria-hidden="true">✉️</span>
                <a href={`mailto:${TOUR.email}`} className="hover:text-white">
                  {TOUR.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true">📞</span>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {TOUR.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true">📍</span>
                <span>
                  <strong className="block text-white/90">
                    {t.footer.addressLabel}
                  </strong>
                  {t.footer.address}
                </span>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true">🕗</span>
                <span>{t.footer.hours}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {t.footer.newsletterTitle}
            </h3>
            <p className="mt-3 text-[14px] text-white/70">
              {t.footer.newsletterDesc}
            </p>
            {done ? (
              <p className="mt-4 rounded-xl border border-[var(--color-emerald-brand)]/50 bg-[var(--color-emerald-brand)]/20 px-4 py-3 text-sm font-semibold">
                {t.footer.subscribed}
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2.5">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t.footer.emailPh}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.emailPh}
                  className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/50 focus:border-[var(--color-gold)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-xl gold-gradient px-5 py-3 text-[15px] font-bold text-[#3b2a06] transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {t.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-center text-[13px] text-white/60 sm:flex-row sm:text-left">
          <div>
            <p>{t.footer.rights}</p>
            <p className="mt-1 text-white/40">{t.footer.licence}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1">{t.footer.payments}</span>
            {["VISA", "MC", "PayPal", "AMEX"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-bold tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
