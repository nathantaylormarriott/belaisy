import { getUser } from "@netlify/identity";
import { and, eq, gte, isNull, lt, ne, or } from "drizzle-orm";
import { bookings, type BookingRow } from "../../db/schema";
import { calendarStaff } from "@/data/calendar-staff";
import { seedDemoBookingsIfEmpty } from "@/lib/booking-demo";

export type BookingStatus = "requested" | "confirmed" | "cancelled";

export type Booking = {
  id: number;
  clientName: string;
  phone: string;
  service: string;
  staffId: string | null;
  startsAt: string | null;
  durationMinutes: number;
  status: BookingStatus;
  notes: string;
  source: string;
};

export type BookingInput = {
  clientName: string;
  phone: string;
  service: string;
  staffId: string | null;
  startsAt: string | null;
  durationMinutes: number;
  status: BookingStatus;
  notes: string;
};

const memory: Booking[] = [];
const memoryId = { value: 1 };

function ensureMemoryStore() {
  if (!useMemory()) return;
  seedDemoBookingsIfEmpty(memory, memoryId);
}

function toBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    clientName: row.clientName,
    phone: row.phone,
    service: row.service,
    staffId: row.staffId,
    startsAt: row.startsAt ? row.startsAt.toISOString() : null,
    durationMinutes: row.durationMinutes,
    status: row.status as BookingStatus,
    notes: row.notes,
    source: row.source,
  };
}

function useMemory() {
  return !process.env["NETLIFY_DB_URL"];
}

async function database() {
  const { db } = await import("../../db");
  return db;
}

export function cleanStaff(staffId: string | null | undefined) {
  if (!staffId) return null;
  return calendarStaff.some((member) => member.id === staffId) ? staffId : null;
}

export function cleanStatus(status: string): BookingStatus {
  if (status === "confirmed" || status === "cancelled" || status === "requested") return status;
  return "requested";
}

export async function requireTeam(preview?: boolean) {
  if (process.env["NODE_ENV"] !== "production" && preview) return;
  try {
    const user = await getUser();
    if (user) return;
  } catch {
    /* Identity is not available in local Vite. */
  }
  throw new Error("Sign in required");
}

export async function listRows(from: string, to: string): Promise<Booking[]> {
  ensureMemoryStore();
  if (useMemory()) {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();
    return memory.filter((booking) => {
      if (booking.status === "cancelled") return false;
      if (!booking.startsAt) return true;
      const time = new Date(booking.startsAt).getTime();
      return time >= start && time < end;
    });
  }

  const db = await database();
  const rows = await db
    .select()
    .from(bookings)
    .where(
      and(
        ne(bookings.status, "cancelled"),
        or(isNull(bookings.startsAt), and(gte(bookings.startsAt, new Date(from)), lt(bookings.startsAt, new Date(to)))),
      ),
    );
  return rows.map(toBooking);
}

export async function insertBooking(input: BookingInput, source: string): Promise<Booking> {
  const row: Booking = {
    id: memoryId.value,
    clientName: input.clientName.trim(),
    phone: input.phone.trim(),
    service: input.service.trim(),
    staffId: cleanStaff(input.staffId),
    startsAt: input.startsAt,
    durationMinutes: input.durationMinutes,
    status: cleanStatus(input.status),
    notes: input.notes.trim(),
    source,
  };
  if (!row.clientName) throw new Error("Client name is required");

  if (useMemory()) {
    ensureMemoryStore();
    row.id = memoryId.value++;
    memory.push(row);
    return row;
  }

  const db = await database();
  const [created] = await db
    .insert(bookings)
    .values({
      clientName: row.clientName,
      phone: row.phone,
      service: row.service,
      staffId: row.staffId,
      startsAt: row.startsAt ? new Date(row.startsAt) : null,
      durationMinutes: row.durationMinutes,
      status: row.status,
      notes: row.notes,
      source,
    })
    .returning();
  if (!created) throw new Error("Could not save booking");
  return toBooking(created);
}

export async function updateBooking(id: number, input: BookingInput): Promise<Booking> {
  const next = {
    clientName: input.clientName.trim(),
    phone: input.phone.trim(),
    service: input.service.trim(),
    staffId: cleanStaff(input.staffId),
    startsAt: input.startsAt,
    durationMinutes: input.durationMinutes,
    status: cleanStatus(input.status),
    notes: input.notes.trim(),
  };
  if (!next.clientName) throw new Error("Client name is required");

  if (useMemory()) {
    const current = memory.find((booking) => booking.id === id);
    if (!current) throw new Error("Booking not found");
    Object.assign(current, next);
    return current;
  }

  const db = await database();
  const [updated] = await db
    .update(bookings)
    .set({
      ...next,
      startsAt: next.startsAt ? new Date(next.startsAt) : null,
    })
    .where(eq(bookings.id, id))
    .returning();
  if (!updated) throw new Error("Booking not found");
  return toBooking(updated);
}

export async function removeBooking(id: number) {
  if (useMemory()) {
    const index = memory.findIndex((booking) => booking.id === id);
    if (index >= 0) memory.splice(index, 1);
    return { ok: true };
  }
  const db = await database();
  await db.delete(bookings).where(eq(bookings.id, id));
  return { ok: true };
}
