"use client";

import React from "react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  Tag,
  Percent,
  AlertCircle,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/Reuseable/common/Pagination";

interface Deal {
  id: string;
  title: string;
  dealType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  usageLimit: number;
  usedCount: number;
  promoCode: string;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "EXPIRED";
  isHighlighted?: boolean;
}

interface DealsDataGridProps {
  deals: Deal[];
  isPending?: boolean;
  onUpdateStatus?: (
    id: string,
    status: string,
    isHighlighted?: boolean,
  ) => void;
  onDelete?: (id: string) => void;
  onPageChange?: (page: number) => void;
  meta?: { total: number; page: number; limit: number; totalPages: number };
  currentPage?: number;
  pageSize?: number;
}

export default function DealsDataGrid({
  deals = [],
  isPending = false,
  onUpdateStatus,
  onDelete,
  onPageChange,
  meta,
  currentPage = 1,
  pageSize = 10,
}: DealsDataGridProps) {
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || deals.length;

  const renderStatusBadge = (status: Deal["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Active</span>
          </span>
        );
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Pending</span>
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Rejected</span>
          </span>
        );
      case "EXPIRED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Expired</span>
          </span>
        );
      default:
        return (
          <Badge variant="outline" className="rounded-full">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
      {/* Header (Desktop View) */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-3">Deal Details</div>
        <div className="col-span-3">Discount & Type</div>
        <div className="col-span-3">Usage & Promo</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Items List */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Fetching latest records...
            </p>
          </div>
        ) : deals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No deal records found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              No deal requests match your current search or status filter.
            </p>
          </div>
        ) : (
          deals.map((item, idx) => (
            <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* Deal Title & Highlight */}
                <div className="order-1 col-span-2 xl:col-span-3 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {item.dealType === "PERCENTAGE" ? (
                        <Percent className="h-4 w-4 text-primary" />
                      ) : (
                        <Tag className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-1.5 truncate">
                        <p className="font-semibold text-foreground truncate text-sm">
                          {item.title}
                        </p>
                        {item.isHighlighted && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                            <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground truncate">
                        {item.promoCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Discount & Type */}
                <div className="order-2 col-span-1 xl:col-span-3 min-w-0">
                  <div className="font-bold text-foreground text-sm xl:text-base flex items-center gap-1.5 truncate">
                    <span>
                      {item.dealType === "PERCENTAGE"
                        ? `${item.discountValue}%`
                        : `$${item.discountValue}`}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      ({item.dealType.toLowerCase()})
                    </span>
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-muted-foreground truncate">
                    Discount Value
                  </div>
                </div>

                {/* Mobile Status */}
                <div className="order-3 col-span-1 flex justify-end xl:hidden">
                  {renderStatusBadge(item.status)}
                </div>

                {/* Usage Limits */}
                <div className="order-4 col-span-2 xl:col-span-3 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <div className="font-semibold text-foreground truncate text-sm">
                    Usage: {item.usedCount} / {item.usageLimit}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <span>Total claims recorded</span>
                  </div>
                </div>

                {/* Desktop Status */}
                <div className="hidden xl:flex xl:order-5 xl:col-span-1 justify-center">
                  {renderStatusBadge(item.status)}
                </div>

                {/* Action Column */}
                <div className="order-5 col-span-2 xl:col-span-2 xl:order-6 flex items-center justify-end gap-2 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-border/60 hover:bg-accent"
                      >
                        <MoreVertical className="w-3.5 h-3.5 text-foreground" />
                        <span>Action</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-44 rounded-xl"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(item.id, "ACTIVE", false)
                        }
                        className="cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                        Set Active
                      </DropdownMenuItem>

                      {(item.status === "ACTIVE" || item.isHighlighted) &&
                        (item.isHighlighted ? (
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateStatus?.(
                                item.id,
                                "REMOVE_HIGHLIGHT",
                                false,
                              )
                            }
                            className="cursor-pointer"
                          >
                            <StarOff className="h-4 w-4 mr-2 text-amber-500" />
                            Remove Highlight
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateStatus?.(item.id, "HIGHLIGHT", true)
                            }
                            className="cursor-pointer"
                          >
                            <Star className="h-4 w-4 mr-2 text-amber-500" />
                            Highlight Deal
                          </DropdownMenuItem>
                        ))}

                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(item.id, "PENDING", false)
                        }
                        className="cursor-pointer"
                      >
                        <Clock className="h-4 w-4 mr-2 text-amber-500" />
                        Set Pending
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(item.id, "REJECTED", false)
                        }
                        className="cursor-pointer"
                      >
                        <XCircle className="h-4 w-4 mr-2 text-rose-500" />
                        Set Rejected
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onDelete?.(item.id)}
                        className="cursor-pointer text-rose-600 focus:text-rose-600 dark:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>

      {/* Footer with Integrated Custom Pagination */}
      {deals.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 bg-accent/10 px-6 py-4 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * pageSize, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalItems}</span>{" "}
            deals
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={(page) => onPageChange?.(page)}
          />
        </div>
      )}
    </div>
  );
}
