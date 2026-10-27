"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import InputField from "@/components/Reuseable/auth/InputField";

interface UserFilterControlsProps {
  filters: string[];
  onSearchChange?: (value: string) => void;
  onFilterChange?: (filter: string) => void;
}

export function UserFilterControls({
  filters,
  onSearchChange,
  onFilterChange,
}: UserFilterControlsProps) {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0] || "");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <Motion
      animationType="scale"
      className="rounded-2xl border border-border/50 bg-card/40 p-4 shadow-sm backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
        {/* SEARCH */}
        <div className="relative w-full 2xl:max-w-md">
          <Search className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

          <InputField
            label="Search"
            type="text"
            placeholder="Search users, email, hotel owners..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="h-11 w-full rounded-xl border-border/80 bg-background/50 pl-11 pr-4"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, idx) => {
            const isActive = filter === activeFilter;

            return (
              <Motion key={filter} animationType="fadeUp" custom={idx}>
                <Button
                  variant="ghost"
                  onClick={() => handleFilterClick(filter)}
                  className={`h-9 whitespace-nowrap rounded-lg border border-border/60 px-4 text-xs font-medium transition-all ${
                    isActive
                      ? "border-border bg-background text-foreground shadow-sm"
                      : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {filter}
                </Button>
              </Motion>
            );
          })}
        </div>
      </div>
    </Motion>
  );
}
