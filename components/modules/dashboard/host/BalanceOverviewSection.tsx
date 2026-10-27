"use client";

import { useState } from "react";
import {
  Wallet,
  Sparkles,
  ArrowRight,
  DollarSign,
  Lock,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import WithdrawalModal from "./WithdrawalModal";

type Props = {
  availableBalance: number;
  totalEarnings: number;
  blockedBalance: number;
  totalWithdrawn: number;
  onWithdrawClick?: () => void;
};

export default function BalanceOverviewSection({
  availableBalance,
  totalEarnings,
  blockedBalance,
  totalWithdrawn,
  onWithdrawClick,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onWithdrawClick) onWithdrawClick();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-12">
        {/* Available Balance Card */}
        <Motion animationType="fadeUp" delay={0.1} className="xl:col-span-5">
          <Card className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-card via-card/90 to-primary/5 shadow-lg transition-all duration-300 hover:border-primary/40 flex flex-col justify-between h-full group">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

            <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-xl bg-primary/15 text-primary border border-primary/20 shadow-xs">
                    <Wallet className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Available Balance
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Ready for payout
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant</span>
                </div>
              </div>

              <div className="space-y-1 my-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Withdrawable Amount
                </p>
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                  ৳{availableBalance.toLocaleString()}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  onClick={handleOpenModal}
                  className="w-full cursor-pointer"
                >
                  <span>Request Withdrawal</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Motion>

        {/* Financial Summary Card */}
        <Motion animationType="fadeUp" delay={0.2} className="xl:col-span-7">
          <Card className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg p-6 h-full flex flex-col justify-between">
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-border/40">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Financial Summary
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-accent/60 px-2.5 py-1 rounded-full border border-border/40">
                <CalendarDays className="w-3.5 h-3.5 text-primary" />
                <span>Lifetime Overview</span>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <StatsCard
                title="Total Revenue"
                value={`৳${totalEarnings.toLocaleString()}`}
                icon={DollarSign}
                bgGlow="from-emerald-500/25 via-emerald-500/10 to-transparent"
                iconStyle="bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                borderGlow="hover:border-emerald-500/40"
              />

              <StatsCard
                title="Escrow Balance"
                value={`৳${blockedBalance.toLocaleString()}`}
                icon={Lock}
                bgGlow="from-amber-500/25 via-amber-500/10 to-transparent"
                iconStyle="bg-amber-500 text-white shadow-[0_10px_30px_rgba(245,158,11,0.35)]"
                borderGlow="hover:border-amber-500/40"
              />

              <StatsCard
                title="Total Paid"
                value={`৳${totalWithdrawn.toLocaleString()}`}
                icon={ArrowUpRight}
                bgGlow="from-primary/25 via-primary/10 to-transparent"
                iconStyle="bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(61,207,182,0.35)]"
                borderGlow="hover:border-primary/40"
              />
            </div>
          </Card>
        </Motion>
      </div>

      <WithdrawalModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        availableBalance={availableBalance}
      />
    </>
  );
}
