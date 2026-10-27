"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { DoorOpen, Layers, Home } from "lucide-react";
import { AddRoomCategoryDialog } from "./RoomCategoryDialogs";

interface RoomCategoriesHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (value: boolean) => void;
  newCategoryName: string;
  newCategoryDescription: string;
  setNewCategoryName: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  onSubmit: () => void;
}

export default function RoomCategoriesHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  newCategoryName,
  newCategoryDescription,
  setNewCategoryName,
  setNewCategoryDescription,
  onSubmit,
}: RoomCategoriesHeaderProps) {
  return (
    <Motion
      animationType="slideUp"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 lg:p-12"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
              <DoorOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                Admin
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Hotel
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Room Categories
          </h1>
          
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl leading-relaxed">
            Manage room categories for your hotel properties. Create and organize different room types 
            to help guests find the perfect accommodation.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Layers className="h-4 w-4 text-primary" />
              <span>Room Types</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4 text-purple-400" />
              <span>Property Management</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <AddRoomCategoryDialog
            isOpen={isAddModalOpen}
            onOpenChange={setIsAddModalOpen}
            newCategoryName={newCategoryName}
            newCategoryDescription={newCategoryDescription}
            setNewCategoryName={setNewCategoryName}
            setNewCategoryDescription={setNewCategoryDescription}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </Motion>
  );
}
