"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface CouponSectionProps {
  onCouponApplied?: (code: string, discount: number) => void; // Optional callback for parent
}

export function CouponSection({ onCouponApplied }: CouponSectionProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "applied" | "invalid">("idle");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock validation - replace with real logic (API call, list of valid codes, etc.)
  const validateCoupon = async (inputCode: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // simulate network

    const normalized = inputCode.trim().toUpperCase();

    if (normalized === "DREAMS25") {
      setStatus("applied");
      setAppliedCode("Dreams25");
      onCouponApplied?.("Dreams25", 50); // e.g. $50 off
      setCode("");
    } else if (normalized) {
      setStatus("invalid");
    } else {
      setStatus("idle");
    }

    setIsLoading(false);
  };

  const handleApply = () => {
    if (!code.trim()) return;
    validateCoupon(code);
  };

  const handleRemove = () => {
    setStatus("idle");
    setAppliedCode(null);
    onCouponApplied?.("", 0);
  };

  const handleCloseError = () => {
    setStatus("idle");
  };

  return (
    <Card className="rounded-md rounded-t-none border-0">
      <CardContent className="space-y-4">
        {/* Input + Apply Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className="h-11 flex-1 bg-gray-50/70 focus:bg-white transition-colors"
            disabled={status === "applied" || isLoading}
          />

          <Button
            type="button"
            onClick={handleApply}
            disabled={isLoading || status === "applied" || !code.trim()}
            className="h-11 px-8 min-w-35 font-medium bg-linear-to-r from-brand-secondary to-brand-primary hover:from-brand-primary hover:to-brand-secondary shadow-sm hover:shadow transition-all"
          >
            {isLoading ? "Applying..." : "Apply Coupon"}
          </Button>
        </div>

        {/* Success Message */}
        {status === "applied" && appliedCode && (
          <div className="relative pl-4 py-3 pr-4 bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-md text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Coupon Code <strong>{appliedCode}</strong> ($50) has been
                  applied successfully
                </span>
              </div>
              <button
                onClick={handleRemove}
                className="text-emerald-700 hover:text-emerald-900 font-medium underline underline-offset-2 text-sm transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status === "invalid" && (
          <div className="relative pl-4 py-3 pr-4 bg-red-50/80 border-l-4 border-red-500 rounded-r-md text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span>Code Invalid</span>
              </div>
              <button
                onClick={handleCloseError}
                className="text-red-700 hover:text-red-900 font-medium underline underline-offset-2 text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
