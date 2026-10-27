import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
});

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        email: z
            .string()
            .email("Invalid email address"),
            otp: z
            .string()
            .min(1, "OTP is required"),
        newPassword: z 
            .string()
            .min(6, "Minimum 6 characters")
            .regex(/[A-Z]/, "Must contain one uppercase letter")
            .regex(/[a-z]/, "Must contain one lowercase letter")
            .regex(/[0-9]/, "Must contain one number"),
     })
 
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
