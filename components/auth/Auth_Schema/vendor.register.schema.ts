import { z } from "zod";

export const vendorRegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    phone: z.string().min(11, "Phone number must be at least 11 digits"),

    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters"),

    tradeLicenseNo: z.string().min(3, "Trade license number is required"),

    nationalIdNo: z.string().min(10, "National ID number is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type VendorRegisterType = z.infer<typeof vendorRegisterSchema>;
