"use client";

import React from "react";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  AlertCircle,
  RefreshCw,
  Building2,
  Clock,
  DollarSign,
  User,
} from "lucide-react";
import {
  IAdminAdPaginatedData,
  IAdvertisementItem,
} from "@/types/admin/adminAdvertisement";
import { Button } from "@/components/ui/button";

interface AdvertsTableAdminProps {
  adsData: IAdminAdPaginatedData | null;
  isPending: boolean;
  onOpenDetails: (item: IAdvertisementItem) => void;
  onPageChange: (newPage: number) => void;
}

export const AdvertsTableAdmin = ({
  adsData,
  isPending = false,
  onOpenDetails,
  onPageChange,
}: AdvertsTableAdminProps) => {
  const ads = adsData?.data || [];
  const pagination = adsData?.pagination;

  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-4">Campaign & Banner</div>
        <div className="col-span-3">Vendor</div>
        <div className="col-span-2">Cost & Duration</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Adverts List */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity pointer-events-none" : ""
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Fetching advertisement records...
            </p>
          </div>
        ) : ads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No advertisement records found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              No advertisements match your current search or status filter.
            </p>
          </div>
        ) : (
          ads.map((item, idx) => (
            <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* 1. Campaign Title & Banner */}
                <div className="order-1 col-span-2 xl:col-span-4 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-border/60 shrink-0 bg-muted/30">
                      <Image
                        src={item.bannerImage}
                        alt={item.title || "Ad Banner"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="font-semibold text-foreground truncate text-sm">
                        {item.title || "Untitled Ad"}
                      </p>
                      {item.hotel?.name && (
                        <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-muted-foreground/70 shrink-0" />
                          <span className="truncate">{item.hotel.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Vendor Information */}
                <div className="order-2 col-span-2 xl:col-span-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="font-medium text-foreground truncate text-xs xl:text-sm">
                        {item.vendor?.name || "N/A"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.vendor?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Cost & Duration */}
                <div className="order-3 col-span-1 xl:col-span-2 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <div className="font-bold text-foreground text-sm xl:text-base flex items-center gap-0.5 truncate">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>৳{Number(item.price || 0).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 truncate capitalize">
                    <Clock className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                    <span>
                      {item.duration} {item.durationType.toLowerCase()}(s)
                    </span>
                  </div>
                </div>

                {/* Status Badge (Mobile view slot) */}
                <div className="order-4 col-span-1 flex justify-end xl:hidden">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase border ${
                      item.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        : item.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>

                {/* Status Badge (Desktop view slot) */}
                <div className="hidden xl:flex xl:order-5 xl:col-span-1 justify-center">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase border ${
                      item.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        : item.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>

                {/* 4. Actions */}
                <div className="order-5 col-span-2 xl:col-span-2 xl:order-6 flex items-center justify-end gap-2 pt-2 xl:pt-0 border-t border-border/30 xl:border-none">
                  <Button size={"sm"} onClick={() => onOpenDetails(item)}>
                    <Info className="w-3.5 h-3.5 text-background" />
                    <span>Action</span>
                  </Button>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex items-center justify-between p-4 border-t border-border/60 bg-muted/10 text-xs text-muted-foreground">
          <div>
            Page{" "}
            <span className="font-semibold text-foreground">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {pagination.totalPages}
            </span>{" "}
            (
            <span className="font-semibold text-foreground">
              {pagination.total}
            </span>{" "}
            total items)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1 || isPending}
              onClick={() => onPageChange(pagination.page - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages || isPending}
              onClick={() => onPageChange(pagination.page + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
