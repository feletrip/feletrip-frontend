"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  VendorRegisterType,
  vendorRegisterSchema,
} from "@/components/auth/Auth_Schema/vendor.register.schema";

import { Button } from "@/components/ui/button";
import InputField from "@/components/Reuseable/auth/InputField";
import AuthSectionTitle from "./AuthSectionTitle";
import { vendorRegisterAction } from "@/Server/Auth/auth.actions";
import { toast } from "@/components/Reuseable/common/toast";

// New Imports for Animation and Icons
import { motion } from "framer-motion";
import { CheckCircle2, Circle, XCircle } from "lucide-react";

type AuthView = "login" | "register" | "reset" | "verify";

interface RegisterFormProps {
  setAuthView: React.Dispatch<React.SetStateAction<AuthView>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

// Sub-components for Password Rules
function RuleIcon({ passed }: { passed: boolean | null }) {
  if (passed === null)
    return <Circle className="h-3 w-3 text-muted-foreground" />;

  if (passed) return <CheckCircle2 className="h-3 w-3 text-green-500" />;

  return <XCircle className="h-3 w-3 text-red-500" />;
}

function Rule({ icon, text }: { icon: boolean | null; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <RuleIcon passed={icon} />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}

export default function VendorReg({
  setAuthView,
  setUserEmail,
}: RegisterFormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<VendorRegisterType>({
    resolver: zodResolver(vendorRegisterSchema),
  });

  // Track password input values for dynamic rule checking
  const password = watch("password") || "";

  const rules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const getState = (rule: boolean) => {
    if (rule) return true;
    if (isSubmitted) return false;
    return null;
  };

  const onSubmit = async (data: VendorRegisterType) => {
    toast.loading(
      "Creating vendor account...",
      "Please wait while we set up your business profile",
    );

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("passwordHash", data.password);

      formData.append("businessName", data.businessName);
      formData.append("tradeLicenseNo", data.tradeLicenseNo);
      formData.append("nationalIdNo", data.nationalIdNo);

      const result = await vendorRegisterAction(formData);

      toast.close();

      // Registration failed
      if (!result?.success) {
        toast.error(
          "Vendor registration failed",
          result?.message || "Unable to create vendor account",
        );
        return;
      }

      // OTP not sent
      if (!result?.otpSent) {
        toast.error(
          "Verification failed",
          result?.message || "OTP could not be sent",
        );
        return;
      }

      // Success
      toast.success(
        "Account created",
        "OTP has been sent to your email for verification",
      );

      setUserEmail(result.email || data.email);
      setAuthView("verify");
    } catch (error) {
      toast.close();

      toast.error(
        "Server error",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      console.error("Vendor Registration Error:", error);
    }
  };

  return (
    <div className="w-full">
      <section className="space-y-6 p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <AuthSectionTitle title="Contact Information" />

            <InputField
              label="Name"
              placeholder="John Doe"
              type="text"
              {...register("name")}
              error={errors.name?.message}
              isSubmitting={isSubmitting}
            />
            <InputField
              label="Email Address"
              placeholder="johndoe@gmail.com"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              isSubmitting={isSubmitting}
            />

            <InputField
              label="Phone Number"
              placeholder="01712345678"
              {...register("phone")}
              error={errors.phone?.message}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <AuthSectionTitle title="Business Information" />

            <InputField
              label="Business Name"
              placeholder="Sunny Hotels Ltd."
              {...register("businessName")}
              error={errors.businessName?.message}
              isSubmitting={isSubmitting}
            />

            <InputField
              label="Trade License Number"
              placeholder="TL-2024-00123"
              {...register("tradeLicenseNo")}
              error={errors.tradeLicenseNo?.message}
              isSubmitting={isSubmitting}
            />

            <InputField
              label="National ID Number"
              placeholder="1234567890123"
              {...register("nationalIdNo")}
              error={errors.nationalIdNo?.message}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Security */}
          <div className="space-y-4">
            <AuthSectionTitle title="Security" />

            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
              isSubmitting={isSubmitting}
            />

            {/* Password Rules Box with Shake Animation */}
            <motion.div
              className={`rounded-xl border p-4 text-xs transition-colors duration-300 ${
                errors.password
                  ? "border-destructive bg-destructive/5"
                  : "bg-primary/5"
              }`}
              animate={
                errors.password
                  ? { scale: 1.01, x: [0, -2, 2, -2, 2, 0] }
                  : { scale: 1, x: 0 }
              }
              transition={{ duration: 0.25 }}
            >
              <h3 className="mb-2 font-semibold">Password must contain</h3>

              <div className="space-y-1">
                <Rule
                  icon={getState(rules.length)}
                  text="Minimum 6 characters"
                />

                <Rule
                  icon={getState(rules.uppercase)}
                  text="One uppercase letter"
                />

                <Rule
                  icon={getState(rules.lowercase)}
                  text="One lowercase letter"
                />

                <Rule icon={getState(rules.number)} text="One number" />
              </div>
            </motion.div>

            <InputField
              label="Confirm Password"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              isSubmitting={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setAuthView("login")}
              className={`text-primary hover:opacity-80 transition font-medium ${
                isSubmitting
                  ? "cursor-not-allowed pointer-events-none"
                  : "cursor-pointer"
              }`}
            >
              Login
            </span>
          </p>
        </form>
      </section>
    </div>
  );
}
