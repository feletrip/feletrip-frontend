"use client";

import { Motion } from "../../../../../../../components/Reuseable/common/Framermotion";
import { TicketPercent, Flame, Sparkles, Plus } from "lucide-react";
import Link from "next/link";

interface DealsHeaderProps {
  onCreateClick?: () => void;
}

export default function DealsHeader({}: DealsHeaderProps) {
  return (
    <Motion
      animationType="slideUp"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 lg:p-12"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
              <TicketPercent className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                Live Deals
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30">
                Flash Sale
              </span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Deals Management
          </h1>

          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl leading-relaxed">
            Create, update, and monitor your promotional offers, discounts, and
            exclusive deals. Boost your sales and engage users effectively.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4 text-amber-500" />
              <span>Active Promotions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Coupon Controls</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href={"/dashboard/host/dealsSection/dealsAdd"}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-primary rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary/50  hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Deal</span>
          </Link>
        </div>
      </div>
    </Motion>
  );
}
