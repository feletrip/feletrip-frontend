import { z } from "zod";

export const bookingSchema = z.object({
  guests: z.array(
    z.object({
      firstName: z.string().min(1, "Given Name is required"),
      lastName: z.string().optional(),
    }),
  ),

  primaryContactIndex: z.string().min(1, "Select primary contact"),

  phone: z.string().min(8, "Valid phone required"),

  requests: z.array(z.string()).optional(),

  bedType: z.string().optional(),

  note: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
