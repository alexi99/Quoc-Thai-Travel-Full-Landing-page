"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/ui/Reveal";
import { LOCALE_META, LOCALE_ORDER, tpl } from "@/i18n/config";
import { COUNTRIES, DIAL_CODES, TOUR } from "@/lib/tour-data";

type Errors = Partial<
  Record<"fullName" | "email" | "phone" | "startDate" | "adults", string>
>;

const inputBase =
  "w-full rounded-xl border border-soft surface px-4 py-3 text-[16px] outline-none transition-colors focus:border-[var(--color-emerald-brand)] focus:ring-2 focus:ring-[var(--color-emerald-brand)]/25";

function todayIso(offsetDays = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/** Small labelled field wrapper keeps the markup accessible and consistent. */
function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[#dc2626]">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-xs font-semibold text-[#dc2626]">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const { t, locale } = useI18n();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("+44");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [guideLanguage, setGuideLanguage] = useState(LOCALE_META[locale].label);
  const [startDate, setStartDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [room, setRoom] = useState(0);
  const [diets, setDiets] = useState<number[]>([]);
  const [requests, setRequests] = useState("");
  const [referral, setReferral] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState<{ reference: string } | null>(null);

  const total = useMemo(
    () => adults * TOUR.priceAdultUsd + children * TOUR.priceChildUsd,
    [adults, children],
  );
  const totalLabel = `$${total.toLocaleString("en-US")} USD`;

  const toggleDiet = (i: number) =>
    setDiets((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i],
    );

  function validate(): Errors {
    const next: Errors = {};
    if (!fullName.trim()) next.fullName = t.booking.errRequired;
    if (!email.trim()) next.email = t.booking.errRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = t.booking.errEmail;
    if (!phone.trim()) next.phone = t.booking.errRequired;
    else if (!/^[\d\s().-]{6,20}$/.test(phone.trim()))
      next.phone = t.booking.errPhone;
    if (!startDate) next.startDate = t.booking.errRequired;
    else if (new Date(startDate) <= new Date(new Date().toDateString()))
      next.startDate = t.booking.errDate;
    if (adults < 1) next.adults = t.booking.errAdults;
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: `${dialCode} ${phone.trim()}`,
          nationality,
          guideLanguage,
          startDate,
          adults,
          children,
          infants,
          roomPreference: t.booking.rooms[room],
          dietary: diets.map((i) => t.booking.diets[i]).join(", "),
          specialRequests: requests.trim(),
          referral,
          locale,
          totalUsd: total,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      const data = (await res.json()) as { reference: string };
      setSuccess({ reference: data.reference });
    } catch {
      setServerError(t.booking.errServer);
    } finally {
      setSubmitting(false);
    }
  }

  const counter = (
    id: string,
    value: number,
    setValue: (n: number) => void,
    min: number,
  ) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        aria-label="−"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-soft surface text-xl font-bold hover:bg-[var(--surface-alt)]"
      >
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={11}
        value={value}
        onChange={(e) =>
          setValue(Math.max(min, Math.min(11, Number(e.target.value) || min)))
        }
        className={`${inputBase} text-center`}
      />
      <button
        type="button"
        onClick={() => setValue(Math.min(11, value + 1))}
        aria-label="+"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-soft surface text-xl font-bold hover:bg-[var(--surface-alt)]"
      >
        +
      </button>
    </div>
  );

  return (
    <section
      id="booking"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
      aria-labelledby="booking-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,185,129,0.09), rgba(30,58,95,0.06))",
        }}
      />
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-emerald-deep)]">
            {t.booking.eyebrow}
          </p>
          <h2
            id="booking-title"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-balance-wrap sm:text-4xl lg:text-[2.75rem]"
          >
            {t.booking.title}
          </h2>
          <p className="mt-4 text-[17px] text-muted">{t.booking.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* ---------- Form ---------- */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-soft surface p-6 shadow-[var(--shadow-lift)] sm:p-8"
            >
              {/* Contact */}
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-emerald-deep)]">
                {t.booking.sectionContact}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field
                  id="fullName"
                  label={t.booking.fullName}
                  required
                  error={errors.fullName}
                >
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.booking.fullNamePh}
                    aria-invalid={!!errors.fullName}
                    className={inputBase}
                  />
                </Field>

                <Field
                  id="email"
                  label={t.booking.email}
                  required
                  error={errors.email}
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.booking.emailPh}
                    aria-invalid={!!errors.email}
                    className={inputBase}
                  />
                </Field>

                <Field
                  id="phone"
                  label={t.booking.phone}
                  required
                  error={errors.phone}
                >
                  <div className="flex gap-2">
                    <select
                      aria-label={t.booking.countryCode}
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                      className={`${inputBase} w-[7.5rem] shrink-0 px-2`}
                    >
                      {DIAL_CODES.map((d) => (
                        <option key={d.code + d.label} value={d.code}>
                          {d.flag} {d.code}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.booking.phonePh}
                      aria-invalid={!!errors.phone}
                      className={inputBase}
                    />
                  </div>
                </Field>

                <Field id="nationality" label={t.booking.nationality}>
                  <select
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className={inputBase}
                  >
                    <option value="">{t.booking.nationalityPh}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Trip */}
              <h3 className="mt-9 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-emerald-deep)]">
                {t.booking.sectionTrip}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field
                  id="startDate"
                  label={t.booking.startDate}
                  required
                  error={errors.startDate}
                >
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={todayIso(1)}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    aria-invalid={!!errors.startDate}
                    className={inputBase}
                  />
                </Field>

                <Field id="guideLanguage" label={t.booking.guideLanguage}>
                  <select
                    id="guideLanguage"
                    value={guideLanguage}
                    onChange={(e) => setGuideLanguage(e.target.value)}
                    className={inputBase}
                  >
                    {LOCALE_ORDER.map((code) => (
                      <option key={code} value={LOCALE_META[code].label}>
                        {LOCALE_META[code].flag} {LOCALE_META[code].label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="adults"
                  label={t.booking.adults}
                  required
                  hint={t.booking.adultsHint}
                  error={errors.adults}
                >
                  {counter("adults", adults, setAdults, 1)}
                </Field>

                <Field
                  id="children"
                  label={t.booking.children}
                  hint={t.booking.childrenHint}
                >
                  {counter("children", children, setChildren, 0)}
                </Field>

                <Field
                  id="infants"
                  label={t.booking.infants}
                  hint={t.booking.infantsHint}
                >
                  {counter("infants", infants, setInfants, 0)}
                </Field>

                <fieldset>
                  <legend className="block text-sm font-semibold">
                    {t.booking.roomPreference}
                  </legend>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {t.booking.rooms.map((label, i) => (
                      <label
                        key={label}
                        className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-[13px] font-medium transition-colors ${
                          room === i
                            ? "border-[var(--color-emerald-brand)] bg-[var(--color-emerald-brand)]/10 font-semibold"
                            : "border-soft surface hover:bg-[var(--surface-alt)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="room"
                          value={label}
                          checked={room === i}
                          onChange={() => setRoom(i)}
                          className="sr-only"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Preferences */}
              <h3 className="mt-9 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-emerald-deep)]">
                {t.booking.sectionPrefs}
              </h3>
              <fieldset className="mt-4">
                <legend className="block text-sm font-semibold">
                  {t.booking.dietary}
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.booking.diets.map((label, i) => (
                    <label
                      key={label}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                        diets.includes(i)
                          ? "border-[var(--color-emerald-brand)] bg-[var(--color-emerald-brand)]/12 font-semibold"
                          : "border-soft surface hover:bg-[var(--surface-alt)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={diets.includes(i)}
                        onChange={() => toggleDiet(i)}
                        className="sr-only"
                      />
                      {diets.includes(i) && <span aria-hidden="true">✓ </span>}
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-5">
                <Field id="requests" label={t.booking.specialRequests}>
                  <textarea
                    id="requests"
                    rows={4}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder={t.booking.specialRequestsPh}
                    className={`${inputBase} resize-y`}
                  />
                </Field>

                <Field id="referral" label={t.booking.referral}>
                  <select
                    id="referral"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    className={inputBase}
                  >
                    <option value="">—</option>
                    {t.booking.referrals.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {serverError && (
                <p
                  role="alert"
                  className="mt-6 rounded-xl border border-[#dc2626]/40 bg-[#dc2626]/10 px-4 py-3 text-sm font-semibold text-[#b91c1c]"
                >
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 w-full rounded-full gold-gradient px-8 py-4 text-lg font-bold text-[#3b2a06] shadow-[0_18px_40px_-18px_rgba(212,168,83,0.9)] transition-transform hover:scale-[1.01] active:scale-100 disabled:cursor-wait disabled:opacity-70"
              >
                {submitting
                  ? t.booking.submitting
                  : tpl(t.booking.submit, { total: totalLabel })}
              </button>
              <p className="mt-3 text-center text-[13px] text-muted">
                {t.booking.secureNote}
              </p>
            </form>
          </Reveal>

          {/* ---------- Live price summary ---------- */}
          <Reveal delay={100}>
            <aside className="sticky top-28 rounded-3xl border-2 border-[var(--color-emerald-brand)]/30 surface p-6 shadow-[var(--shadow-soft)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                {t.booking.summaryTitle}
              </h3>

              <dl className="mt-5 space-y-3 text-[15px]">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">
                    {tpl(t.booking.summaryAdults, { n: adults })}
                  </dt>
                  <dd className="font-semibold">
                    ${(adults * TOUR.priceAdultUsd).toLocaleString("en-US")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">
                    {tpl(t.booking.summaryChildren, { n: children })}
                  </dt>
                  <dd className="font-semibold">
                    ${(children * TOUR.priceChildUsd).toLocaleString("en-US")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">
                    {tpl(t.booking.summaryInfants, { n: infants })}
                  </dt>
                  <dd className="font-semibold text-[var(--color-emerald-deep)]">
                    {t.booking.free}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 border-t border-soft pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {t.booking.estimatedTotal}
                </p>
                <p
                  aria-live="polite"
                  className="mt-1 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--color-ocean)] dark:text-white"
                >
                  {totalLabel}
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  ≈{" "}
                  {(total * 26000).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  VND
                </p>
              </div>

              <ul className="mt-5 space-y-2 border-t border-soft pt-5 text-[13px] text-muted">
                {t.pricing.included.slice(0, 5).map((line) => (
                  <li key={line} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="text-[var(--color-emerald-deep)]"
                    >
                      ✓
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>

      {/* ---------- Success modal ---------- */}
      {success && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
          className="fixed inset-0 z-[110] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="animate-fade-up w-full max-w-lg overflow-hidden rounded-3xl surface shadow-2xl">
            <div className="emerald-gradient px-6 py-8 text-center text-white">
              <span aria-hidden="true" className="text-5xl">
                🎉
              </span>
              <h3
                id="booking-success-title"
                className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold"
              >
                {t.booking.successTitle}
              </h3>
            </div>
            <div className="p-6 text-center sm:p-8">
              <p className="text-[15px] text-muted">
                {tpl(t.booking.successText, { name: fullName, email })}
              </p>
              <div className="mt-5 rounded-2xl border-2 border-dashed border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {t.booking.successRef}
                </p>
                <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-[var(--color-gold-deep)]">
                  {success.reference}
                </p>
              </div>
              <p className="mt-5 text-[14px] text-muted">{t.booking.successNext}</p>
              <button
                type="button"
                onClick={() => setSuccess(null)}
                className="mt-6 w-full rounded-full emerald-gradient px-8 py-3.5 text-base font-bold text-white"
              >
                {t.booking.successClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
