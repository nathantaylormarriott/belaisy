import { createServerFn } from "@tanstack/react-start";
import { listRows, requireTeam } from "@/lib/booking-store";

export const listBookings = createServerFn({ method: "POST" })
  .validator((data: { from: string; to: string; preview?: boolean }) => data)
  .handler(async ({ data }) => {
    await requireTeam(data.preview);
    return listRows(data.from, data.to);
  });
