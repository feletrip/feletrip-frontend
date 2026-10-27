// UserColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HotelUser } from "@/types/admin/usersAdmin";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";

export const getUserColumns = (
  actions: { key: string; icon: string }[],
): ColumnDef<HotelUser>[] => [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "active"
            ? "default"
            : row.original.status === "pending"
              ? "secondary"
              : "destructive"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "hotels",
    header: "Hotels",
  },
  {
    accessorKey: "bookings",
    header: "Bookings",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <button>
          <Eye className="h-4 w-4" />
        </button>
        <button>
          <Pencil className="h-4 w-4" />
        </button>
        <button>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];
