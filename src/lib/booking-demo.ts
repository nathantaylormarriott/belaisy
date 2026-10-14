type DemoBooking = {
  id: number;
  clientName: string;
  phone: string;
  service: string;
  staffId: string | null;
  startsAt: string | null;
  durationMinutes: number;
  status: "requested" | "confirmed" | "cancelled";
  notes: string;
  source: string;
};

function mondayOfWeek(base: Date) {
  const d = new Date(base);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function slot(baseMonday: Date, dayOffset: number, hour: number, minute = 0) {
  const d = new Date(baseMonday);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function seedDemoBookingsIfEmpty(store: DemoBooking[], nextId: { value: number }) {
  if (store.length > 0) return;

  const week = mondayOfWeek(new Date());

  const demos: Omit<DemoBooking, "id">[] = [
    {
      clientName: "Joanne P.",
      phone: "07700 900123",
      service: "Back, neck and shoulder massage",
      staffId: "joanne",
      startsAt: slot(week, 0, 11, 0),
      durationMinutes: 60,
      status: "confirmed",
      notes: "",
      source: "calendar",
    },
    {
      clientName: "Sarah Mitchell",
      phone: "07700 900456",
      service: "Full head foils and toner",
      staffId: "nadine",
      startsAt: slot(week, 1, 10, 0),
      durationMinutes: 120,
      status: "confirmed",
      notes: "Patch test on file",
      source: "calendar",
    },
    {
      clientName: "Tom Harris",
      phone: "07700 900789",
      service: "Gents cut and finish",
      staffId: "lauren",
      startsAt: slot(week, 1, 14, 30),
      durationMinutes: 45,
      status: "confirmed",
      notes: "",
      source: "calendar",
    },
    {
      clientName: "Emma Clarke",
      phone: "07700 900321",
      service: "Ultra Tips extensions",
      staffId: "leah",
      startsAt: slot(week, 3, 9, 30),
      durationMinutes: 180,
      status: "confirmed",
      notes: "",
      source: "calendar",
    },
    {
      clientName: "Priya Shah",
      phone: "07700 900654",
      service: "BIAB infill",
      staffId: "amber",
      startsAt: slot(week, 4, 10, 0),
      durationMinutes: 90,
      status: "confirmed",
      notes: "",
      source: "calendar",
    },
    {
      clientName: "Helen Wright",
      phone: "07700 900987",
      service: "Skin booster consultation",
      staffId: "medine",
      startsAt: slot(week, 3, 15, 0),
      durationMinutes: 30,
      status: "requested",
      notes: "First visit",
      source: "calendar",
    },
    {
      clientName: "Chloe Adams",
      phone: "07700 900147",
      service: "Permanent bracelet",
      staffId: "maddie",
      startsAt: slot(week, 5, 10, 30),
      durationMinutes: 45,
      status: "confirmed",
      notes: "Gold-filled chain",
      source: "calendar",
    },
    {
      clientName: "Alex Green",
      phone: "07700 900258",
      service: "Book an appointment",
      staffId: null,
      startsAt: null,
      durationMinutes: 60,
      status: "requested",
      notes: "Enquiry form — prefers Tuesday afternoon",
      source: "form",
    },
  ];

  for (const demo of demos) {
    store.push({ ...demo, id: nextId.value++ });
  }
}
