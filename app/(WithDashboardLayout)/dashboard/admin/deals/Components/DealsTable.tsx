"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";
import { MoreVertical, Pencil, Trash2, Calendar, Clock, Tag, Percent } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Deal {
  id: string;
  title: string;
  dealType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  usageLimit: number;
  usedCount: number;
  promoCode: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "EXPIRED";
}

interface DealsTableProps {
  filteredDeals: Deal[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function DealsTable({
  filteredDeals,
  onUpdateStatus,
  onDelete,
}: DealsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "INACTIVE":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "EXPIRED":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDealTypeIcon = (type: string) => {
    return type === "PERCENTAGE" ? Percent : Tag;
  };

  return (
    <Motion animationType="fade" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDeals.map((deal: Deal, index: number) => (
          <Motion
            key={deal.id}
            animationType="slideUp"
            delay={index * 0.05}
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-muted/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                    {getDealTypeIcon(deal.dealType) && (
                      (() => {
                        const Icon = getDealTypeIcon(deal.dealType);
                        return <Icon className="h-6 w-6 text-white" />;
                      })()
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {deal.title}
                    </h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(deal.status)}`}>
                      {deal.status}
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
                      onClick={() => onUpdateStatus(deal.id, "ACTIVE")}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Set Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(deal.id, "PENDING")}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Set Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(deal.id, "INACTIVE")}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Set Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(deal.id)}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Promo Code:</span>
                  <span className="text-sm font-semibold text-foreground">{deal.promoCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Discount:</span>
                  <span className="text-sm font-semibold text-foreground">
                    {deal.dealType === "PERCENTAGE" ? `${deal.discountValue}%` : `$${deal.discountValue}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Usage:</span>
                  <span className="text-sm font-semibold text-foreground">
                    {deal.usedCount}/{deal.usageLimit}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Type: {deal.dealType}</span>
                </div>
              </div>
            </div>
          </Motion>
        ))}
      </div>
    </Motion>
  );
}
