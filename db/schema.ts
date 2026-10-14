import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const bookings = pgTable(
  "bookings",
  {
    id: serial().primaryKey(),
    clientName: varchar("client_name", { length: 160 }).notNull(),
    phone: varchar({ length: 40 }).notNull().default(""),
    service: varchar({ length: 160 }).notNull().default(""),
    staffId: varchar("staff_id", { length: 40 }),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    durationMinutes: integer("duration_minutes").notNull().default(60),
    status: varchar({ length: 20 }).notNull().default("requested"),
    notes: text().notNull().default(""),
    source: varchar({ length: 20 }).notNull().default("calendar"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("bookings_starts_at_idx").on(table.startsAt)],
);

export type BookingRow = typeof bookings.$inferSelect;
