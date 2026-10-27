"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { MoreVertical, Pencil, Trash2, Calendar, Clock, DoorOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoomCategoriesTableProps {
  filteredCategories: any[];
  onEdit: (category: any) => void;
  onDelete: (id: string) => void;
}

export default function RoomCategoriesTable({
  filteredCategories,
  onEdit,
  onDelete,
}: RoomCategoriesTableProps) {
  return (
    <Motion animationType="fade" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category: any, index: number) => (
          <Motion
            key={category.id}
            animationType="slideUp"
            delay={index * 0.05}
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-muted/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                    <DoorOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Room Category
                    </span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => onEdit(category)}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Category
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(category.id)}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                {category.description || 'No description provided'}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Motion>
        ))}
      </div>
    </Motion>
  );
}
