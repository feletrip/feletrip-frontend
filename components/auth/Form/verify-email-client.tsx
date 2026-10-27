"use client";

import { useEffect, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verifyOtpAction, resendOtpAction } from "@/Server/Auth/auth.actions";
import { toast } from "@/components/Reuseable/common/toast";
import { Input } from "@/components/ui/input";
import AuthSectionTitle from "./AuthSectionTitle";

type AuthView = "login" | "register" | "reset" | "verify";

interface VerifyEmailClientProps {
  setAuthView: React.Dispatch<React.SetStateAction<AuthView>>;
  userEmail: string;
}

export default function VerifyEmailClient({
  setAuthView,
  userEmail,
}: VerifyEmailClientProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValue = otp.join("");

  // Auto focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // OTP Change
  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Keyboard Navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Paste OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = ["", "", "", "", "", ""];

    pasted.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    const focusIndex = Math.min(pasted.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Verify OTP
  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      toast.error(
        "OTP required",
        "Please enter the complete 6-digit verification code",
      );
      return;
    }

    toast.loading("Verifying OTP...", "Please wait while we verify your email");

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("otp", otpValue);

      const result = await verifyOtpAction(formData);

      toast.close();

      if (!result?.success) {
        toast.error("Verification failed", result?.message || "Invalid OTP");
        return;
      }

      toast.success(
        "Email verified",
        "Your account has been successfully verified",
      );

      setAuthView("login");
    } catch (error) {
      toast.close();

      toast.error(
        "Server error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0 || resending) return;

    toast.loading("Sending OTP...", "Please wait");

    setResending(true);

    try {
      const result = await resendOtpAction(userEmail);

      toast.close();

      if (!result?.success) {
        toast.error(
          "Failed to resend OTP",
          result?.message || "Try again later",
        );
        return;
      }

      setTimer(59);

      toast.success(
        "OTP sent",
        "A new verification code has been sent to your email",
      );
    } catch (error) {
      toast.close();

      toast.error(
        "Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setResending(false);
    }
  };

  // Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="w-full">
      <CardContent className="space-y-5 p-0">
        {/* Header */}
        <div className="text-center space-y-4">
          <div>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve sent a 6-digit verification code to
            </p>

            <p className="mt-1 break-all font-medium text-foreground">
              {userEmail}
            </p>
          </div>
        </div>

        {/* OTP Inputs */}
        <div className="space-y-3">
          <AuthSectionTitle title="Verification Code" />

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                data-filled={!!digit}
                className="
                  h-10 w-10
                  text-center
                  text-lg
                  font-bold
                  outline-none
                  transition-all

                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20

                  data-[filled=true]:border-primary
                  data-[filled=true]:bg-primary/5
                "
              />
            ))}
          </div>
        </div>

        {/* Resend */}
        <div className="text-right -mt-2">
          {timer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in{" "}
              <span className="font-semibold text-primary">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
              className="text-sm font-medium text-primary transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          className="w-full"
          onClick={handleVerify}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </CardContent>
    </div>
  );
}
