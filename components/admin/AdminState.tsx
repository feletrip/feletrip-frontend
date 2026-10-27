import { AdminDashboardProps, iconMap } from "@/types/admin/dashboard";
import StatsCard from "../Reuseable/admin/DashboardStatsCard";

const AdminState = ({ statisticsData }: AdminDashboardProps) => {
  const cardDesignVariants: Record<
    string,
    { bgGlow: string; iconStyle: string; borderGlow: string }
  > = {
    bookings: {
      bgGlow: "from-blue-500/20 via-blue-500/5 to-transparent",
      iconStyle:
        "bg-blue-500 text-white dark:bg-blue-500/20 dark:text-blue-400",
      borderGlow: "hover:border-blue-500/40",
    },
    users: {
      bgGlow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      iconStyle:
        "bg-emerald-500 text-white dark:bg-emerald-500/20 dark:text-emerald-400",
      borderGlow: "hover:border-emerald-500/40",
    },
    hotels: {
      bgGlow: "from-rose-500/20 via-rose-500/5 to-transparent",
      iconStyle:
        "bg-rose-500 text-white dark:bg-rose-500/20 dark:text-rose-400",
      borderGlow: "hover:border-rose-500/40",
    },
    revenue: {
      bgGlow: "from-amber-500/20 via-amber-500/5 to-transparent",
      iconStyle:
        "bg-amber-500 text-white dark:bg-amber-500/20 dark:text-amber-400",
      borderGlow: "hover:border-amber-500/40",
    },
    default: {
      bgGlow: "from-primary/20 via-primary/5 to-transparent",
      iconStyle: "bg-primary text-primary-foreground",
      borderGlow: "hover:border-primary/40",
    },
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-9">
      {statisticsData?.map((stat, idx) => {
        const IconComponent =
          iconMap[stat.icon as keyof typeof iconMap] || iconMap.bookings;
        const design =
          cardDesignVariants[stat.icon as keyof typeof iconMap] ||
          cardDesignVariants.default;

        return (
          <div key={stat.title || idx}>
            <StatsCard
              title={stat.title}
              value={stat.value}
              icon={IconComponent}
              subtitle={stat.subtitle}
              bgGlow={design.bgGlow}
              borderGlow={design.borderGlow}
              iconStyle={design.iconStyle}
              animationIndex={idx}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdminState;
