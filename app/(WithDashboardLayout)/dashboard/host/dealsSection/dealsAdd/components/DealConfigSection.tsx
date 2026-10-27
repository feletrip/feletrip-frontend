"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "./CustomDatePicker";
import { DealFormValues } from "../type/type";
import { Percent, Banknote, Calendar, Layers, ShieldCheck } from "lucide-react";

export function DealConfigSection() {
  const { register, watch, setValue } = useFormContext<DealFormValues>();
  const dealType = watch("dealType") || "PERCENTAGE";

  const isPercentage = dealType === "PERCENTAGE";

  return (
    <div className="w-full space-y-6">
      {/* 1. Discount Calculation Strategy */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm transition-all space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary shrink-0" />
              Discount Type
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Choose how the savings will be applied to the order.
            </p>
          </div>
        </div>

        {/* Responsive Segmented Radio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setValue("dealType", "PERCENTAGE", { shouldValidate: true })
            }
            className={`flex items-start gap-3.5 p-3.5 rounded-lg border text-left transition-all ${
              isPercentage
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/40 text-muted-foreground"
            }`}
          >
            <div
              className={`p-2 rounded-md shrink-0 ${
                isPercentage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <p
                className={`text-sm font-medium ${isPercentage ? "text-foreground" : ""}`}
              >
                Percentage Discount
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deducts a percentage from the total bill.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setValue("dealType", "FIXED_AMOUNT", { shouldValidate: true })
            }
            className={`flex items-start gap-3.5 p-3.5 rounded-lg border text-left transition-all ${
              !isPercentage
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/40 text-muted-foreground"
            }`}
          >
            <div
              className={`p-2 rounded-md shrink-0 ${
                !isPercentage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Banknote className="w-4 h-4" />
            </div>
            <div>
              <p
                className={`text-sm font-medium ${!isPercentage ? "text-foreground" : ""}`}
              >
                Fixed Flat Amount
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deducts a set currency amount from the total bill.
              </p>
            </div>
          </button>
        </div>

        {/* Input Fields for Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Discount Value */}
          <div className="space-y-1.5 min-w-0">
            <Label className="text-xs sm:text-sm font-medium text-foreground">
              Discount Value <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type="number"
                placeholder={isPercentage ? "15" : "500"}
                className="h-10 pr-12 border-border bg-background focus-visible:ring-2 focus-visible:ring-ring"
                {...register("discountValue", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground select-none">
                {isPercentage ? "% OFF" : "BDT"}
              </span>
            </div>
          </div>

          {/* Max Discount Limit */}
          <div className="space-y-1.5 min-w-0">
            <Label
              className={`text-xs sm:text-sm font-medium ${
                !isPercentage ? "text-muted-foreground/60" : "text-foreground"
              }`}
            >
              Max Discount Cap
            </Label>
            <div className="relative">
              <Input
                type="number"
                placeholder={isPercentage ? "e.g. 2000" : "Not applicable"}
                disabled={!isPercentage}
                className={`h-10 pr-12 border-border transition-all ${
                  !isPercentage
                    ? "bg-muted/40 text-muted-foreground/50 cursor-not-allowed border-dashed"
                    : "bg-background focus-visible:ring-2 focus-visible:ring-ring"
                }`}
                {...register("maxDiscount", { valueAsNumber: true })}
              />
              {isPercentage && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground select-none">
                  BDT
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Validity & Usage Limits */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm transition-all space-y-5">
        <div className="flex items-center gap-2 border-b border-border/80 pb-3">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <h3 className="text-base font-semibold text-foreground">
            Schedule & Usage Limits
          </h3>
        </div>

        {/* Fixed Responsive Layout for Date Pickers */}
        <div className="grid grid-cols-1 gap-5">
          {/* Start Date */}
          <div className="space-y-1.5  w-full">
            <Label className="text-xs sm:text-sm font-medium text-foreground">
              Start Date <span className="text-destructive">*</span>
            </Label>
            <div className="w-full relative [&_button]:w-full [&_button]:justify-between">
              <CustomDatePicker fieldName="startDate" />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1.5  w-full">
            <Label className="text-xs sm:text-sm font-medium text-foreground">
              End Date <span className="text-destructive">*</span>
            </Label>
            <div className="w-full relative [&_button]:w-full [&_button]:justify-between">
              <CustomDatePicker fieldName="endDate" />
            </div>
          </div>

          {/* Usage Limit */}
          <div className="space-y-1.5  w-full">
            <Label className="text-xs sm:text-sm font-medium text-foreground flex items-center justify-between">
              Total Redemptions
              <span className="text-[11px] font-normal text-muted-foreground">
                Optional
              </span>
            </Label>
            <div className="relative w-full">
              <Input
                type="number"
                placeholder="Unlimited"
                className="h-10 pr-16 border-border bg-background focus-visible:ring-2 focus-visible:ring-ring w-full"
                {...register("usageLimit", { valueAsNumber: true })}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none">
                uses
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual Helper Banner */}
        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>
            {isPercentage
              ? "Percentage discounts automatically calculate per transaction subject to your max cap limit."
              : "Fixed amount deals subtract the exact BDT value from eligible transactions."}
          </span>
        </div>
      </div>
    </div>
  );
}
