"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Edit2,
  Trash2,
  Percent,
  Banknote,
  UserCheck,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { EmptyDealState } from "./EmptyDealState";
import EditDealModal from "./EditDealModal";
import { toast } from "@/components/Reuseable/common/toast";

interface DealTableProps {
  deals: any[];
  onUpdate: (id: string, updatedFields: any) => void;
  onDelete: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <CheckCircle2 size={12} />
          Active
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Clock size={12} />
          Pending
        </span>
      );
    case "EXPIRED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
          <AlertCircle size={12} />
          Expired
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <XCircle size={12} />
          Inactive
        </span>
      );
  }
};

export default function DealTable({
  deals,
  onUpdate,
  onDelete,
}: DealTableProps) {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (deal: any) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
  };

  const handleCreateDealRedirect = () => {
  };

  const handleDeleteConfirm = (id: string, title: string) => {
    toast.confirm(
      "Are you sure?",
      `Do you want to delete "${title}"?`,
      () => {
        onDelete(id);
        toast.success("Deleted successfully", `"${title}" has been removed.`);
      },
      () => {
        // Optional cancel action
      },
    );
  };

  if (deals.length === 0) {
    return (
      <EmptyDealState
        onClearFilters={handleClearFilters}
        onCreateFirstDeal={handleCreateDealRedirect}
      />
    );
  }

  // Shared column layout so header + rows always line up on md+ screens
  const gridCols =
    "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)_auto]";

  return (
    <div className="space-y-6 mt-16 animate-fadeIn">
      {/* Main Responsive Table Wrapper / Container */}
      <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-card">
        <div className="p-6 border-b border-border/60">
          <h2 className="text-xl font-semibold text-foreground">
            Deals & Campaigns
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Detailed list of active promo codes and discounts
          </p>
        </div>

        {/* Header - Hidden on mobile/tablet, aligns directly with grid items on xl screens */}
        <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
          <div className="col-span-3">Campaign Name</div>
          <div className="col-span-2">Promo Code</div>
          <div className="col-span-2">Discount</div>
          <div className="col-span-2">Usage Tracker</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Items Container */}
        <div className="divide-y divide-border">
          {deals.map((deal) => {
            const status = (
              deal.status || (deal.isActive ? "ACTIVE" : "INACTIVE")
            ).toUpperCase();

            return (
              <div
                key={deal.id}
                className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm"
              >
                {/* Campaign Name */}
                <div className="order-1 col-span-1 xl:col-span-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                      <Image
                        src={deal.image || "/placeholder.jpg"}
                        alt={deal.title}
                        fill
                        sizes="40px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-foreground truncate">
                        {deal.title}
                      </span>
                      <span className="text-xs text-muted-foreground xl:hidden mt-0.5">
                        Max: {deal.usageLimit ?? "∞"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge (Mobile / XL layout management) */}
                <div className="order-2 col-span-1 xl:col-span-1 flex justify-end xl:justify-center xl:order-5">
                  {(() => {
                    switch (status) {
                      case "ACTIVE":
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <CheckCircle2 size={12} />
                            <span className="xl:hidden">Active</span>
                          </span>
                        );
                      case "PENDING":
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Clock size={12} />
                            <span className="xl:hidden">Pending</span>
                          </span>
                        );
                      case "EXPIRED":
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                            <AlertCircle size={12} />
                            <span className="xl:hidden">Expired</span>
                          </span>
                        );
                      default:
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                            <XCircle size={12} />
                            <span className="xl:hidden">Inactive</span>
                          </span>
                        );
                    }
                  })()}
                </div>

                {/* Promo Code Badge */}
                <div className="order-3 col-span-1 xl:col-span-2 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Promo Code
                  </span>
                  <span className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold text-xs uppercase tracking-wider border border-primary/25 inline-block">
                    {deal.promoCode}
                  </span>
                </div>

                {/* Discount Value */}
                <div className="order-4 col-span-1 xl:col-span-2 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Discount
                  </span>
                  <div className="flex items-center gap-1.5 font-medium text-foreground text-xs xl:text-sm">
                    {deal.dealType === "PERCENTAGE" ? (
                      <>
                        <Percent size={14} className="text-primary shrink-0" />
                        <span className="truncate">
                          {deal.discountValue}% Off
                        </span>
                      </>
                    ) : (
                      <>
                        <Banknote size={14} className="text-primary shrink-0" />
                        <span className="truncate">
                          {deal.discountValue} BDT Flat
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Usage Tracker */}
                <div className="order-5 col-span-2 xl:col-span-2 min-w-0 flex items-center justify-between xl:block xl:order-4 bg-accent/20 xl:bg-transparent p-2 xl:p-0 rounded-lg xl:rounded-none border border-border/30 xl:border-none text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <UserCheck
                      size={14}
                      className="text-muted-foreground shrink-0 hidden sm:block"
                    />
                    <span>
                      Used:{" "}
                      <strong className="text-primary">
                        {deal.usedCount ?? 0}
                      </strong>{" "}
                      times
                    </span>
                  </div>
                  <div className="text-muted-foreground mt-0 xl:mt-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-border bg-muted text-muted-foreground tracking-wide uppercase">
                      <Activity size={9} />
                      Max: {deal.usageLimit ?? "∞"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="order-6 col-span-2 xl:col-span-2 text-right whitespace-nowrap xl:order-6 flex justify-end">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(deal)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit Deal"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteConfirm(deal.id, deal.title)}
                      className="p-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Deal"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EditDealModal
        key={selectedDeal?.id || "edit-modal"}
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
}
