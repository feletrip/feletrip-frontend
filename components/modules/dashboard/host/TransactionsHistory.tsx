"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpDown, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IVendorPayment,
  IPagination,
  IVendorPaymentsQueryParams,
} from "@/types/payment";
import Pagination from "@/components/Reuseable/common/Pagination";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { motion } from "framer-motion";
import TransactionsTable from "./TransactionsTable";

type Props = {
  transactions: IVendorPayment[];
  pagination: IPagination;
  queryParams: IVendorPaymentsQueryParams;
};

export default function TransactionsHistory({
  transactions,
  pagination,
  queryParams,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateQuery = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <Motion animationType="fade">
        <div className="relative overflow-hidden rounded-2xl border border-accent bg-card p-4 shadow-lg group">
          {/* Animated Background Container */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -25, x: -20, y: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -12, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="absolute -top-10 -left-10 h-36 w-40 rounded-3xl bg-primary/5 border border-primary/20 transition-transform duration-500 group-hover:-rotate-6"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 20, y: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 45, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              className="absolute -bottom-8 right-1/3 h-24 w-24 rounded-2xl bg-accent/40 border border-border/40"
            />
          </div>

          {/* Header Content */}
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Motion animationType="fadeLeft" delay={0.2}>
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 ring-1 ring-primary/20 shadow-xs">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Transaction History
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Track vendor payments, payouts, and customer bookings in
                    real-time.
                  </p>
                </div>
              </div>
            </Motion>

            {/* Stat Card */}
            <Motion animationType="fadeRight" delay={0.2}>
              <div className="flex items-center gap-3 rounded-lg bg-accent/40 p-2.5 pr-5 shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-linear-to-br from-primary to-primary/60 text-background font-bold text-2xl shadow-sm">
                  {pagination.total}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground leading-tight">
                    Total Transactions
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    Processed items
                  </span>
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </Motion>

      {/* Search & Sorting */}
      <Motion animationType="fadeDown" delay={0.2}>
        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 p-3 shadow-lg md:flex-row md:items-center md:justify-between bg-accent">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by customer name, phone, or email..."
              defaultValue={queryParams.search}
              onChange={(e) => updateQuery({ search: e.target.value, page: 1 })}
              className="pl-10 h-10 bg-background! border-border/40 focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
            />
          </div>

          {/* Sorting Controls */}
          <div className="flex items-center gap-2">
            <Select
              value={queryParams.sortBy}
              onValueChange={(val) => updateQuery({ sortBy: val })}
            >
              <SelectTrigger className="h-10! w-35 border-border/40 rounded-lg font-medium bg-background! cursor-pointer">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/60">
                <SelectItem className="cursor-pointer" value="createdAt">
                  Date
                </SelectItem>
                <SelectItem className="cursor-pointer" value="amount">
                  Amount
                </SelectItem>
                <SelectItem className="cursor-pointer" value="paymentStatus">
                  Status
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-background shrink-0 border-border/40 rounded-lg"
              onClick={() =>
                updateQuery({
                  sortOrder: queryParams.sortOrder === "asc" ? "desc" : "asc",
                })
              }
              title={`Sort ${queryParams.sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </Motion>

      {/* Table Component */}
      <Motion delay={0.2}>
        <TransactionsTable transactions={transactions} isPending={isPending} />
      </Motion>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Motion animationType="fadeUp" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Page{" "}
              <strong className="text-foreground">{pagination.page}</strong> of{" "}
              <strong className="text-foreground">
                {pagination.totalPages}
              </strong>{" "}
              ({pagination.total} entries)
            </p>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              setCurrentPage={(page) => updateQuery({ page })}
            />
          </div>
        </Motion>
      )}
    </div>
  );
}
