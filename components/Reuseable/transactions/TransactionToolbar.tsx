"use client";
"use no memo";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Transaction } from "@/types/user/transactionHistory";

interface TransactionToolbarProps {
  table: Table<Transaction>;
}

export function TransactionToolbar({ table }: TransactionToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 lg:flex-row">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search booking, hotel or transaction..."
            value={
              (table.getColumn("bookingCode")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("bookingCode")?.setFilterValue(e.target.value)
            }
            className="pl-10"
          />
        </div>

        <Select
          value={
            (table.getColumn("paymentStatus")?.getFilterValue() as string) ??
            "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("paymentStatus")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>

            <SelectItem value="paid">Paid</SelectItem>

            <SelectItem value="pending">Pending</SelectItem>

            <SelectItem value="failed">Failed</SelectItem>

            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={
            (table.getColumn("gateway")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) =>
            table
              .getColumn("gateway")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full lg:w-44">
            <SelectValue placeholder="Gateway" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Gateway</SelectItem>

            <SelectItem value="SSLCOMMERZ">SSLCommerz</SelectItem>

            <SelectItem value="SURJOPAY">SurjoPay</SelectItem>
            <SelectItem value="AAMARPAY">AamarPay</SelectItem>
            <SelectItem value="BKASH">BKash</SelectItem>
            <SelectItem value="NAGAD">Nagad</SelectItem>
            <SelectItem value="ROCKET">Rocket</SelectItem>
            <SelectItem value="BANKTRANSFER">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          table.resetGlobalFilter();
          table.resetColumnFilters();
        }}
      >
        <X className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
