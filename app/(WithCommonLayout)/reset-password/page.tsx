"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AuthSectionTitle from "@/components/auth/Form/AuthSectionTitle";
import { Container } from "@/components/PublicLayout/Shared/Container";
import InputField from "@/components/Reuseable/auth/InputField";
import { Button } from "@/components/ui/button";
import { Card } from "@heroui/react";
import { CheckCircle2, Circle, ShieldCheck, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "@/components/auth/Auth_Schema/reset.schema";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/Reuseable/common/toast";
import { resetPasswordAction } from "@/Server/Auth/auth.actions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";
import { useEffect } from "react";
import { motion } from "framer-motion";

function RuleIcon({ passed }: { passed: boolean | null }) {
  if (passed === null)
    return <Circle className="h-3 w-3 text-muted-foreground" />;

  if (passed) return <CheckCircle2 className="h-3 w-3 text-green-500" />;

  return <XCircle className="h-3 w-3 text-red-500" />;
}

export default function ResetPasswordPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    toast.warning(
      "You're already logged in",
      "Password reset is only available for logged out users.",
    );

    router.push("/");
    return;
  }, [user, router]);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

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

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token) {
      toast.error(
        "Invalid reset link",
        "The password reset link is invalid or has expired.",
      );
      return;
    }

    toast.loading(
      "Resetting password...",
      "Please wait while we update your password",
    );

    try {
      const result = await resetPasswordAction(token, data.password);

      toast.close();

      if (!result.success) {
        toast.error(
          "Reset failed",
          result.message || "Unable to reset password",
        );
        return;
      }

      toast.success(
        "Password reset successful",
        result.message || "You can now log in with your new password.",
      );

      router.push("/");
    } catch (error) {
      toast.close();

      toast.error(
        "Server error",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    }
  };

  return (
    <Motion
      animationType="scale"
      className="mt-16 flex min-h-[calc(100vh-64px)] items-center"
    >
      <Container className="max-w-md">
        <Card className="border-none p-8 shadow-2xl">
          <div className="mb-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>

            <AuthSectionTitle title="Reset Your Password" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              label="New Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              isSubmitting={isSubmitting}
            />

            <motion.div
              className={`rounded-xl border p-4 text-xs ${errors.password ? "border-destructive     bg-destructive/5" : "bg-primary/5"}`}
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
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              isSubmitting={isSubmitting}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Card>
      </Container>
    </Motion>
  );
}

function Rule({ icon, text }: { icon: boolean | null; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <RuleIcon passed={icon} />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
