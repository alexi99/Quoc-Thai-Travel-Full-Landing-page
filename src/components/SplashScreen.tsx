"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

/**
 * Brief branded splash that fades out once the page is interactive.
 * It never blocks interaction for more than ~900ms.
 */
export function SplashScreen() {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 650);
    const cleanup = window.setTimeout(() => setRemoved(true), 1300);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(cleanup);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] grid place-items-center ocean-gradient transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-white">
        <span className="grid h-16 w-16 animate-float place-items-center rounded-2xl emerald-gradient text-3xl shadow-lg">
          ⛰
        </span>
        <p className="font-[family-name:var(--font-display)] text-xl font-bold">
          Vietnam Wonders Tour
        </p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/2 animate-[shimmer_1.2s_infinite] rounded-full gold-gradient" />
        </div>
        <p className="text-sm text-white/70">{t.common.loading}</p>
      </div>
    </div>
  );
}
