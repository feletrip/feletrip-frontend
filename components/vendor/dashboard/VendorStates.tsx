import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { getVendorOverview } from "@/Server/Vendor/dashboard.action";
import {
  Building2,
  BedDouble,
  CalendarCheck2,
  DollarSign,
  Star,
  Activity,
} from "lucide-react";

const VendorStates = async () => {
  const response = await getVendorOverview();

  const data = response?.data;

  const stats = [
    {
      title: "Total Properties",
      value: data?.totalHotels ?? 0,
      icon: Building2,
      bgGlow: "from-blue-500/20 via-blue-500/10 to-blue-500/5",
      borderGlow: "border-blue-500/30",
      iconStyle: "text-blue-500 bg-blue-500/30",
    },
    {
      title: "Total Rooms",
      value: data?.totalRooms ?? 0,
      icon: BedDouble,
      bgGlow: "from-emerald-500/20 via-emerald-500/10 to-emerald-500/5",
      borderGlow: "border-emerald-500/30",
      iconStyle: "text-emerald-500 bg-emerald-500/30",
    },
    {
      title: "Active Bookings",
      value: data?.activeBookings ?? 0,
      icon: CalendarCheck2,
      bgGlow: "from-violet-500/20 via-violet-500/10 to-violet-500/5",
      borderGlow: "border-violet-500/30",
      iconStyle: "text-violet-500 bg-violet-500/30",
    },
    {
      title: "Occupancy Rate",
      value: `${data?.occupancyRate ?? 0}%`,
      icon: Activity,
      bgGlow: "from-orange-500/40 via-orange-500/30 to-orange-500/5",
      borderGlow: "border-orange-500/30",
      iconStyle: "text-orange-500 bg-orange-500/30",
    },
    {
      title: "Total Revenue",
      value: `$${data?.totalRevenue ?? 0}`,
      icon: DollarSign,
      bgGlow: "from-green-500/20 via-green-500/10 to-green-500/5",
      borderGlow: "border-green-500/30",
      iconStyle: "text-green-500 bg-green-500/30",
    },
    {
      title: "Average Rating",
      value: data?.averageRating ?? 0,
      icon: Star,
      bgGlow: "from-yellow-500/20 via-yellow-500/10 to-yellow-500/5",
      borderGlow: "border-yellow-500/30",
      iconStyle: "text-yellow-500 bg-yellow-500/30",
    },
  ];

  return (
    <section className="mb-9">
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <Motion
            key={stat.title}
            animationType="card"
            custom={index}
            className="h-full"
          >
            <StatsCard {...stat} />
          </Motion>
        ))}
      </div>
    </section>
  );
};

export default VendorStates;
