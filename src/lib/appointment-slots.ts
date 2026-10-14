import { business } from "@/lib/business";

const SLOT_INTERVAL_MINUTES = 30;

export const openDays = business.hours.filter((entry) => entry.open !== "Closed");

function parseTime24(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime12(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "pm" : "am";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function getTimeSlotsForDay(day: string) {
  const entry = business.hours.find((hour) => hour.day === day);
  if (!entry || entry.open === "Closed") return [];

  const [, openTime, closeTime] = entry.schema;
  const start = parseTime24(openTime);
  const end = parseTime24(closeTime);
  const slots: { value: string; label: string }[] = [];

  for (let minutes = start; minutes < end; minutes += SLOT_INTERVAL_MINUTES) {
    const label = formatTime12(minutes);
    slots.push({ value: label, label });
  }

  return slots;
}
