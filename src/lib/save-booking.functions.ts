import { createServerFn } from "@tanstack/react-start";
import { insertBooking, requireTeam, updateBooking, type BookingInput } from "@/lib/booking-store";

export const saveBooking = createServerFn({ method: "POST" })
  .validator((data: BookingInput & { id?: number; preview?: boolean }) => data)
  .handler(async ({ data }) => {
    await requireTeam(data.preview);
    if (data.id) return updateBooking(data.id, data);
    return insertBooking(data, "calendar");
  });
