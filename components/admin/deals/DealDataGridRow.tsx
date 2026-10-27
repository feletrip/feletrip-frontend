"use client";

import { MoreVertical, Calendar, Percent, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Deal {
  id: string;
  name: string;
  code: string;
  type: string;
  value: string;
  applicableTo: string;
  startDate: string;
  endDate: string;
  usage: number;
  maxLimit: number;
  status: "Active" | "Scheduled" | "Expired";
}

type Props = {
  deal: Deal;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  handleToggleStatus: (id: string) => void;
};

export default function DealDataGridRow({
  deal,
  activeDropdown,
  setActiveDropdown,
  handleToggleStatus,
}: Props) {
  const isOpen = activeDropdown === deal.id;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{deal.name}</h3>
            <p className="text-sm text-muted-foreground">{deal.code}</p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{deal.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Value:</span>
              <span className="font-medium">{deal.value}</span>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {deal.startDate} - {deal.endDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Usage:</span>
            <span className="font-medium">
              {deal.usage} / {deal.maxLimit}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span
            className={`rounded-md px-3 py-1 text-xs font-medium ${getStatusColor(
              deal.status
            )}`}
          >
            {deal.status}
          </span>

          <DropdownMenu open={isOpen} onOpenChange={(open) => !open && setActiveDropdown(null)}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveDropdown(isOpen ? null : deal.id)}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleToggleStatus(deal.id)}>
                Toggle Status
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Deal</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
