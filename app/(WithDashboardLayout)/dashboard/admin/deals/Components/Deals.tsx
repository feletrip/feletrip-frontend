"use client";

import { useState, useEffect } from "react";
import { toast } from "@/components/Reuseable/common/toast";
import DealStats from "../deal-reusable/DealStats";
import DealsDataGrid from "./DealsDataGrid";
import DealsSkeleton from "./DealsSkeleton";
import {
  getAllDeals,
  updateDeal,
  deleteDeal,
} from "@/Server/Admin/deals-action";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Tag, TrendingUp, Clock, XCircle } from "lucide-react";

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

type DealUpdateAction = Deal["status"] | "HIGHLIGHT" | "REMOVE_HIGHLIGHT";

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const stats = {
    totalDeals: meta.total || deals.length,
    activeDeals: deals.filter((d) => d.status === "ACTIVE").length,
    pendingDeals: deals.filter((d) => d.status === "PENDING").length,
    inactiveDeals: deals.filter((d) => d.status === "REJECTED").length,
  };

  const fetchDeals = async (page?: number, limit?: number) => {
    setLoading(true);
    try {
      const response: any = await getAllDeals({
        page: page || currentPage,
        limit: limit || pageSize,
      });
      if (response.success) {
        setDeals(Array.isArray(response.data.data) ? response.data.data : []);
        setMeta(
          response.data.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
          },
        );
      } else {
        toast.error("Error", response.message || "Failed to fetch deals");
      }
    } catch (err: any) {
      toast.error("Error", err.message || "Failed to fetch deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [currentPage, pageSize]);

  const updateDealInState = (
    dealId: string,
    nextStatus: DealUpdateAction,
    nextIsHighlighted: boolean,
  ) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id !== dealId) return deal;

        const resolvedStatus =
          nextStatus === "HIGHLIGHT" || nextStatus === "REMOVE_HIGHLIGHT"
            ? deal.status
            : nextStatus;

        return {
          ...deal,
          status: resolvedStatus,
          isHighlighted: nextIsHighlighted,
        };
      }),
    );
  };

  const buildDealUpdatePayload = (status: string, isHighlighted: boolean) => {
    if (status === "ACTIVE") {
      return { status: "ACTIVE" };
    }

    if (status === "HIGHLIGHT") {
      return { isHighlighted: true };
    }

    if (status === "REMOVE_HIGHLIGHT") {
      return { isHighlighted: false };
    }

    if (status === "PENDING" || status === "REJECTED") {
      return { status };
    }

    return { status, isHighlighted };
  };

  const handleUpdateDeal = async (
    dealId: string,
    status: string,
    isHighlighted: boolean = false,
  ) => {
    const confirmMessage =
      status === "ACTIVE"
        ? "Are you sure you want to set this deal to ACTIVE?"
        : status === "HIGHLIGHT"
          ? "Are you sure you want to highlight this deal?"
          : status === "REMOVE_HIGHLIGHT"
            ? "Are you sure you want to remove the highlight from this deal?"
            : `Are you sure you want to set this deal to ${status}?`;

    toast.confirm("Update Deal Status", confirmMessage, async () => {
      try {
        setLoading(true);
        const payload = buildDealUpdatePayload(status, isHighlighted);
        const response = await updateDeal(dealId, payload);
        if (response.success) {
          updateDealInState(dealId, status as DealUpdateAction, isHighlighted);
          await fetchDeals(currentPage, pageSize);
          toast.success("Success", "Deal updated successfully");
        } else {
          toast.error("Error", response.message || "Failed to update deal");
        }
      } catch (err: any) {
        toast.error("Error", err.message || "Failed to update deal");
      } finally {
        setLoading(false);
      }
    });
  };

  const handleDeleteDeal = async (dealId: string) => {
    toast.confirm(
      "Delete Deal",
      "Are you sure you want to delete this deal? This action cannot be undone.",
      async () => {
        try {
          setLoading(true);
          const response = await deleteDeal(dealId);
          if (response.success) {
            await fetchDeals(currentPage, pageSize);
            toast.success("Deleted!", "Deal has been deleted.");
          } else {
            toast.error("Error", response.message || "Failed to delete deal");
          }
        } catch (err: any) {
          toast.error("Error", err.message || "Failed to delete deal");
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="relative">
          <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Deals Management
          </h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Manage and monitor all deals and promotions
          </p>
        </div>
      </div>

      {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Deals"
            subtitle="Summary"
            value={stats.totalDeals}
            animationIndex={0}
            icon={Tag}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-white"
          />

          <StatsCard
            title="Active Deals"
            subtitle="Running"
            value={stats.activeDeals}
            animationIndex={1}
            icon={TrendingUp}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-white"
          />

          <StatsCard
            title="Waiting For Approval"
            subtitle="Pending"
            value={stats.pendingDeals}
            animationIndex={2}
            icon={Clock}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-white"
          />

          <StatsCard
            title="Inactive Deals"
            subtitle="Stopped"
            value={stats.inactiveDeals}
            animationIndex={3}
            icon={XCircle}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-white"
          />
        </div>

      {/* Deals Table */}
      {loading ? (
        <DealsSkeleton />
      ) : (
        <DealsDataGrid
          deals={deals}
          onUpdateStatus={(id, status, isHighlighted) =>
            handleUpdateDeal(id, status, isHighlighted)
          }
          onDelete={handleDeleteDeal}
          onPageChange={handlePageChange}
          meta={meta}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
