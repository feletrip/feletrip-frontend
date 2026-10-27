"use client";

import { Activity, TrendingUp, CalendarDays, Zap } from "lucide-react";
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

import { VendorBookingTrend } from "@/types/vendor/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface BookingTrendProps {
  bookingTrend: VendorBookingTrend[] | undefined;
}

export function BookingTrend({ bookingTrend }: BookingTrendProps) {
  const chartData =
    bookingTrend?.map((item) => ({
      date: item.label,
      bookings: item.value,
    })) ?? [];

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const maxBookingDay = chartData.reduce(
    (prev, current) => (current.bookings > prev.bookings ? current : prev),
    { date: "-", bookings: 0 },
  );

  const activeDays = chartData.filter((item) => item.bookings > 0).length;

  return (
    <Card className="overflow-hidden border-border bg-linear-to-tl from-[#fc834e]/5 to-[#fceb4e]/5 shadow-sm pt-4 ">
      {/* Header */}
      <Motion animationType="fadeRight" delay={0.5}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10  items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Zap size={20} />
                </div>

                <div>
                  <CardTitle>Booking Activity</CardTitle>

                  <CardDescription>
                    Daily reservation performance
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Motion>

      {/* Chart */}
      {/* <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-85  w-full ">
          <AreaChart
            data={chartData}
            margin={{
              left: 10,
              right: 10,
              top: 20,
            }}
          >
            <defs>
              <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.55}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="4 4" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={3}
            />

            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

            <ChartTooltip
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1,
              }}
              content={<ChartTooltipContent />}
            />

            <Area
              dataKey="books"
              type="monotone"
              stroke="var(--color-bookings)"
              fill="url(#bookingGradient)"
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "var(--primary)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent> */}
      <Motion animationType="fadeLeft" delay={0.5}>
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
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="bookings"
                type="step"
                fill="var(--color-bookings)"
                fillOpacity={0.4}
                stroke="var(--color-bookings)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Motion>

      {/* Footer Stats */}
      <Motion animationType="fadeRight" delay={0.5}>
        <CardFooter className="border-t border-border bg-background/50 py-4">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-primary" size={18} />

              <div>
                <p className="text-xs text-muted-foreground">Tracking Period</p>

                <p className=" font-medium text-sm  text-foreground">31 Days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 ">
              <Activity className="text-success" size={18} />

              <div>
                <p className="text-xs text-muted-foreground">Active Days</p>

                <p className="font-medium text-sm ">{activeDays}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary" size={18} />

              <div>
                <p className="text-xs  text-muted-foreground ">Peak Day</p>

                <p className="font-medium text-sm ">{maxBookingDay.date}</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Motion>
    </Card>
  );
}
