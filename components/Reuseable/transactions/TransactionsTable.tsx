"use client";
"use no memo";

import React, { useCallback } from "react";
import {
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import type { Pagination as TransactionPagination, Transaction } from "@/types/user/transactionHistory";
import { columns } from "./columns";
import { TransactionToolbar } from "./TransactionToolbar";
import Pagination from "../common/Pagination";
import { CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { AlertCircle, ChevronDown } from "lucide-react";

interface Props {
  transactions: Transaction[];
  pagination: TransactionPagination;
}

export function TransactionsTable({ transactions, pagination }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

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
    [pathname, router, searchParams],
  );

  const handlePageChange = (page: number) => {
    if (page === pagination.page) return;

    updateQuery({ page, limit: pagination.limit });
  };

  const currentLimit = Number(searchParams.get("limit") ?? pagination.limit ?? 5);

  const handleLimitChange = (limit: number) => {
    if (limit === currentLimit) return;

    updateQuery({ limit, page: 1 });
  };

  const globalSearchFilter: FilterFn<Transaction> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const search = String(filterValue).toLowerCase();

    return (
      row.original.bookingCode.toLowerCase().includes(search) ||
      row.original.transactionId.toLowerCase().includes(search) ||
      row.original.hotelName.toLowerCase().includes(search)
    );
  };

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table v8 mutates a stable instance; incompatible with React Compiler memoization
  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalSearchFilter,
    onGlobalFilterChange: setGlobalFilter,
  });

  if (!mounted) {
    return (
      <CardContent className="space-y-6">
        <div className="h-96 rounded-2xl border bg-muted/10 animate-pulse" />
      </CardContent>
    );
  }

  const rows = table.getRowModel().rows;
  const headers = table.getHeaderGroups()[0]?.headers || [];

  return (
    <CardContent className="space-y-6">
      <Motion animationType="fadeDown" duration={0.4}>
        <TransactionToolbar table={table} />
      </Motion>

      <Motion animationType="fadeUp" delay={0.1} duration={0.5}>
        <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
          {/* Header */}
          <div className="hidden lg:grid grid-cols-12 gap-2 xl:gap-3 border-b border-border/60 bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-background items-center">
            <div className="col-span-3 flex items-center">
              {headers[0] &&
                flexRender(
                  headers[0].column.columnDef.header,
                  headers[0].getContext()
                )}
            </div>
            <div className="col-span-3 flex items-center">Hotel</div>
            <div className="col-span-2 flex items-center">
              {headers[2] &&
                flexRender(
                  headers[2].column.columnDef.header,
                  headers[2].getContext()
                )}
            </div>
            <div className="col-span-2 flex items-center">Amount & Gateway</div>
            <div className="col-span-1 flex items-center justify-center">Status</div>
            <div className="col-span-1 flex items-center justify-end">Action</div>
          </div>

          {/* Table Items Body */}
          <div className="divide-y divide-border">
            {rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
                  <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  No transaction records found
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No transactions match your current search or filter criteria.
                </p>
              </div>
            ) : (
              rows.map((row, idx) => (
                <Motion key={row.id} animationType="fadeUp" delay={idx * 0.03}>
                  {/* ── Desktop Row (lg+) ── */}
                  <div className="hidden lg:grid grid-cols-12 gap-2 xl:gap-3 px-5 py-3.5 transition-colors hover:bg-accent/20 items-center text-sm">
                    {/* Booking Code & Tx ID */}
                    <div className="col-span-3 min-w-0 pr-2">
                      {flexRender(
                        row.getVisibleCells()[0].column.columnDef.cell,
                        row.getVisibleCells()[0].getContext()
                      )}
                    </div>

                    {/* Hotel Name */}
                    <div className="col-span-3 min-w-0 truncate pr-2">
                      {flexRender(
                        row.getVisibleCells()[1].column.columnDef.cell,
                        row.getVisibleCells()[1].getContext()
                      )}
                    </div>

                    {/* Date */}
                    <div className="col-span-2 min-w-0 pr-2">
                      {flexRender(
                        row.getVisibleCells()[2].column.columnDef.cell,
                        row.getVisibleCells()[2].getContext()
                      )}
                    </div>

                    {/* Amount & Gateway */}
                    <div className="col-span-2 min-w-0 pr-2">
                      <div className="font-semibold">
                        {flexRender(
                          row.getVisibleCells()[4].column.columnDef.cell,
                          row.getVisibleCells()[4].getContext()
                        )}
                      </div>
                      <div className="mt-0.5">
                        {flexRender(
                          row.getVisibleCells()[3].column.columnDef.cell,
                          row.getVisibleCells()[3].getContext()
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 flex items-center justify-center">
                      {flexRender(
                        row.getVisibleCells()[5].column.columnDef.cell,
                        row.getVisibleCells()[5].getContext()
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      {flexRender(
                        row.getVisibleCells()[6].column.columnDef.cell,
                        row.getVisibleCells()[6].getContext()
                      )}
                    </div>
                  </div>

                  {/* ── Mobile Card (below lg) ── */}
                  <div className="lg:hidden p-4 transition-colors hover:bg-accent/10 space-y-3">
                    {/* Top: Booking info + Status badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        {flexRender(
                          row.getVisibleCells()[0].column.columnDef.cell,
                          row.getVisibleCells()[0].getContext()
                        )}
                        <p className="text-sm font-medium text-foreground mt-1.5 truncate">
                          {row.original.hotelName}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {flexRender(
                          row.getVisibleCells()[5].column.columnDef.cell,
                          row.getVisibleCells()[5].getContext()
                        )}
                      </div>
                    </div>

                    {/* Middle: Info panel */}
                    <div className="rounded-xl bg-accent/30 border border-border/50 p-3 grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Date</p>
                        <p className="text-foreground font-medium">
                          {flexRender(
                            row.getVisibleCells()[2].column.columnDef.cell,
                            row.getVisibleCells()[2].getContext()
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Amount</p>
                        <p className="text-foreground font-semibold text-sm">
                          {flexRender(
                            row.getVisibleCells()[4].column.columnDef.cell,
                            row.getVisibleCells()[4].getContext()
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Gateway</p>
                        <div>
                          {flexRender(
                            row.getVisibleCells()[3].column.columnDef.cell,
                            row.getVisibleCells()[3].getContext()
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Action bar */}
                    <div className="flex items-center justify-end pt-2 border-t border-border/30">
                      {flexRender(
                        row.getVisibleCells()[6].column.columnDef.cell,
                        row.getVisibleCells()[6].getContext()
                      )}
                    </div>
                  </div>
                </Motion>
              ))
            )}
          </div>
        </div>
      </Motion>

      {(pagination.totalPages > 1 || transactions.length > 0) && (
        <Motion animationType="fade" delay={0.2} duration={0.4}>
          <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-accent/20 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm text-muted-foreground">
                Showing page <span className="font-semibold text-foreground">{pagination.page}</span> of <span className="font-semibold text-foreground">{pagination.totalPages}</span>
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Items per page</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 rounded-lg border border-border/60 px-3 text-sm font-medium">
                      {currentLimit}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    {[5, 10, 15].map((value) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => handleLimitChange(value)}
                        className="cursor-pointer text-sm"
                      >
                        {value}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              setCurrentPage={handlePageChange}
            />
          </div>
        </Motion>
      )}
    </CardContent>
  );
}

