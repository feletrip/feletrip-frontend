import { z } from "zod";

export const searchSchema = z.object({
  hotelid: z.string().min(1),
  checkIn: z.string(),
  checkOut: z.string(),
  rooms: z.coerce.number().min(1),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().optional(),
});
