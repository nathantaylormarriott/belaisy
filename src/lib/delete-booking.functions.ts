import { createServerFn } from "@tanstack/react-start";
import { removeBooking, requireTeam } from "@/lib/booking-store";

export const deleteBooking = createServerFn({ method: "POST" })
  .validator((data: { id: number; preview?: boolean }) => data)
  .handler(async ({ data }) => {
    await requireTeam(data.preview);
    return removeBooking(data.id);
  });
