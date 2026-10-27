"use client";

import React, { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Banknote,
  Percent,
  Save,
  Loader2,
  RefreshCw,
  Sliders,
  Sparkles,
} from "lucide-react";
import {
  IWithdrawalLimitAndCommission,
  updateWithdrawalLimitAndCommission,
} from "@/Server/Admin/limitAndCommission.action";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { toast } from "@/components/Reuseable/common/toast";
import { Button } from "@/components/ui/button";

interface CommissionPageProps {
  initialData: IWithdrawalLimitAndCommission | null;
}

interface FormValues {
  minimumWithdrawal: number;
  commissionRate: number;
}

export default function CommissionPage({ initialData }: CommissionPageProps) {
  const [isPending, startTransition] = useTransition();

  // Active confirmed values used by StatsCards (only update on success)
  const [confirmedData, setConfirmedData] = useState({
    minimumWithdrawal: initialData ? Number(initialData.minimumWithdrawal) : 0,
    commissionRate: initialData ? Number(initialData.commissionRate) : 0,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormValues>({
    defaultValues: {
      minimumWithdrawal: confirmedData.minimumWithdrawal,
      commissionRate: confirmedData.commissionRate,
    },
  });

  // Watch inputs safely for live preview feedback
  const minWithdrawalInput = useWatch({ control, name: "minimumWithdrawal" });
  const commissionRateInput = useWatch({ control, name: "commissionRate" });

  const onSubmit = (values: FormValues) => {
    toast.loading(
      "Updating settings...",
      "Please wait while we save your changes.",
    );

    startTransition(async () => {
      const response = await updateWithdrawalLimitAndCommission(values);
      if (response?.success) {
        // Update stats card display values ONLY on success
        setConfirmedData({
          minimumWithdrawal: values.minimumWithdrawal,
          commissionRate: values.commissionRate,
        });

        // Reset form dirtiness state with updated values
        reset(values);

        toast.success(
          "Settings Updated",
          "Withdrawal limit and commission rate updated successfully!",
        );
      } else {
        toast.error(
          "Update Failed",
          response?.message || "Something went wrong while updating settings.",
        );
      }
    });
  };

  return (
    <div className="space-y-6 w-full p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="relative z-10">
        <Motion>
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-3xl p-9 border-ring/30 bg-primary/10">
            <SectionHeader
              title="Withdrawal Limit & Commission"
              description="Configure system-wide vendor withdrawal minimums and platform commission rates."
              highlight="Settings"
            />
            {initialData?.updatedAt && (
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-background/80 border border-border/40 px-3.5 py-2 rounded-lg shadow-xs backdrop-blur-sm">
                <RefreshCw className="w-3.5 h-3.5 text-primary" />
                <span>
                  Last updated:{" "}
                  {new Date(initialData.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </Motion>
      </div>

      {/* Analytics Summary Cards */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatsCard
            title="Minimum Withdrawal Limit"
            value={`৳${Number(confirmedData.minimumWithdrawal || 0).toLocaleString()}`}
            animationIndex={0}
            icon={Banknote}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-blue-500-foreground"
          />

          <StatsCard
            title="Platform Commission Rate"
            value={`${confirmedData.commissionRate || 0}%`}
            animationIndex={1}
            icon={Percent}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-emerald-500-foreground"
          />
        </div>
      </Motion>

      {/* Main Form Configuration Card (Minimal & Modern Variant) */}
      <Motion delay={0.25}>
        <div className="relative overflow-hidden border border-border/50 bg-card rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Form Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 text-primary border border-primary/15 rounded-xl shadow-2xs">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
                  Update Settings
                  <Sparkles className="w-3.5 h-3.5 text-primary/70" />
                </h2>
                <p className="text-xs text-muted-foreground">
                  Adjust platform thresholds and commission percentages.
                </p>
              </div>
            </div>

            {isDirty && (
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full animate-pulse">
                Unsaved changes
              </span>
            )}
          </div>

          {/* Form Controls */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Minimum Withdrawal Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-foreground tracking-wide uppercase text-[11px]">
                    Minimum Withdrawal (৳)
                  </label>
                  {minWithdrawalInput !== confirmedData.minimumWithdrawal && (
                    <span className="text-[10px] text-muted-foreground italic">
                      Current: ৳{confirmedData.minimumWithdrawal}
                    </span>
                  )}
                </div>
                <div className="relative rounded-xl group">
                  {/* Icon - Force visible with z-10 */}
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors z-10">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    {...register("minimumWithdrawal", {
                      required: "Minimum limit is required",
                      min: { value: 0, message: "Limit cannot be negative" },
                      valueAsNumber: true,
                    })}
                    className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border/60 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g. 1000"
                  />
                </div>
                {errors.minimumWithdrawal && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.minimumWithdrawal.message}
                  </p>
                )}
              </div>

              {/* Commission Rate Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-foreground tracking-wide uppercase text-[11px]">
                    Commission Rate (%)
                  </label>
                  {commissionRateInput !== confirmedData.commissionRate && (
                    <span className="text-[10px] text-muted-foreground italic">
                      Current: {confirmedData.commissionRate}%
                    </span>
                  )}
                </div>
                <div className="relative rounded-xl group">
                  {/* Icon - Force visible with z-10 */}
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors z-10">
                    <Percent className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    {...register("commissionRate", {
                      required: "Commission rate is required",
                      min: { value: 0, message: "Rate cannot be negative" },
                      max: { value: 100, message: "Rate cannot exceed 100%" },
                      valueAsNumber: true,
                    })}
                    className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g. 10"
                  />
                </div>
                {errors.commissionRate && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.commissionRate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex justify-end border-t border-border/40">
              <Button
                type="submit"
                disabled={isPending || !isDirty}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Motion>
    </div>
  );
}
