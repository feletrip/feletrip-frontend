"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  formatTransactionCurrency,
  formatTransactionDate,
} from "@/lib/transaction-utils";
import { formatBookingCode } from "@/lib/booking-utils";

import { Transaction } from "@/types/user/transactionHistory";

import { GatewayBadge } from "./GatewayBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { TransactionActions } from "./TransactionActions";
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "bookingCode",

    filterFn: (row, _, value) => {
      const search = String(value).toLowerCase().trim();

      return (
        row.original.bookingCode.toLowerCase().includes(search) ||
        row.original.transactionId.toLowerCase().includes(search) ||
        row.original.hotelName.toLowerCase().includes(search)
      );
    },

    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Booking
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{formatBookingCode(row.original.bookingCode)}</p>

        <p className="text-xs text-muted-foreground">
          {row.original.transactionId}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "hotelName",

    header: "Hotel",

    cell: ({ row }) => (
      <span className="font-medium">{row.original.hotelName}</span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => formatTransactionDate(row.original.createdAt),
  },

  {
    accessorKey: "gateway",

    filterFn: "equalsString",

    header: "Gateway",

    cell: ({ row }) => <GatewayBadge gateway={row.original.gateway} />,
  },

  {
    accessorKey: "amount",

    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <span className="font-semibold">
        {formatTransactionCurrency(row.original.amount, row.original.currency)}
      </span>
    ),
  },

  {
    accessorKey: "paymentStatus",

    filterFn: "equalsString",

    header: "Status",

    cell: ({ row }) => (
      <PaymentStatusBadge status={row.original.paymentStatus} />
    ),
  },

  {
    id: "actions",

    enableSorting: false,

    enableColumnFilter: false,

    cell: ({ row }) => (
      <TransactionActions
        transaction={row.original}
      />
    ),
  },
];
