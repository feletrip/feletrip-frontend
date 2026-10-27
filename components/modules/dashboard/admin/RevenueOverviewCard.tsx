import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Card } from "@/components/ui/card";
import { ChevronDown, Coins, Monitor } from "lucide-react";
import { RevenueOverviewData } from "@/types/admin/dashboard";
import { RevenueChart } from "./RevenueChart";

interface RevenueOverviewCardProps {
  revenueData?: RevenueOverviewData;
}

export default function RevenueOverviewCard({
  revenueData,
}: RevenueOverviewCardProps) {
  const totalRevenue = revenueData?.totalRevenue || 0;
  const monthlyRevenue = revenueData?.monthlyRevenue || 0;
  const revenueGrowth = revenueData?.revenueGrowth || 0;

  return (
    <Motion animationType="fadeRight">
      <Card className="relative w-full overflow-hidden border p-6 shadow-lg">
        <div className="absolute -top-20 -right-20 h-40 w-40 bg-violet-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-primary/20 blur-3xl rounded-full" />

        <div className="flex items-start justify-between relative mb-10">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Revenue Overview
            </h2>

            <p className="text-sm text-muted-foreground">Total Revenue</p>

            <p className="text-3xl font-bold bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>

          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium 
            bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            30 Days
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Coins size={20} className="text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              <p className="text-lg font-semibold text-secondary-foreground">
                ${monthlyRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Monitor size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revenue Growth</p>
              <p className="text-lg font-semibold text-secondary-foreground">
                {revenueGrowth.toLocaleString()}%
              </p>
            </div>
          </div>
        </div>

        <hr className="my-5 border-t" />
        <RevenueChart chartData={revenueData?.revenueChart}></RevenueChart>
      </Card>
    </Motion>
  );
}
