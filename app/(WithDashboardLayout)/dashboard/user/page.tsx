import BookingsSection from "@/components/modules/dashboard/user/UserDashboard/BookingsSection";
import DashboardContent from "@/components/modules/dashboard/user/UserDashboard/DashboardContent";
import {
  ShoppingBag,
  CheckCircle,
  Calendar,
  XCircle,
  Banknote,
} from "lucide-react";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { getData, getOwnId } from "@/Server/User/user.service";
import { getMyBookings } from "@/Server/User/user.bookingManagement";
import { ActiveDealsActions } from "@/Server/Deals/ActiveDeals.actions";
import { CalendarSection } from "@/components/modules/dashboard/user/UserDashboard/CalendarSection";
export const metadata = {
  title: "User Dashboard",
};

const UserDashboard = async () => {
  const [profileResult, overviewResult] = await Promise.all([
    getOwnId(),
    getData(),
  ]);

  if (!profileResult?.data) {
    return <div>User not found</div>;
  }

  if (!overviewResult?.data) {
    return <div>Failed to load dashboard data</div>;
  }

  const stats = overviewResult.data;
  const cardData = [
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: ShoppingBag,
      bgGlow: "from-blue-500/25 via-blue-500/10 to-transparent",
      iconStyle:
        "bg-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)]",
      borderGlow: "hover:border-blue-500/40",
    },
    {
      title: "Completed Bookings",
      value: stats.completedBookings || 0,
      icon: CheckCircle,
      bgGlow: "from-emerald-500/25 via-emerald-500/10 to-transparent",
      iconStyle:
        "bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]",
      borderGlow: "hover:border-emerald-500/40",
    },
    {
      title: "Upcoming Bookings",
      value: stats.upcomingBookings || 0,
      icon: Calendar,
      bgGlow: "from-amber-500/25 via-amber-500/10 to-transparent",
      iconStyle:
        "bg-amber-500 text-white shadow-[0_10px_30px_rgba(245,158,11,0.35)]",
      borderGlow: "hover:border-amber-500/40",
    },
    {
      title: "Cancelled Bookings",
      value: stats.cancelledBookings || 0,
      icon: XCircle,
      bgGlow: "from-rose-500/25 via-rose-500/10 to-transparent",
      iconStyle:
        "bg-rose-500 text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)]",
      borderGlow: "hover:border-rose-500/40",
    },
    {
      title: "Total Spent",
      value: `৳ ${(stats.totalSpent || 0).toLocaleString()}`,
      icon: Banknote,
      bgGlow: "from-violet-500/25 via-violet-500/10 to-transparent",
      iconStyle:
        "bg-violet-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.35)]",
      borderGlow: "hover:border-violet-500/40",
    },
  ];

  const [bookingResponse, dealsResponse] = await Promise.all([
    getMyBookings(),
    ActiveDealsActions(),
  ]);

  const activeDeals = dealsResponse?.data ?? [];
  const bookings = Array.isArray(bookingResponse?.data?.data)
    ? bookingResponse.data.data
    : [];
  return (
    <Motion
      animationType="fadeUp"
      className="space-y-6 sm:space-y-10 py-4 sm:py-6 px-4 sm:px-6"
      delay={0.1}
      duration={0.6}
    >
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cardData.map((card, index) => (
          <Motion
            key={index}
            animationType="card"
            custom={index}
            className="rounded-3xl"
          >
            <StatsCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              bgGlow={card.bgGlow}
              iconStyle={card.iconStyle}
              borderGlow={card.borderGlow}
            />
          </Motion>
        ))}
      </div>

      <Motion animationType="fadeUp" delay={0.2} duration={0.6}>
        <DashboardContent bookings={bookings} activeDeals={activeDeals} />
      </Motion>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Motion animationType="fadeUp" delay={0.25} duration={0.6}>
          <CalendarSection bookings={bookings} />
        </Motion>
        <Motion animationType="fadeUp" delay={0.3} duration={0.6}>
          <BookingsSection bookings={bookings} />
        </Motion>
      </div>
    </Motion>
  );
};

export default UserDashboard;
