"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  Area,
} from "recharts";
import { AnalyticsDataPayload } from "@/types/admin/dashboard"; // Adjust this import path to your types location
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OccupancyCardProps {
  analyticsData?: AnalyticsDataPayload;
}

export default function OccupancyCard({ analyticsData }: OccupancyCardProps) {
  const [range, setRange] = useState("30");

  // Format and filter incoming API chart data dynamically
  const filteredData = useMemo(() => {
    if (!analyticsData?.occupancyChart) return [];

    const baseData = analyticsData.occupancyChart;
    // Handle slice range based on selected state dropdown
    const sliced = range === "7" ? baseData.slice(-7) : baseData;

    return sliced.map((item) => {
      // Use live absolute values from the parent or calculate proportional metrics
      const total = analyticsData?.totalRooms || 100;
      const occupiedCount = Math.round((item.occupancyRate / 100) * total);
      const availableCount = total - occupiedCount;

      return {
        day: item.label, // Maps to "May 22", "Jun 1", etc.
        occupancyRate: item.occupancyRate,
        Occupied: occupiedCount,
        Available: availableCount,
        NotReady: 0, // Fallback placeholder since backend payload omitted it
      };
    });
  }, [analyticsData, range]);


  // Aggregate overall historical average dynamically from active timeframe
  const avgOccupancy = useMemo(() => {
    if (filteredData.length === 0) return "0.0";
    const sum = filteredData.reduce((acc, curr) => acc + curr.occupancyRate, 0);
    return (sum / filteredData.length).toFixed(1);
  }, [filteredData]);

  const rangeItem = [
    { label: "30 Days", value: "30" },
    { label: "7 Days", value: "7" },
  ];

  return (
    <Motion animationType="fadeLeft">
      <Card className="bg-card shadow-lg py-6">
        {/* Header */}
        <div className="flex flex-col xl:flex-row items-stretch  xl:justify-between  gap-4 px-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="mt-1 inline-flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-transparent p-3 shadow-sm">
              <BarChart3 className="h-7 w-7 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-secondary-foreground">
                Occupancy Analytics
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Daily room status and occupancy trends
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* KPI display */}
            <div className="rounded-lg border px-4 py-2">
              <p className="text-xs text-muted-foreground">Avg Occupancy</p>
              <p className="text-lg font-semibold">{avgOccupancy}%</p>
            </div>

            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="30 Days" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {rangeItem.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chart Container */}
        <div className="px-2 pb-4">
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart
              data={filteredData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="availableGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="occupiedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="notReadyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.35}
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: "currentColor",
                }}
              />

              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: "currentColor",
                }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: "#8B5CF6",
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "#8B5CF6",
                  strokeOpacity: 0.15,
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: 12,
                  fontSize: "13px",
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Available"
                stackId="1"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#availableGradient)"
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Occupied"
                stackId="1"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#occupiedGradient)"
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="NotReady"
                stackId="1"
                stroke="#F97316"
                strokeWidth={2}
                fill="url(#notReadyGradient)"
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="occupancyRate"
                stroke="#8B5CF6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#8B5CF6",
                  strokeWidth: 0,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </Motion>
  );
}
