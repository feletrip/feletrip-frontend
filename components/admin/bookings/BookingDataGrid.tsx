"use client";

import { useMemo, useState } from "react";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  DataGrid,
  DataGridContainer,
} from "@/components/reui/data-grid/data-grid";
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";

import { Badge } from "@/components/ui/badge";
import { Action, Booking } from "@/types/admin/booking";

type Props = {
  bookings: Booking[];
  actions: Action[];
};

export default function BookingDataGrid({ bookings }: Props) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        accessorKey: "guestName",
        header: "Guest",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.guestName}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "hotelName",
        header: "Hotel",
      },
      {
        accessorKey: "roomType",
        header: "Room",
      },
      {
        accessorKey: "checkIn",
        header: "Check In",
      },
      {
        accessorKey: "checkOut",
        header: "Check Out",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <Badge
              variant={
                status === "Confirmed"
                  ? "default"
                  : status === "Pending"
                    ? "secondary"
                    : "destructive"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => `৳ ${row.original.amount}`,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: bookings,
    columns,

    getRowId: (row) => row.id,

    pageCount: Math.ceil(bookings.length / pagination.pageSize),

    state: {
      pagination,
      sorting,
    },

    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid table={table} recordCount={bookings.length}>
      <div className="space-y-3">
        <DataGridContainer className="[&_thead]:bg-primary [&_thead]:text-white [&_thead_tr]:border-b [&_thead_tr]:border-primary [&_thead_tr]:text-left [&_thead_th]:font-medium [&_thead_th]:text-white [&_thead_th]:first:rounded-tl-lg [&_thead_th]:last:rounded-tr-lg">
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>

        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
