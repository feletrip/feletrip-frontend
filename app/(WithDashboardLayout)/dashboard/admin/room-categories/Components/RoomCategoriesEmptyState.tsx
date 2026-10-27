"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { DoorOpen } from "lucide-react";

interface RoomCategoriesEmptyStateProps {}

export default function RoomCategoriesEmptyState({}: RoomCategoriesEmptyStateProps) {
  return (
    <Motion animationType="slideUp" className="relative overflow-hidden rounded-2xl bg-linear-to-br from-muted/50 via-muted/30 to-background border border-border p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
          <DoorOpen className="h-10 w-10 text-primary/60" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">
            No room categories yet
          </h3>
          <p className="text-muted-foreground text-base max-w-md">
            Get started by creating your first room category to organize your hotel room types.
          </p>
        </div>
      </div>
    </Motion>
  );
}
