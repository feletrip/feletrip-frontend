"use client";

import React from "react";
import DashboardStatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Ticket, Flame, Clock, AlertCircle } from "lucide-react";

interface DealStatsProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    expired: number;
  };
}

const statsItems = [
  {
    title: "Total Deals",
    key: "total",
    icon: Ticket,
    bgGlow: "from-primary/25 via-primary/5 to-transparent",
    iconStyle: "bg-primary text-primary-foreground",
    borderGlow: "hover:border-primary/40",
    subtitle: "Deals Created",
  },
  {
    title: "Active Deals",
    key: "active",
    icon: Flame,
    bgGlow: "from-amber-500/25 via-amber-500/5 to-transparent",
    iconStyle: "bg-amber-500 text-white",
    borderGlow: "hover:border-amber-500/40",
    subtitle: "Currently Live",
  },
  {
    title: "Pending Deals",
    key: "pending",
    icon: AlertCircle,
    bgGlow: "from-blue-500/25 via-blue-500/5 to-transparent",
    iconStyle: "bg-blue-500 text-white",
    borderGlow: "hover:border-blue-500/40",
    subtitle: "Awaiting Approval",
  },
  {
    title: "Expired Deals",
    key: "expired",
    icon: Clock,
    bgGlow: "from-rose-500/25 via-rose-500/5 to-transparent",
    iconStyle: "bg-rose-500 text-white",
    borderGlow: "hover:border-rose-500/40",
    subtitle: "Validity Ended",
  },
];

export default function DealStats({ stats }: DealStatsProps) {
  const safeStats = stats || { total: 0, active: 0, pending: 0, expired: 0 };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
      {statsItems.map((item, index) => (
        <DashboardStatsCard
          key={item.key}
          title={item.title}
          value={safeStats[item.key as keyof typeof safeStats] ?? 0}
          icon={item.icon}
          bgGlow={item.bgGlow}
          iconStyle={item.iconStyle}
          borderGlow={item.borderGlow}
          subtitle={item.subtitle}
          animationIndex={index}
        />
      ))}
    </div>
  );
}
