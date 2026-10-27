"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";
import AuthSectionTitle from "./AuthSectionTitle";
import InputField from "@/components/Reuseable/auth/InputField";
import { forgetPasswordAction } from "@/Server/Auth/auth.actions";
import { Card } from "@heroui/react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [timer, setTimer] = useState(0);
  const [sending, setSending] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      toast.error("Email required", "Please enter your email address.");
      return;
    }

    setSending(true);
    toast.loading("Sending reset link...", "Please wait");

    try {
      const result = await forgetPasswordAction(email);

      toast.close();

      if (!result.success) {
        toast.error("Failed", result.message);
        return;
      }

      toast.success(
        "Email sent",
        result.message || "Password reset link sent successfully.",
      );

      setEmailSent(true);
      setTimer(59);
    } catch {
      toast.close();
      toast.error("Failed", "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-5">
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
        />

        {!emailSent ? (
          <Button
            className="w-full"
            onClick={handleSendResetLink}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Reset Link"}
          </Button>
        ) : (
          <div className="space-y-3">
            <AuthSectionTitle title="Check Your Email" />

            <Card className="text-sm text-center text-foreground flex flex-col gap-2 bg-primary/10">
              <span>We sent a password reset link to</span>
              <span className="font-medium text-primary text-base">{email}</span>
              <span className="text-muted-foreground">
                Please check your inbox and follow the instructions to reset
                your password.
              </span>
            </Card>

            <div className="text-right text-sm text-muted-foreground">
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendResetLink}
                  disabled={sending}
                  className="text-primary hover:opacity-80 transition cursor-pointer font-medium"
                >
                  {sending ? "Sending..." : "Resend Reset Link"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
