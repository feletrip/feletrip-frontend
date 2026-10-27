"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { BookingDistributionItem } from "@/types/admin/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface BookingByPlatformProps {
  distributionData?: BookingDistributionItem[];
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  confirmed: {
    color: "from-blue-500 to-indigo-500",
    icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
  },
  pending: {
    color: "from-yellow-400 to-orange-500",
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
  },
  cancelled: {
    color: "from-rose-500 to-pink-500",
    icon: <XCircle className="h-5 w-5 text-rose-500" />,
  },
  default: {
    color: "from-cyan-500 to-blue-500",
    icon: <HelpCircle className="h-5 w-5 text-cyan-500" />,
  },
};

export default function BookingByPlatform({
  distributionData = [],
}: BookingByPlatformProps) {
  return (
    <Motion animationType="fadeRight" delay={0.3}>
      <Card className="relative w-full p-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Booking Distribution
            </h2>
            <p className="text-xs text-muted-foreground">
              Performance by status breakdown
            </p>
          </div>

          <div className="flex border-4 rounded-full border-primary/50 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-warning/60 " />
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-5 relative">
          {distributionData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-xl border-border/60 bg-muted/10">
              <BarChart3 className="size-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                No booking distribution metrics available
              </p>
            </div>
          ) : (
            distributionData.map((item, idx) => {
              const normalizedStatus = item.status.toLowerCase();
              const config =
                statusConfig[normalizedStatus] || statusConfig.default;
              const displayTitle =
                item.status.charAt(0).toUpperCase() + item.status.slice(1);

              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={`absolute -inset-1 rounded-xl bg-linear-to-r ${config.color} opacity-20 blur-md`}
                        />
                        <div className="relative h-11 w-11 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                          {config.icon}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">{displayTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.count.toLocaleString()} bookings
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {item.percentage.toFixed(2)}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        distribution share
                      </p>
                    </div>
                  </div>

                  <div className="h-1 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full bg-linear-to-r ${config.color}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </Motion>
  );
}
