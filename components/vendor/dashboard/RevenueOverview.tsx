import {
  getRevenueOverview,
  getVendorRevenueAnalytics,
} from "@/Server/Vendor/dashboard.action";
import {
  DollarSign,
  TrendingUp,
  CalendarDays,
  History,
  BadgeDollarSign,
} from "lucide-react";
import { RevenueAnalytics } from "./RevenueAnalytics";
import { Motion } from "@/components/Reuseable/common/Framermotion";

const RevenueOverview = async () => {
  const res = await getRevenueOverview();
  const revenueOverview = res?.data;
  const analyticsRes = await getVendorRevenueAnalytics();
  const analytics = analyticsRes?.data;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${revenueOverview?.totalRevenue ?? 0}`,
      icon: DollarSign,
      description: "Overall earnings",
      iconClass: "bg-primary/15 text-primary",
    },
    {
      title: "Revenue Growth",
      value: `${revenueOverview?.revenueGrowth ?? 0}%`,
      icon: TrendingUp,
      description: "Compared to previous period",
      iconClass: "bg-success/15 text-success",
    },
    {
      title: "Current Period Revenue",
      value: `$${revenueOverview?.currentPeriodRevenue ?? 0}`,
      icon: CalendarDays,
      description: "This billing cycle",
      iconClass: "bg-info/15 text-info",
    },
    {
      title: "Previous Period Revenue",
      value: `$${revenueOverview?.previousPeriodRevenue ?? 0}`,
      icon: History,
      description: "Last billing cycle",
      iconClass: "bg-warning/15 text-warning",
    },
    {
      title: "Average Booking Value",
      value: `$${revenueOverview?.averageBookingValue ?? 0}`,
      icon: BadgeDollarSign,
      description: "Average income per booking",
      iconClass: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <Motion>
      <section className="flex flex-col rounded-2xl border space-y-6 p-6 bg-linear-to-bl from-[#4ed1fc]/10 to-[#4ed1fc]/5">
        {/* Header Card */}
        <div className="">
          <div className="mb-6 flex items-center justify-between">
            <Motion animationType="fadeLeft" delay={0.3}>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Revenue Overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track your properties&apos;s financial performance
                </p>
              </div>
            </Motion>
            <Motion animationType="fadeLeft" delay={0.5}>
              <div className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Analytics
              </div>
            </Motion>
          </div>

          {/* Revenue Cards */}
          <div className="grid gap-5 h-full">
            {stats.map((item, idx) => {
              const Icon = item.icon;

              return (
                <Motion
                  key={item.title}
                  animationType="slideUp"
                  delay={idx * 0.2}
                >
                  <div className="group flex flex-col h-full items-start  justify-between rounded-xl border border-border bg-background px-5 py-4 transition-all duration-300 hover:bg-muted/50 hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconClass}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Motion>
              );
            })}
          </div>
        </div>

        {/* Chart Section */}
        <div className="">
          <RevenueAnalytics analytics={analytics} />
        </div>
      </section>
    </Motion>
  );
};

export default RevenueOverview;
