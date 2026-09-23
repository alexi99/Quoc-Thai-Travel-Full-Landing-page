import { NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function makeReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `VWT-${code}`;
}

function clampInt(value: unknown, min: number, max: number, fallback: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fullName = str(body.fullName, 160);
  const email = str(body.email, 200);
  const phone = str(body.phone, 60);
  const startDate = str(body.startDate, 20);

  const fieldErrors: Record<string, string> = {};
  if (!fullName) fieldErrors.fullName = "required";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "invalid";
  if (!phone) fieldErrors.phone = "required";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) fieldErrors.startDate = "invalid";
  else if (new Date(startDate) <= new Date(new Date().toDateString()))
    fieldErrors.startDate = "past";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "validation", fieldErrors }, { status: 400 });
  }

  const adults = clampInt(body.adults, 1, 11, 1);
  const children = clampInt(body.children, 0, 11, 0);
  const infants = clampInt(body.infants, 0, 11, 0);
  const totalUsd = clampInt(body.totalUsd, 0, 100_000, adults * 200 + children * 150);
  const reference = makeReference();

  try {
    const [row] = await db
      .insert(bookings)
      .values({
        reference,
        fullName,
        email,
        phone,
        nationality: str(body.nationality, 80) || null,
        guideLanguage: str(body.guideLanguage, 40) || null,
        startDate,
        adults,
        children,
        infants,
        roomPreference: str(body.roomPreference, 30) || null,
        dietary: str(body.dietary, 400) || null,
        specialRequests: str(body.specialRequests, 2000) || null,
        referral: str(body.referral, 40) || null,
        locale: str(body.locale, 8) || "en",
        totalUsd,
      })
      .returning({ reference: bookings.reference, id: bookings.id });

    return NextResponse.json(
      { ok: true, reference: row.reference, id: row.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to store booking", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

/** Lightweight admin view: latest booking requests. */
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(20);
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(bookings);
    return NextResponse.json({ ok: true, count, bookings: rows });
  } catch (error) {
    console.error("Failed to list bookings", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
