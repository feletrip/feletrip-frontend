"use client";

import { motion } from "framer-motion";

interface StatusConfigItem {
  label: string;
  gradient: string;
  border: string;
  text: string;
  dotColor: string;
  pulseColor: string;
}

const statusConfig: Record<string, StatusConfigItem> = {
  completed: {
    label: "Completed",
    gradient: "from-emerald-500/15 via-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    text: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    pulseColor: "bg-emerald-400",
  },
  confirmed: {
    label: "Confirmed",
    gradient: "from-success/15 via-success/10 to-success/5",
    border: "border-success/30 hover:border-success/50",
    text: "text-success",
    dotColor: "bg-success",
    pulseColor: "bg-success/80",
  },
  paid: {
    label: "Paid",
    gradient: "from-emerald-500/15 via-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    text: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    pulseColor: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    gradient: "from-amber-500/15 via-amber-500/10 to-orange-500/5",
    border: "border-amber-500/30 hover:border-amber-500/50",
    text: "text-amber-700 dark:text-amber-400",
    dotColor: "bg-amber-500",
    pulseColor: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    gradient: "from-rose-500/15 via-rose-500/10 to-red-500/5",
    border: "border-rose-500/30 hover:border-rose-500/50",
    text: "text-rose-700 dark:text-rose-400",
    dotColor: "bg-rose-500",
    pulseColor: "bg-rose-400",
  },
  rejected: {
    label: "Rejected",
    gradient: "from-red-500/15 via-red-500/10 to-red-500/5",
    border: "border-red-500/30 hover:border-red-500/50",
    text: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-500",
    pulseColor: "bg-red-400",
  },
};

// Fallback configuration for unknown statuses
const defaultConfig: StatusConfigItem = {
  label: "Unknown",
  gradient: "from-slate-500/15 via-slate-500/10 to-zinc-500/5",
  border: "border-slate-500/30",
  text: "text-slate-700 dark:text-slate-400",
  dotColor: "bg-slate-500",
  pulseColor: "bg-slate-400",
};

export const StatusBadge = ({ status }: { status: string }) => {
  const normalizedKey = status?.toLowerCase();
  const config = statusConfig[normalizedKey] || {
    ...defaultConfig,
    label: status || defaultConfig.label,
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 
        rounded-full text-xs font-semibold tracking-wide 
        bg-linear-to-r ${config.gradient} 
        border ${config.border} ${config.text}
        shadow-xs backdrop-blur-md transition-all duration-300
        select-none cursor-default
      `}
    >
      {/* Animated Glowing Status Dot */}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            normalizedKey === "pending" ? "animate-ping" : ""
          } ${config.pulseColor}`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dotColor}`}
        />
      </span>

      {/* Label */}
      <span className="capitalize">{config.label}</span>
    </motion.span>
  );
};
