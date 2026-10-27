"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { IVendorPayment } from "@/types/payment";
import { Building2, Calendar, CreditCard, Receipt, User } from "lucide-react";
import { StatusBadge } from "../../../Reuseable/common/StatusBadge";
import { formatBookingCode } from "@/lib/booking-utils";

type TransactionsTableProps = {
  transactions: IVendorPayment[];
  isPending: boolean;
};

export default function TransactionsTable({
  transactions,
  isPending,
}: TransactionsTableProps) {
  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden">
      {/* Header - Hidden on mobile, aligns directly with grid items on lg screens */}
      <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-3">Hotel & Booking</div>
        <div className="col-span-3">Customer</div>
        <div className="col-span-2">Transaction Details</div>
        <div className="col-span-2 text-right">Amount & Date</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* Transactions Items */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity" : ""
        }`}
      >
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <Receipt className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No transactions found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          transactions.map((t, idx) => (
            <Motion key={t.id} animationType="fadeUp" delay={idx * 0.2}>
              <div className="group p-4 lg:px-6 lg:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 items-center text-sm">
                {/* Hotel & Booking Code */}
                <div className="order-1 col-span-1 lg:col-span-3 min-w-0">
                  <h4 className="font-semibold text-foreground truncate flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">
                      {t.booking?.hotel?.name || "N/A"}
                    </span>
                  </h4>
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-sm bg-accent/40 border border-border/40 font-mono text-[10px] lg:text-[11px] text-muted-foreground">
                    {formatBookingCode(t.booking?.bookingCode) || "N/A"}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="order-2 col-span-1 lg:col-span-2 flex justify-end lg:order-5">
                  <StatusBadge status={t.paymentStatus} />
                </div>

                {/* Customer Info */}
                <div className="order-3 col-span-1 lg:col-span-3 min-w-0 rounded-xl lg:rounded-none bg-accent/30 lg:bg-transparent border border-border/50 lg:border-none p-2.5 lg:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold lg:hidden">
                    Customer
                  </span>
                  <div className="font-medium text-foreground truncate flex items-center gap-1.5 lg:gap-2">
                    <User className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground shrink-0 hidden sm:block" />
                    <span className="truncate">
                      {t.booking?.customer?.name || "N/A"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5 lg:pl-6">
                    {t.booking?.customer?.phone || "No Phone"}
                  </div>
                </div>

                {/* Amount */}
                <div className="order-4 col-span-1 lg:col-span-2 text-right rounded-xl lg:rounded-none bg-accent/30 lg:bg-transparent border border-border/50 lg:border-none p-2.5 lg:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold lg:hidden">
                    Amount
                  </span>
                  <div className="font-bold text-foreground text-sm lg:text-base">
                    ৳{Number(t.amount).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 hidden lg:flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground/70" />
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "-"}
                  </div>
                  <span className="text-muted-foreground text-[10px] capitalize block mt-0.5 lg:hidden">
                    {t.gateway}
                  </span>
                </div>

                {/* ID & Date/Gateway */}
                <div className="order-5 col-span-2 lg:col-span-2 min-w-0 flex items-center justify-between lg:block lg:order-3 bg-accent/20 lg:bg-transparent p-2 lg:p-0 rounded-lg lg:rounded-none border border-border/30 lg:border-none font-mono text-[11px] lg:text-xs">
                  <div className="font-medium text-foreground truncate bg-transparent lg:bg-accent/40 lg:px-2 lg:py-1 lg:rounded-sm lg:border lg:border-border/40 w-fit max-w-full">
                    <span className="lg:hidden">ID: </span>
                    {t.transactionId}
                  </div>
                  <div className="text-muted-foreground capitalize mt-0 lg:mt-1 flex items-center gap-1">
                    <span className="lg:hidden">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                    <span className="hidden lg:flex items-center gap-1">
                      <CreditCard className="h-3 w-3 text-muted-foreground/70" />
                      {t.gateway?.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>
    </div>
  );
}