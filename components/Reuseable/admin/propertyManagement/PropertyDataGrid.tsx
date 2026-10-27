"use client";

import React from "react";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  Calendar,
  AlertCircle,
  Building2,
  MapPin,
  Tag,
  User,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Property {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  phone?: string;
  status: string;
  category?: {
    name: string;
  };
  vendor?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  createdAt?: string;
}

type Props = {
  properties: Property[];
  onStatusChange?: (id: string, status: string) => void;
  onPageChange?: (page: number) => void;
  meta?: { total: number; page: number; limit: number; totalPages: number };
  currentPage?: number;
  pageSize?: number;
};

export default function PropertyDataGrid({
  properties = [],
  onStatusChange,
  onPageChange,
  meta,
  currentPage = 1,
  pageSize = 10,
}: Props) {
  const totalItems = meta?.total ?? properties.length;
  const totalPages =
    (meta?.totalPages ?? Math.ceil(totalItems / pageSize)) || 1;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="space-y-6 w-full">
      {/* Table Container */}
      <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
        {/* Table Header (Desktop XL grid view) */}
        <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
          <div className="col-span-3">Property Name</div>
          <div className="col-span-3">Location & Category</div>
          <div className="col-span-3">Vendor Info & Date</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Row Items List */}
        <div className="divide-y divide-border">
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
                <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                No property records found
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                There are no properties matching your current criteria.
              </p>
            </div>
          ) : (
            properties.map((item, idx) => (
              <Motion key={item.id} animationType="fadeUp" delay={idx * 0.04}>
                <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                  {/* 1. Property Name & Slug */}
                  <div className="order-1 col-span-2 xl:col-span-3 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-primary/20">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 truncate">
                        <p className="font-semibold text-foreground truncate text-sm">
                          {item.name || "N/A"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          /{item.slug || "n-a"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Location & Category */}
                  <div className="order-2 col-span-1 xl:col-span-3 min-w-0">
                    <div className="font-semibold text-foreground text-sm xl:text-base flex items-center gap-1.5 truncate">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {item.city || "Unknown City"}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                      <Tag className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-medium">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Badge View */}
                  <div className="order-3 col-span-1 flex justify-end xl:hidden">
                    <Badge
                      variant={
                        item.status === "ACTIVE" ? "default" : "destructive"
                      }
                      className="font-semibold rounded-2xl"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  {/* 3. Vendor Info & Created Date */}
                  <div className="order-4 col-span-2 xl:col-span-3 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                    <div className="font-semibold text-foreground truncate text-sm flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">
                        {item.vendor?.name || "N/A"}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Status Badge View */}
                  <div className="hidden xl:flex xl:order-5 xl:col-span-1 justify-center">
                    <Badge
                      variant={
                        item.status === "ACTIVE" ? "default" : "destructive"
                      }
                      className="font-semibold rounded-2xl"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  {/* 4. Actions Dropdown */}
                  <div className="order-5 col-span-2 xl:col-span-2 xl:order-6 flex items-center justify-end gap-2 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5 rounded-lg border border-border/60 hover:bg-accent transition-all duration-200 flex items-center gap-1"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="text-xs">Action</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                          onClick={() => onStatusChange?.(item.id, "ACTIVE")}
                          className="cursor-pointer text-xs font-medium text-emerald-600 focus:text-emerald-600"
                        >
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onStatusChange?.(item.id, "INACTIVE")}
                          className="cursor-pointer text-xs font-medium text-rose-600 focus:text-rose-600"
                        >
                          Set Inactive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Motion>
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="px-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Showing</span>
            <span className="font-semibold text-foreground">
              {totalItems > 0 ? from : 0} - {to}
            </span>
            <span>of</span>
            <span className="font-semibold text-foreground">{totalItems}</span>
            <span>properties</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-9 w-9 p-0 rounded-lg border border-border/60 hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange?.(pageNum)}
                    className={`h-9 w-9 p-0 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "border border-border/60 hover:bg-accent"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-9 w-9 p-0 rounded-lg border border-border/60 hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
