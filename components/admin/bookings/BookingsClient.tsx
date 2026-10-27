"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { StatCard } from "@/components/Reuseable/StatCard";
import BookingDataGrid from "@/components/admin/bookings/BookingDataGrid";

import { iconMap } from "@/data/admin/booking/bookingData";

import { BookingProps } from "@/data/admin/booking/bookingData";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";

type Props = BookingProps & {
  bookingStats: any[];
}; 

const statStyles = [
  {
    bgGlow: "from-primary/25 via-primary/5 to-transparent",
    iconStyle:
      "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(61,207,182,0.45)]",
    borderGlow: "hover:border-primary/40",
  },
  {
    bgGlow: "from-success/25 via-success/5 to-transparent",
    iconStyle:
      "bg-success text-success-foreground shadow-[0_10px_30px_rgba(34,197,94,0.45)]",
    borderGlow: "hover:border-success/40",
  },
  {
    bgGlow: "from-warning/25 via-warning/5 to-transparent",
    iconStyle:
      "bg-warning text-warning-foreground shadow-[0_10px_30px_rgba(245,158,11,0.45)]",
    borderGlow: "hover:border-warning/40",
  },
  {
    bgGlow: "from-destructive/25 via-destructive/5 to-transparent",
    iconStyle:
      "bg-destructive text-destructive-foreground shadow-[0_10px_30px_rgba(239,68,68,0.45)]",
    borderGlow: "hover:border-destructive/40",
  },
];

export default function BookingsClient({
  bookings,
  bookingStats,
  actions,
}: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
        {/* HEADER */}
        <Motion
          animationType="slideUp"
          className="flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between"
        >
          <SectionHeader
            highlight="HotelMania Admin"
            title="Booking Management"
            description="Track, manage, and monitor all hotel bookings in real time."
          />
        </Motion>

        {/* STATS */}
<Motion animationType="scale">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {bookingStats.map((stat, idx) => {
      const Icon = iconMap[stat.icon as keyof typeof iconMap];
      const style = statStyles[idx % statStyles.length];

      return (
        <StatsCard
      
          key={stat.label}
          title={stat.label}
          value={stat.value}
          icon={Icon}
          animationIndex={idx}
          bgGlow={style.bgGlow}
          iconStyle={style.iconStyle}
          borderGlow={style.borderGlow}
        />
      );
    })}
  </div>
</Motion>
        {/* GRID */}
        <BookingDataGrid bookings={bookings} actions={actions} />
      </div>
    </div>
  );
}
