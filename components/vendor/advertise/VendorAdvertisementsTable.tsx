"use client";

import React from "react";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  RefreshCw,
  Building2,
  Clock,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import {
  IVendorAdListItem,
  IPaginationMeta,
} from "@/types/vendor/vendorAdvertisement";
import { Button } from "@/components/ui/button";

// --- Custom Pagination Component ---
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(safeTotalPages, 5) }, (_, i) => {
          let page: number;

          if (safeTotalPages <= 5) {
            page = i + 1;
          } else if (currentPage <= 3) {
            page = i + 1;
          } else if (currentPage >= safeTotalPages - 2) {
            page = safeTotalPages - 4 + i;
          } else {
            page = currentPage - 2 + i;
          }

          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 p-0 rounded-lg font-medium shadow-sm transition-all duration-200 ${
                page === currentPage
                  ? "bg-linear-to-r from-primary to-primary/80 text-primary-foreground shadow-primary/30 hover:shadow-md hover:shadow-primary/40"
                  : "bg-background shadow-foreground/5 border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= safeTotalPages}
        className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// --- Main Table Props Interface ---
interface AdvertisementsTableProps {
  advertisements: IVendorAdListItem[];
  pagination?: IPaginationMeta;
  isPending: boolean;
  onPageChange?: (page: number) => void;
  onOpenDetails?: (ad: IVendorAdListItem) => void;
  onEditAd?: (ad: IVendorAdListItem) => void;
  onDeleteAd?: (id: string) => void;
}

export function VendorAdvertisementsTable({
  advertisements = [],
  pagination,
  isPending,
  onPageChange,
  onOpenDetails,
  onEditAd,
  onDeleteAd,
}: AdvertisementsTableProps) {
  const getStatusBadgeStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      case "REJECTED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/30";
      case "PENDING_PAYMENT":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "PENDING_APPROVAL":
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    }
  };

  // Pagination meta data calculations from API
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.total || advertisements.length;
  const limit = pagination?.limit || 10;

  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endRange = Math.min(currentPage * limit, totalItems);

  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background flex flex-col">
      {/* Desktop Header */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-4">Campaign & Banner</div>
        <div className="col-span-2">Cost & Duration</div>
        <div className="col-span-2">Created Date</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Adverts List Container */}
      <div
        className={`divide-y divide-border min-h-75 ${
          isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Fetching advertisement records...
            </p>
          </div>
        ) : advertisements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <Megaphone className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-semibold text-foreground">
              No advertisements found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Create a new campaign to get started.
            </p>
          </div>
        ) : (
          advertisements.map((item, idx) => {
            const badgeStyle = getStatusBadgeStyle(item.status);

            return (
              <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
                <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 flex flex-col xl:grid xl:grid-cols-12 gap-3 xl:gap-4 items-stretch xl:items-center text-sm">
                  {/* Top Row: Banner + Campaign Info + Mobile Status */}
                  <div className="xl:col-span-4 flex items-center justify-between gap-3 min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-10 sm:w-16 sm:h-10 rounded-lg overflow-hidden border border-border/60 shrink-0 bg-muted/30">
                        {item.bannerImage ? (
                          <Image
                            src={item.bannerImage}
                            alt={item.title || "Ad Banner"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate text-sm leading-tight">
                          {item.title || "Untitled Ad"}
                        </p>
                        {item.hotel?.name && (
                          <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                            <span className="truncate">
                              {item.hotel.name}
                              {item.hotel.city ? ` • ${item.hotel.city}` : ""}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status Badge (Mobile View) */}
                    <span
                      className={`xl:hidden shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase border ${badgeStyle}`}
                    >
                      {item.status?.toLowerCase().replace("_", " ")}
                    </span>
                  </div>

                  {/* Middle Row (Mobile): Compact Stats Bar (Price, Duration, Date) */}
                  <div className="xl:contents flex items-center justify-between gap-2 p-2.5 rounded-xl bg-accent/20 xl:bg-transparent border border-border/40 xl:border-none">
                    {/* Cost & Duration */}
                    <div className="xl:col-span-2 min-w-0">
                      <div className="font-bold text-foreground text-xs sm:text-sm flex items-center gap-0.5 truncate">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>৳{Number(item.price || 0).toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1 truncate capitalize mt-0.5">
                        <Clock className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                        <span>
                          {item.duration} {item.durationType?.toLowerCase()}(s)
                        </span>
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="xl:col-span-2 min-w-0 flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status Badge (Desktop View Slot) */}
                    <div className="hidden xl:flex xl:col-span-2 justify-center">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase border ${badgeStyle}`}
                      >
                        {item.status?.toLowerCase().replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row (Mobile): Actions Toolbar */}
                  <div className="xl:col-span-2 flex items-center justify-end gap-1.5 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                    {onOpenDetails && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onOpenDetails(item)}
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    )}

                    {onEditAd && item.status === "PENDING_APPROVAL" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                        onClick={() => onEditAd(item)}
                        title="Edit Ad"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    )}

                    {onDeleteAd && item.status === "PENDING_APPROVAL" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        onClick={() => onDeleteAd(item.id)}
                        title="Delete Ad"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </Motion>
            );
          })
        )}
      </div>

      {/* Integrated Footer with Pagination */}
      {advertisements.length > 0 && (
        <div className="border-t border-border/60 bg-muted/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Showing{" "}
            <span className="font-medium text-foreground">{startRange}</span> to{" "}
            <span className="font-medium text-foreground">{endRange}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span>{" "}
            entries
          </p>

          {onPageChange && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={(page) => onPageChange(page)}
            />
          )}
        </div>
      )}
    </div>
  );
}
