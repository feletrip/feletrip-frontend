"use client";

import { useState, useMemo } from "react";
import { IVendorWalletData } from "@/Server/Vendor/vendorGetWallet.action";
import { IWithdrawalItem } from "@/Server/Vendor/vendorWithdrawalHistory.action";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Search, Wallet, ShieldCheck, Zap } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

import WithdrawalHistoryTable from "./WithdrawalHistoryTable";
import BalanceOverviewSection from "./BalanceOverviewSection";
import PayoutStatusBreakdown from "./PayoutStatusBreakdown";

type Props = {
  walletData: IVendorWalletData | null;
  withdrawalHistory: IWithdrawalItem[];
};

export default function TransactionsDashboard({
  walletData,
  withdrawalHistory = [],
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Wallet Metrics
  const totalEarnings = walletData?.totalEarnings ?? 0;
  const availableBalance = walletData?.availableBalance ?? 0;
  const blockedBalance = walletData?.blockedBalance ?? 0;
  const totalWithdrawn = walletData?.totalWithdrawn ?? 0;

  // Filter Logic
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return withdrawalHistory.filter((item) => {
      const matchesSearch =
        !q ||
        item.paymentMethod?.toLowerCase().includes(q) ||
        item.accountName?.toLowerCase().includes(q) ||
        item.accountNumber?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        item.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [withdrawalHistory, search, statusFilter]);

  // Breakdown Calculation Logic
  const totalWithdrawals = withdrawalHistory.length;

  const getStatusCount = (statusList: string[]) =>
    withdrawalHistory.filter((w) =>
      statusList.some((s) => s.toLowerCase() === w.status?.toLowerCase()),
    ).length;

  const approvedCount = getStatusCount(["approved", "completed"]);
  const pendingCount = getStatusCount(["pending"]);
  const rejectedCount = getStatusCount(["rejected"]);

  const getPercent = (count: number) =>
    totalWithdrawals === 0 ? 0 : Math.round((count / totalWithdrawals) * 100);

  return (
    <div className="space-y-6 w-full">
      {/* Header Banner */}
      <Motion animationType="fade">
        <div className="relative overflow-hidden rounded-2xl border border-accent bg-card p-4 shadow-lg group">
          {/* Animated Background Container */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -25, x: -20, y: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -12, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="absolute -top-10 -left-10 h-36 w-40 rounded-3xl bg-primary/5 border border-primary/20 transition-transform duration-500 group-hover:-rotate-6"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 20, y: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 45, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              className="absolute -bottom-8 right-1/3 h-24 w-24 rounded-2xl bg-accent/40 border border-border/40"
            />
          </div>

          {/* Header Content */}
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Motion animationType="fadeLeft" delay={0.2}>
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 ring-1 ring-primary/20 shadow-xs">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      Vendor Wallet & Withdrawals
                    </CardTitle>
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                      <ShieldCheck className="w-3 h-3" /> Protected
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Monitor balances, review escrow holds, and manage payout
                    requests in real-time.
                  </p>
                </div>
              </div>
            </Motion>

            {/* Stat Card */}
            <Motion animationType="fadeRight" delay={0.2}>
              <div className="flex items-center gap-3 rounded-lg bg-accent/40 p-2.5 pr-5 shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-linear-to-br from-primary to-primary/60 text-background font-bold text-2xl shadow-sm">
                  {totalWithdrawals}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground leading-tight">
                    Total Withdrawals
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Lifetime requests
                  </span>
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </Motion>

      {/* 1. Balance Section */}
      <BalanceOverviewSection
        availableBalance={availableBalance}
        totalEarnings={totalEarnings}
        blockedBalance={blockedBalance}
        totalWithdrawn={totalWithdrawn}
        onWithdrawClick={() => {}}
      />

      {/* 2. Payout Request Status Breakdown Section */}
      <PayoutStatusBreakdown
        approvedCount={approvedCount}
        approvedPercent={getPercent(approvedCount)}
        pendingCount={pendingCount}
        pendingPercent={getPercent(pendingCount)}
        rejectedCount={rejectedCount}
        rejectedPercent={getPercent(rejectedCount)}
      />

      {/* Search & Sorting Toolbar */}
      <Motion animationType="fadeDown" delay={0.2}>
        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 p-3 shadow-lg md:flex-row md:items-center md:justify-between bg-accent">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payment method, name, account number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 bg-background! border-border/40 focus-visible:ring-1 focus-visible:ring-primary rounded-lg font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10! w-40 border-border/40 rounded-lg font-medium bg-background! cursor-pointer">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/60">
                <SelectItem className="cursor-pointer" value="all">
                  All Statuses
                </SelectItem>
                <SelectItem className="cursor-pointer" value="pending">
                  Pending
                </SelectItem>
                <SelectItem className="cursor-pointer" value="approved">
                  Approved
                </SelectItem>
                <SelectItem className="cursor-pointer" value="completed">
                  Completed
                </SelectItem>
                <SelectItem className="cursor-pointer" value="rejected">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Motion>

      {/* Table Content */}
      <Motion delay={0.2}>
        <WithdrawalHistoryTable withdrawals={filtered} />
      </Motion>
    </div>
  );
}
