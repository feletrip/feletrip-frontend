"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RoomCategorySearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function RoomCategorySearchFilter({
  searchQuery,
  onSearchChange,
}: RoomCategorySearchFilterProps) {
  return (
    <Motion animationType="slideUp" className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search room categories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 pl-12 text-base border-2 focus:border-primary transition-colors"
        />
      </div>
    </Motion>
  );
}
