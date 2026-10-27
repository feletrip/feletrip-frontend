"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { DoorOpen, Layers } from "lucide-react";

interface RoomCategoryStatsProps {
  stats: {
    total: number;
  };
}

export default function RoomCategoryStats({ stats }: RoomCategoryStatsProps) {
  return (
    <Motion animationType="slideUp" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
            <h3 className="text-3xl font-bold text-foreground">{stats.total}</h3>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
            <DoorOpen className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-500/10 via-purple-500/5 to-background border border-purple-500/20 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Room Types</p>
            <h3 className="text-3xl font-bold text-foreground">Active</h3>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25">
            <Layers className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Motion>
  );
}
