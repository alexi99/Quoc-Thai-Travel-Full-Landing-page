import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Tour booking requests submitted from the landing page booking form.
 * No payment is captured — the booking is a "request & confirm" lead.
 */
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    reference: varchar("reference", { length: 24 }).notNull().unique(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    phone: varchar("phone", { length: 60 }).notNull(),
    nationality: varchar("nationality", { length: 80 }),
    guideLanguage: varchar("guide_language", { length: 40 }),
    startDate: varchar("start_date", { length: 20 }).notNull(),
    adults: integer("adults").notNull().default(1),
    children: integer("children").notNull().default(0),
    infants: integer("infants").notNull().default(0),
    roomPreference: varchar("room_preference", { length: 30 }),
    dietary: text("dietary"),
    specialRequests: text("special_requests"),
    referral: varchar("referral", { length: 40 }),
    locale: varchar("locale", { length: 8 }).notNull().default("en"),
    totalUsd: integer("total_usd").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("bookings_start_date_idx").on(table.startDate)],
);

/** Footer newsletter sign-ups. */
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  locale: varchar("locale", { length: 8 }).notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Exit-intent / discount capture leads. */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull(),
  source: varchar("source", { length: 40 }).notNull().default("exit_intent"),
  locale: varchar("locale", { length: 8 }).notNull().default("en"),
  discountCode: varchar("discount_code", { length: 24 }),
  contacted: boolean("contacted").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
