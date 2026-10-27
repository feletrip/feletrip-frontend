"use client";

import React, { useState, useTransition } from "react";
import { getAllAdminWithdrawals } from "@/Server/Admin/getAllWithdrawals.action";
import {
  Wallet,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import {
  IAdminWithdrawalItem,
  WithdrawalStatus,
} from "@/types/admin/withdrawal";
import { WithdrawalDetailsModal } from "./WithdrawalDetailsModal";
import { WithdrawalsTableAdmin } from "./WithdrawalsTableAdmin";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import SectionHeader from "@/components/Reuseable/SectionHeader";

interface WithdrawalsClientProps {
  withdrawalsData: IAdminWithdrawalItem[];
}

export default function WithdrawalsClient({
  withdrawalsData,
}: WithdrawalsClientProps) {
  const [withdrawals, setWithdrawals] =
    useState<IAdminWithdrawalItem[]>(withdrawalsData);
  const [selectedStatus, setSelectedStatus] = useState<
    WithdrawalStatus | "all"
  >("all");
  const [selectedItem, setSelectedItem] = useState<IAdminWithdrawalItem | null>(
    null,
  );

  // Form State inside Modal
  const [modalStatus, setModalStatus] = useState<WithdrawalStatus>("pending");
  const [modalNote, setModalNote] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  // Status icon mapping
  const statusIcons: Record<string, LucideIcon> = {
    pending: Clock,
    approved: CheckCircle2,
    paid: Wallet,
    rejected: XCircle,
  };

  const bgGlowMap: Record<string, string> = {
    pending: "from-amber-500/25 via-amber-500/5 to-transparent",
    approved: "from-blue-500/25 via-blue-500/5 to-transparent",
    paid: "from-emerald-500/25 via-emerald-500/5 to-transparent",
    rejected: "from-rose-500/25 via-rose-500/5 to-transparent",
  };

  const iconStyleMap: Record<string, string> = {
    pending: "bg-amber-500 text-amber-500-foreground",
    approved: "bg-blue-500 text-blue-500-foreground",
    paid: "bg-emerald-500 text-emerald-500-foreground",
    rejected: "bg-rose-500 text-rose-500-foreground",
  };

  // Open detail modal and pre-fill input states
  const handleOpenDetails = (item: IAdminWithdrawalItem) => {
    setSelectedItem(item);
    setModalStatus(item.status);
    setModalNote(item.adminNote || "");
  };

  // Refetch data on status filter change
  const handleStatusFilter = (status: WithdrawalStatus | "all") => {
    setSelectedStatus(status);
    startTransition(async () => {
      const apiStatus = status === "all" ? undefined : status;
      const res = await getAllAdminWithdrawals(apiStatus);
      if (res?.success && res.data) {
        setWithdrawals(res.data);
      } else {
        setWithdrawals([]);
      }
    });
  };

  // Update state upon successful modal action
  const handleSuccessUpdate = (updatedItem: IAdminWithdrawalItem) => {
    setWithdrawals((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // Quick summary numbers
  const totalAmount = withdrawals.reduce(
    (acc, curr) => acc + (Number(curr.amount) || 0),
    0,
  );
  const pendingCount = withdrawals.filter((i) => i.status === "pending").length;
  const paidCount = withdrawals.filter((i) => i.status === "paid").length;
  const rejectedCount = withdrawals.filter(
    (i) => i.status === "rejected",
  ).length;

  return (
    <div className="space-y-6 w-full p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="relative z-10">
        <Motion>
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-2xl p-9 border-ring/30 bg-primary/10">
            <SectionHeader
              title="Admin Withdrawals"
              description="Review, track, and manage vendor payout requests and settled platform commissions."
              highlight="Admin Withdrawals"
            />
          </div>
        </Motion>
      </div>

      {/* Analytics Summary Cards (4 Grid Layout) */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Payout"
            subtitle="Summary"
            value={`৳${totalAmount.toLocaleString()}`}
            animationIndex={0}
            icon={DollarSign}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-blue-500-foreground"
          />

          <StatsCard
            title="Pending Requests"
            subtitle="Requires Action"
            value={pendingCount}
            animationIndex={1}
            icon={statusIcons.pending || HelpCircle}
            bgGlow={bgGlowMap.pending}
            iconStyle={iconStyleMap.pending}
          />

          <StatsCard
            title="Completed (Paid)"
            subtitle="Settled"
            value={paidCount}
            animationIndex={2}
            icon={statusIcons.paid || HelpCircle}
            bgGlow={bgGlowMap.paid}
            iconStyle={iconStyleMap.paid}
          />

          <StatsCard
            title="Rejected Requests"
            subtitle="Declined"
            value={rejectedCount}
            animationIndex={3}
            icon={statusIcons.rejected || HelpCircle}
            bgGlow={bgGlowMap.rejected}
            iconStyle={iconStyleMap.rejected}
          />
        </div>
      </Motion>

      {/* Status Filter Tabs */}
      <Motion animationType="fadeDown" delay={0.2}>
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-background rounded-xl border border-border/40 shrink-0 w-fit">
          {(["all", "pending", "approved", "paid", "rejected"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap cursor-pointer ${
                  selectedStatus === status
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </Motion>

      {/* Main Table Component */}
      <Motion delay={0.25}>
        <WithdrawalsTableAdmin
          withdrawals={withdrawals}
          isPending={isPending}
          onOpenDetails={handleOpenDetails}
        />
      </Motion>

      {/* Modal View */}
      <WithdrawalDetailsModal
        selectedItem={selectedItem}
        onCloseModal={() => setSelectedItem(null)}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        modalNote={modalNote}
        setModalNote={setModalNote}
        onSuccess={handleSuccessUpdate}
      />
    </div>
  );
}
