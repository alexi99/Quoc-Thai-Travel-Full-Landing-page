"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { tpl } from "@/i18n/config";
import { TOUR, whatsappLink } from "@/lib/tour-data";

const EXIT_KEY = "vwt.exitShown";

/**
 * Floating layer: sticky mobile CTA, WhatsApp button, back-to-top
 * and the desktop exit-intent offer.
 */
export function FloatingUI() {
  const { t, locale } = useI18n();
  const [showTop, setShowTop] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitCode, setExitCode] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 900);
      setShowBar(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Exit-intent: desktop pointers only, once per browser.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let shown = false;
    try {
      shown = window.localStorage.getItem(EXIT_KEY) === "1";
    } catch {
      shown = false;
    }
    if (shown) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      setExitOpen(true);
      try {
        window.localStorage.setItem(EXIT_KEY, "1");
      } catch {
        /* ignore */
      }
      document.removeEventListener("mouseout", onLeave);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  async function claim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(exitEmail)) return;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: exitEmail, locale, source: "exit_intent" }),
      });
      const data = (await res.json()) as { discountCode?: string };
      setExitCode(data.discountCode ?? "VWT5OFF");
    } catch {
      setExitCode("VWT5OFF");
    }
  }

  const goBooking = () =>
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.chatWhatsapp}
        title={t.common.chatWhatsapp}
        className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.8)] transition-transform hover:scale-110 sm:bottom-6"
      >
        <span aria-hidden="true">💬</span>
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.common.backToTop}
          title={t.common.backToTop}
          className="fixed bottom-24 right-20 z-40 grid h-12 w-12 place-items-center rounded-full border border-soft surface text-lg shadow-[var(--shadow-soft)] transition-transform hover:scale-110 sm:bottom-6"
        >
          <span aria-hidden="true">↑</span>
        </button>
      )}

      {/* Sticky mobile booking bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-soft surface px-4 py-3 shadow-[0_-10px_30px_-18px_rgba(0,0,0,0.4)] transition-transform duration-300 sm:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-muted">
              {t.common.from}
            </p>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold leading-none">
              ${TOUR.priceAdultUsd}
              <span className="ml-1 text-xs font-medium text-muted">
                {t.common.perPerson}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={goBooking}
            className="ml-auto flex-1 rounded-full gold-gradient px-5 py-3 text-base font-bold text-[#3b2a06]"
          >
            {t.common.bookNow}
          </button>
        </div>
      </div>

      {/* Exit intent */}
      {exitOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
          className="fixed inset-0 z-[120] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setExitOpen(false)}
        >
          <div
            className="animate-fade-up w-full max-w-md overflow-hidden rounded-3xl surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-32 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/titop-island.jpg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/85 to-transparent" />
              <button
                type="button"
                onClick={() => setExitOpen(false)}
                aria-label={t.exit.dismiss}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-center">
              <h3
                id="exit-title"
                className="font-[family-name:var(--font-display)] text-2xl font-bold"
              >
                {t.exit.title}
              </h3>
              {exitCode ? (
                <p className="mt-4 rounded-xl border-2 border-dashed border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-4 py-4 font-semibold">
                  {tpl(t.exit.success, { code: exitCode })}
                </p>
              ) : (
                <>
                  <p className="mt-2.5 text-[15px] text-muted">{t.exit.desc}</p>
                  <form onSubmit={claim} className="mt-5 flex flex-col gap-2.5">
                    <label htmlFor="exit-email" className="sr-only">
                      {t.exit.emailPh}
                    </label>
                    <input
                      id="exit-email"
                      type="email"
                      required
                      value={exitEmail}
                      onChange={(e) => setExitEmail(e.target.value)}
                      placeholder={t.exit.emailPh}
                      className="w-full rounded-xl border border-soft surface-alt px-4 py-3 text-[16px] focus:border-[var(--color-emerald-brand)] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-xl gold-gradient px-5 py-3.5 text-base font-bold text-[#3b2a06]"
                    >
                      {t.exit.cta}
                    </button>
                  </form>
                </>
              )}
              <button
                type="button"
                onClick={() => setExitOpen(false)}
                className="mt-4 text-[13px] text-muted underline underline-offset-4"
              >
                {exitCode ? t.exit.dismiss : t.exit.noThanks}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
