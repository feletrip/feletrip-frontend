"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { VendorRevenueAnalytics } from "@/types/vendor/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";

export const description = "A bar chart with negative values";

interface AnalyticsProps {
  analytics: VendorRevenueAnalytics[] | undefined;
}
export function RevenueAnalytics({ analytics }: AnalyticsProps) {

  //   const demo = [
  //     {
  //       label: "Jun 20",
  //       value: 52,
  //     },
  //     {
  //       label: "Jun 21",
  //       value: 54,
  //     },
  //     {
  //       label: "Jun 22",
  //       value: 45,
  //     },
  //     {
  //       label: "Jun 23",
  //       value: -44,
  //     },
  //     {
  //       label: "Jun 24",
  //       value: 87,
  //     },
  //     {
  //       label: "Jun 25",
  //       value: 45,
  //     },
  //     {
  //       label: "Jun 26",
  //       value: 45,
  //     },
  //     {
  //       label: "Jun 27",
  //       value: 0,
  //     },
  //     {
  //       label: "Jun 28",
  //       value: 0,
  //     },
  //     {
  //       label: "Jun 29",
  //       value: 0,
  //     },
  //     {
  //       label: "Jun 30",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 1",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 2",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 3",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 4",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 5",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 6",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 7",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 8",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 9",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 10",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 11",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 12",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 13",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 14",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 15",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 16",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 17",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 18",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 19",
  //       value: 0,
  //     },
  //     {
  //       label: "Jul 20",
  //       value: 0,
  //     },
  //   ];

  const chartData =
    analytics?.map((analytic) => ({
      month: analytic.label,
      value: analytic.value,
    })) || [];

  const chartConfig = {
    value: {
      label: "Revenue",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    <Motion>
      <Card className="py-3 pr-3 bg-linear-to-tr from-ring/20 to-warning/10">
        <Motion animationType="fadeLeft" delay={0.2}>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>
              Showing total revenue for the selected period
            </CardDescription>
          </CardHeader>
        </Motion>
        <Motion animationType="fadeRight" delay={0.5}>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <Area
                  dataKey="value"
                  type="natural"
                  fill="url(#fillRevenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-value)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Motion>
        <Motion animationType="fadeRight" delay={0.2}>
          <CardFooter className="mt-3 ">
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Revenue performance <TrendingUp className="h-4 w-4" />
                </div>

                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardFooter>
        </Motion>
      </Card>
    </Motion>
  );
}
