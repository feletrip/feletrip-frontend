"use client";
import {
  Plus,
  Download,
  Users,
  Building2,
  ShieldCheck,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFilterControls } from "@/components/admin/user/UserFilterControls";
import { UserManagementClientProps } from "@/data/users";
import UserDataGrid from "@/components/Reuseable/admin/userManagement/UserDataGrid";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { StatCard } from "@/components/Reuseable/StatCard";
import { useState } from "react";

export default function HotelManiaUserManagementClient({
  initialStats,
  initialFilters,
  initialUsers,
  actions,
}: UserManagementClientProps) {
  // icon mapping (safe + scalable)

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(initialFilters[0] || "");

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;

    switch (activeFilter) {
      case "All Users":
        matchesFilter = true;
        break;

      case "Users":
        matchesFilter = user.role?.name === "USER";
        break;

      case "Hotel Vendor":
        matchesFilter = user.role?.name === "Hotel Vendor";
        break;

      case "Staff":
        matchesFilter = user.role?.name === "Staff";
        break;

      case "Verified":
        matchesFilter = user.isVerified;
        break;

      case "Suspended":
        matchesFilter = user.status === "suspended";
        break;

      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });
  const iconMap = {
    Users,
    Building2,
    ShieldCheck,
    Ban,
  };

  return (
    <div className="bg-background text-foreground">
      <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
        {/* HEADER */}
        <Motion
          animationType="slideUp"
          className="flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <SectionHeader
            highlight="HotelMania Admin"
            title="User Management"
            description="Manage guests, hotel owners, staff members, permissions, verification, and account activities from one centralized panel."
          />

          <Motion
            animationType="fadeLeft"
            delay={0.1}
            className="flex shrink-0 items-center gap-3">
            <Motion animationType="buttonHover">
              <Button className="h-11 rounded-xl px-5 shadow-md shadow-primary/10 hover:shadow-lg">
                <Plus className="mr-2 size-4" />
                Add New User
              </Button>
            </Motion>

            <Motion animationType="buttonHover">
              <Button
                variant="outline"
                className="h-11 rounded-xl border-border/80 bg-background px-5">
                <Download className="mr-2 size-4" />
                Export Users
              </Button>
            </Motion>
          </Motion>
        </Motion>
        {/* STATS */}
        <Motion animationType="scale" delay={0.05}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {initialStats.map((stat, idx) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <Motion key={idx} animationType="card">
                  <StatCard
                    key={idx}
                    label={stat.label}
                    value={stat.value}
                    icon={Icon}
                    title={""}
                  />
                </Motion>
              );
            })}
          </div>
        </Motion>
        {/* FILTERS */}
        <Motion animationType="card" delay={0.1}>
          <UserFilterControls
            filters={initialFilters}
            onSearchChange={setSearchTerm}
            onFilterChange={setActiveFilter}
          />
        </Motion>
        {/* GRID */}
        <UserDataGrid users={filteredUsers} />{" "}
      </div>
    </div>
  );
}
