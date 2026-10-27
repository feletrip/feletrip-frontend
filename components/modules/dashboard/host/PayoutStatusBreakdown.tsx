"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Motion } from "@/components/Reuseable/common/Framermotion";

type Props = {
  approvedCount: number;
  approvedPercent: number;
  pendingCount: number;
  pendingPercent: number;
  rejectedCount: number;
  rejectedPercent: number;
};

export default function PayoutStatusBreakdown({
  approvedCount,
  approvedPercent,
  pendingCount,
  pendingPercent,
  rejectedCount,
  rejectedPercent,
}: Props) {
  return (
    <Motion animationType="fadeUp" delay={0.25}>
      <div className="relative overflow-hidden rounded-2xl border border-accent bg-card p-5 shadow-lg space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/40 pb-3.5">
          <div>
            <h4 className="text-sm font-bold text-foreground">
              Payout Request Status Breakdown
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Distribution of all submitted withdrawal requests
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {approvedPercent}% Success Rate
          </span>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Approved & Completed */}
          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Approved &
                Completed
              </div>
              <span className="text-xs font-bold text-foreground">
                {approvedCount}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-emerald-500/20 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${approvedPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-right font-medium">
              {approvedPercent}% of total requests
            </p>
          </div>

          {/* Pending Review */}
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <Clock className="w-4 h-4 shrink-0" /> Pending Review
              </div>
              <span className="text-xs font-bold text-foreground">
                {pendingCount}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-amber-500/20 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${pendingPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-right font-medium">
              {pendingPercent}% of total requests
            </p>
          </div>

          {/* Rejected */}
          <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <XCircle className="w-4 h-4 shrink-0" /> Rejected
              </div>
              <span className="text-xs font-bold text-foreground">
                {rejectedCount}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-rose-500/20 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-500"
                style={{ width: `${rejectedPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-right font-medium">
              {rejectedPercent}% of total requests
            </p>
          </div>
        </div>
      </div>
    </Motion>
  );
}
