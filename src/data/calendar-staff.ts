export const calendarStaff = [
  { id: "nadine", name: "Nadine", colour: "#E11D48" },
  { id: "lauren", name: "Lauren", colour: "#7C3AED" },
  { id: "leah", name: "Leah", colour: "#0284C7" },
  { id: "amber", name: "Amber", colour: "#D97706" },
  { id: "medine", name: "Medine", colour: "#059669" },
  { id: "maddie", name: "Maddie", colour: "#DB2777" },
  { id: "joanne", name: "Joanne", colour: "#2563EB" },
] as const;

export type StaffId = (typeof calendarStaff)[number]["id"];

export const unassignedColour = "#64748B";

export function staffById(id: string | null | undefined) {
  return calendarStaff.find((member) => member.id === id) ?? null;
}
