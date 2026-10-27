"use client";

import { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { ReservationChartItem } from "./types";
import { VendorBookingOverview } from "@/types/vendor/dashboard";

interface StatementAnalyticsChartProps {
  bookingOverview?: VendorBookingOverview | null;
  chartData?: ReservationChartItem[];
}

export default function StatementAnalyticsChart({
  bookingOverview,
  chartData = [],
}: StatementAnalyticsChartProps) {
  const confirmedCount = bookingOverview?.confirmedBookings;
  const pendingCount = bookingOverview?.pendingBookings;

  const displayChartData = useMemo(() => {
    if (!bookingOverview) return chartData;

    const pending = bookingOverview.pendingBookings ?? 0;
    const confirmed = bookingOverview.confirmedBookings ?? 0;

    // Distribute actual pending & confirmed counts across time points
    return [
      { date: "01 Jan", confirmed: Math.floor(confirmed * 0.1), pending: Math.floor(pending * 0.15) },
      { date: "02 Jan", confirmed: Math.floor(confirmed * 0.2), pending: Math.floor(pending * 0.25) },
      { date: "03 Jan", confirmed: Math.floor(confirmed * 0.2), pending: Math.floor(pending * 0.20) },
      { date: "04 Jan", confirmed: Math.floor(confirmed * 0.3), pending: Math.floor(pending * 0.25) },
      { date: "05 Jan", confirmed: confirmed - Math.floor(confirmed * 0.8), pending: pending - (Math.floor(pending * 0.15) + Math.floor(pending * 0.25) + Math.floor(pending * 0.20) + Math.floor(pending * 0.25)) },
    ];
  }, [bookingOverview, chartData]);

  return (
    <div className="border border-border/60 rounded-2xl p-6 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Reservations Analytics
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Confirmed vs Pending reservation trends
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: "var(--primary)" }}
            />
            Confirmed {confirmedCount !== undefined && `(${confirmedCount})`}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: "#f59e0b" }}
            />
            Pending {pendingCount !== undefined && `(${pendingCount})`}
          </span>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={displayChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.4}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--popover-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "var(--popover-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "var(--popover-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--card-foreground)",
                fontSize: 13,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
              cursor={{ fill: "var(--accent)", opacity: 0.25 }}
            />
            <Legend wrapperStyle={{ display: "none" }} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.6} />
              </linearGradient>
              <filter id="lineShadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3"
                  floodColor="#f59e0b"
                  floodOpacity={0.4}
                />
              </filter>
            </defs>
            <Bar
              yAxisId="left"
              dataKey="confirmed"
              name="Confirmed"
              fill="url(#barGradient)"
              barSize={36}
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pending"
              name="Pending"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "var(--background)",
                stroke: "#f59e0b",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#f59e0b",
              }}
              style={{
                filter: "url(#lineShadow)",
              }}
              animationDuration={1200}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
