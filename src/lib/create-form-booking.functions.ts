import { createServerFn } from "@tanstack/react-start";
import { insertBooking } from "@/lib/booking-store";
import { nextSlotIso } from "@/lib/booking-time";

export const createFormBooking = createServerFn({ method: "POST" })
  .validator(
    (data: {
      clientName: string;
      phone: string;
      service: string;
      preferredDay: string;
      preferredTime: string;
      notes: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    return insertBooking(
      {
        clientName: data.clientName,
        phone: data.phone,
        service: data.service,
        staffId: null,
        startsAt: nextSlotIso(data.preferredDay, data.preferredTime),
        durationMinutes: 60,
        status: "requested",
        notes: data.notes,
      },
      "form",
    );
  });
