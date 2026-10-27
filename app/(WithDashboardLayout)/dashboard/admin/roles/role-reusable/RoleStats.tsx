import DashboardStatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Shield, Crown, Building2, User } from "lucide-react";
import { RoleStatsProps } from "../types/roletypes";

const statsItems = [
  {
    title: "Total Roles",
    key: "total",
    icon: Shield,
    bgGlow: "from-primary/25 via-primary/5 to-transparent",
    iconStyle: "bg-primary text-primary-foreground",
    borderGlow: "hover:border-primary/40",
    subtitle: "Active",
  },
  {
    title: "Admin Roles",
    key: "admin",
    icon: Crown,
    bgGlow: "from-purple-500/25 via-purple-500/5 to-transparent",
    iconStyle: "bg-purple-500 text-white",
    borderGlow: "hover:border-purple-500/40",
    subtitle: "Admin",
  },
  {
    title: "Host Roles",
    key: "host",
    icon: Building2,
    bgGlow: "from-blue-500/25 via-blue-500/5 to-transparent",
    iconStyle: "bg-blue-500 text-white",
    borderGlow: "hover:border-blue-500/40",
    subtitle: "Host",
  },
  {
    title: "User Roles",
    key: "user",
    icon: User,
    bgGlow: "from-green-500/25 via-green-500/5 to-transparent",
    iconStyle: "bg-green-500 text-white",
    borderGlow: "hover:border-green-500/40",
    subtitle: "User",
  },
];

export default function RoleStats({ stats }: RoleStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsItems.map((item, index) => (
        <DashboardStatsCard
          key={item.key}
          title={item.title}
          value={stats[item.key as keyof typeof stats]}
          icon={item.icon}
          bgGlow={item.bgGlow}
          iconStyle={item.iconStyle}
          borderGlow={item.borderGlow}
          subtitle={item.subtitle}
          animationIndex={index}
        />
      ))}
    </div>
  );
}
