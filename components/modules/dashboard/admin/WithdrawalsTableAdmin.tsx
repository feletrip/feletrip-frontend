"use client";

import React from "react";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Calendar, Info, AlertCircle, RefreshCw } from "lucide-react";
import { IAdminWithdrawalItem } from "@/types/admin/withdrawal";
import { StatusBadge } from "../../../Reuseable/common/StatusBadge";
import { Button } from "@/components/ui/button";

interface WithdrawalsTableProps {
  withdrawals: IAdminWithdrawalItem[];
  isPending?: boolean;
  onOpenDetails: (item: IAdminWithdrawalItem) => void;
}

export function WithdrawalsTableAdmin({
  withdrawals = [],
  isPending = false,
  onOpenDetails,
}: WithdrawalsTableProps) {
  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-3">Vendor</div>
        <div className="col-span-3">Payment Details</div>
        <div className="col-span-3">Account Holder & Date</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      {/* Withdrawal Items List */}
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
        ) : withdrawals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <AlertCircle className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No withdrawal records found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              No requests match your current search or status filter.
            </p>
          </div>
        ) : (
          withdrawals.map((item, idx) => (
            <Motion key={item.id} animationType="fadeUp" delay={idx * 0.05}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* Vendor Profile */}
                <div className="order-1 col-span-2 xl:col-span-3 min-w-0">
                  <div className="flex items-center gap-2.5">
                    {item.vendor?.avatar ? (
                      <Image
                        src={item.vendor.avatar}
                        alt={item.vendor.name || "Vendor Avatar"}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {item.vendor?.name?.charAt(0) || "V"}
                      </div>
                    )}
                    <div className="min-w-0 truncate">
                      <p className="font-semibold text-foreground truncate text-sm">
                        {item.vendor?.name || "N/A"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.vendor?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="order-2 col-span-1 xl:col-span-3 min-w-0">
                  <div className="font-bold text-foreground text-sm xl:text-base flex items-center gap-1.5 truncate">
                    <span>৳{Number(item.amount || 0).toLocaleString()}</span>
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      ({item.paymentMethod || "N/A"})
                    </span>
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-muted-foreground truncate">
                    {item.accountNumber || "N/A"}
                  </div>
                </div>

                <div className="order-3 col-span-1 flex justify-end xl:hidden">
                  <StatusBadge status={item.status} />
                </div>

                <div className="order-4 col-span-2 xl:col-span-3 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <div className="font-semibold text-foreground truncate text-sm">
                    {item.accountName || "N/A"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground/70 shrink-0" />
                    <span>
                      {item.requestedAt
                        ? new Date(item.requestedAt).toLocaleDateString(
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

                <div className="hidden xl:flex xl:order-5 xl:col-span-1 justify-center">
                  <StatusBadge status={item.status} />
                </div>

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
    </div>
  );
}
