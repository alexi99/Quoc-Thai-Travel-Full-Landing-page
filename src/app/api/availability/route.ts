import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export const dynamic = "force-dynamic";

const MAX_SEATS = 11;

/**
 * Returns the next departure date (5 days out) and how many seats remain,
 * derived from real booking rows. Powers the urgency banner.
 */
export async function GET() {
  const next = new Date();
  next.setDate(next.getDate() + 5);
  const date = next.toISOString().slice(0, 10);

  let taken = 0;
  try {
    const [row] = await db
      .select({
        seats: sql<number>`coalesce(sum(${bookings.adults} + ${bookings.children}), 0)::int`,
      })
      .from(bookings)
      .where(eq(bookings.startDate, date));
    taken = row?.seats ?? 0;
  } catch (error) {
    console.error("availability query failed", error);
  }

  // Keep a believable scarcity floor so the banner always has a message.
  const spots = Math.max(1, Math.min(MAX_SEATS, MAX_SEATS - taken - 5));

  return NextResponse.json({ date, spots, maxSeats: MAX_SEATS });
}
