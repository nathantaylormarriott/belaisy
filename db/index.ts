import { drizzle } from "drizzle-orm/netlify-db";
import { bookings } from "./schema";

export const db = drizzle({ schema: { bookings } });
