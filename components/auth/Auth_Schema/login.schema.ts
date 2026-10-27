import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    remember: z.boolean().optional(),
});

export type LoginType = z.infer<typeof loginSchema>;
