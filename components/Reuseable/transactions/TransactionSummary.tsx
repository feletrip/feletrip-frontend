"use client";

import { Clock3, ReceiptText, RotateCcw, Wallet } from "lucide-react";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import {
  calculateTransactionSummary,
  formatTransactionCurrency,
} from "@/lib/transaction-utils";
import { Transaction } from "@/types/user/transactionHistory";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const summary = calculateTransactionSummary(transactions);

  const cards = [
    {
      title: "Total Transactions",
      value: summary.totalTransactions,
      icon: ReceiptText,
      bgGlow: "from-primary/25 via-primary/10 to-transparent",
      iconStyle:
        "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(61,207,182,0.35)]",
      borderGlow: "hover:border-primary/40",
    },
    {
      title: "Total Paid",
      value: formatTransactionCurrency(summary.totalPaid),
      icon: Wallet,
      bgGlow: "from-success/25 via-success/10 to-transparent",
      iconStyle:
        "bg-success text-success-foreground shadow-[0_10px_30px_rgba(34,197,94,0.35)]",
      borderGlow: "hover:border-success/40",
    },
    {
      title: "Pending Amount",
      value: formatTransactionCurrency(summary.pendingAmount),
      icon: Clock3,
      bgGlow: "from-warning/25 via-warning/10 to-transparent",
      iconStyle:
        "bg-warning text-warning-foreground shadow-[0_10px_30px_rgba(245,158,11,0.35)]",
      borderGlow: "hover:border-warning/40",
    },
    {
      title: "Refunded",
      value: formatTransactionCurrency(summary.refundedAmount),
      icon: RotateCcw,
      bgGlow: "from-info/25 via-info/10 to-transparent",
      iconStyle:
        "bg-info text-info-foreground shadow-[0_10px_30px_rgba(59,130,246,0.35)]",
      borderGlow: "hover:border-info/40",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <Motion
          key={card.title}
          animationType="card"
          custom={index}
        >
          <StatsCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            bgGlow={card.bgGlow}
            iconStyle={card.iconStyle}
            borderGlow={card.borderGlow}
          />
        </Motion>
      ))}
    </div>
  );
}
