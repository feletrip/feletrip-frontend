"use client";

import React from "react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Star, AlertCircle, Trash2, Calendar, User, Hotel } from "lucide-react";
import { AdminReview } from "@/types/admin/review";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Reuseable/common/Pagination";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ReviewsTableProps {
  reviews: AdminReview[];
  isPending?: boolean;
  onDelete?: (id: string) => void;
  onPageChange?: (page: number) => void;
  meta?: PaginationMeta;
  currentPage?: number;
  pageSize?: number;
}

export default function ReviewsTableAdmin({
  reviews = [],
  isPending = false,
  onDelete,
  onPageChange,
  meta,
  currentPage = 1,
  pageSize = 10,
}: ReviewsTableProps) {
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || reviews.length;

  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
      {/* Table Header (Desktop) */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-2">Rating</div>
        <div className="col-span-4">Comment</div>
        <div className="col-span-4">Customer & Hotel ID</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Review Items List */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
        }`}
      >
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No review records found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              No reviews match your current search or status filter.
            </p>
          </div>
        ) : (
          reviews.map((item, idx) => (
            <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* Rating */}
                <div className="order-1 col-span-1 xl:col-span-2 min-w-0">
                  <div className="flex items-center gap-1.5 font-bold text-foreground text-sm xl:text-base">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                    <span>{item.rating}</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      / 5
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Mobile Trash Action */}
                <div className="order-2 col-span-1 flex justify-end xl:hidden">
                  <Button
                    size="sm"
                    variant="warning"
                    disabled={isPending}
                    onClick={() => onDelete?.(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>

                {/* Comment */}
                <div className="order-3 col-span-2 xl:col-span-4 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">
                    {item.comment || "No comment provided."}
                  </p>
                </div>

                {/* Customer & Hotel ID */}
                <div className="order-4 col-span-2 xl:col-span-4 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-mono truncate">
                      <User className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                      <span>
                        User:{" "}
                        {item.customerId
                          ? `${item.customerId.slice(0, 12)}...`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground font-mono truncate">
                      <Hotel className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                      <span>
                        Hotel:{" "}
                        {item.hotelId
                          ? `${item.hotelId.slice(0, 12)}...`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Action */}
                <div className="hidden xl:flex xl:order-5 xl:col-span-2 justify-end items-center gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    disabled={isPending}
                    onClick={() => onDelete?.(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      {reviews.length > 0 && (
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
            entries
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
