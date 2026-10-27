"use client";

import React, { useState, useTransition } from "react";
import {
  Megaphone,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
} from "lucide-react";
import {
  IAdminAdPaginatedData,
  IAdminAdPricingItem,
  IAdvertisementItem,
} from "@/types/admin/adminAdvertisement";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import SectionHeader from "@/components/Reuseable/SectionHeader";

import { AdDetailsModal } from "./AdDetailsModal";
import { AdPricingModal } from "./AdPricingModal";
import { AdvertsTableAdmin } from "./AdvertsTableAdmin";
import {
  createAdminAdPricing,
  getAllAdminAdvertisements,
  updateAdminAdPricing,
  updateAdStatus,
} from "@/Server/Admin/adminAdvertisement.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";

interface AdminAdvertisementClientProps {
  initialAdsData: IAdminAdPaginatedData | null;
  initialPricingData: IAdminAdPricingItem[];
}

type TabType = "advertisements" | "pricing";

export default function AdminAdvertisementClient({
  initialAdsData,
  initialPricingData,
}: AdminAdvertisementClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("advertisements");
  const [adsData, setAdsData] = useState<IAdminAdPaginatedData | null>(
    initialAdsData,
  );
  const [pricingList, setPricingList] =
    useState<IAdminAdPricingItem[]>(initialPricingData);

  const [selectedAd, setSelectedAd] = useState<IAdvertisementItem | null>(null);
  const [editingPricing, setEditingPricing] =
    useState<IAdminAdPricingItem | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const [pricingDurationType, setPricingDurationType] = useState("WEEK");
  const [pricingPrice, setPricingPrice] = useState<number>(0);

  const [isPending, startTransition] = useTransition();

  // Metrics
  const ads = adsData?.data || [];
  const totalAdsCount = adsData?.pagination?.total || 0;
  const pendingCount = ads.filter(
    (item) => item.status === "PENDING_PAYMENT" || item.status === "PENDING",
  ).length;
  const activeCount = ads.filter((item) => item.status === "ACTIVE").length;
  const rejectedCount = ads.filter((item) => item.status === "REJECTED").length;

  const handlePageChange = (newPage: number) => {
    if (!adsData || newPage < 1 || newPage > adsData.pagination.totalPages)
      return;
    startTransition(async () => {
      try {
        const res = await getAllAdminAdvertisements({
          page: newPage,
          limit: 10,
        });
        if (res?.success && res.data) {
          setAdsData(res.data);
        } else {
          toast.error(
            "Failed to load page",
            res?.message || "Could not retrieve advertisement data.",
          );
        }
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(
          "Error",
          error.message ||
            "An unexpected error occurred while fetching page data.",
        );
      }
    });
  };

  const handleUpdateStatus = (
    adId: string,
    newStatus: "ACTIVE" | "REJECTED",
  ) => {
    toast.loading(
      newStatus === "ACTIVE"
        ? "Approving advertisement..."
        : "Rejecting advertisement...",
    );

    startTransition(async () => {
      try {
        const res = await updateAdStatus(adId, { status: newStatus });
        if (res?.success) {
          setAdsData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              data: prev.data.map((item) =>
                item.id === adId ? { ...item, status: newStatus } : item,
              ),
            };
          });
          setSelectedAd(null);
          toast.success(
            `Advertisement ${newStatus === "ACTIVE" ? "Approved" : "Rejected"}`,
            `The advertisement has been successfully set to ${newStatus.toLowerCase()}.`,
          );
        } else {
          toast.error(
            "Status Update Failed",
            res?.message || "Failed to update ad status.",
          );
        }
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(
          "Error",
          error.message || "An error occurred while updating status.",
        );
      }
    });
  };

  const handleSavePricing = () => {
    startTransition(async () => {
      try {
        if (editingPricing) {
          const res = await updateAdminAdPricing(editingPricing.id, {
            price: Number(pricingPrice),
          });
          if (res?.success && res.data) {
            setPricingList((prev) =>
              prev.map((p) => (p.id === editingPricing.id ? res.data! : p)),
            );
            toast.success(
              "Pricing Updated",
              "The pricing tier details have been updated.",
            );
          } else {
            toast.error(
              "Update Failed",
              res?.message || "Failed to update pricing tier.",
            );
            return;
          }
        } else {
          const res = await createAdminAdPricing({
            durationType: pricingDurationType,
            price: Number(pricingPrice),
          });
          if (res?.success && res.data) {
            setPricingList((prev) => [...prev, res.data!]);
            toast.success(
              "Pricing Created",
              "The new pricing tier has been created successfully.",
            );
          } else {
            toast.error(
              "Creation Failed",
              res?.message || "Failed to create pricing tier.",
            );
            return;
          }
        }
        setIsPricingModalOpen(false);
        setEditingPricing(null);
        setPricingPrice(0);
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(
          "Error",
          error.message || "An error occurred while saving pricing tier.",
        );
      }
    });
  };

  return (
    <div className="space-y-6 w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="relative z-10">
        <Motion>
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-2xl p-9 border-ring/30 bg-primary/10">
            <SectionHeader
              title="Admin Advertisements"
              description="Review vendor ad campaigns, manage active banners, and set up slot pricing rules."
              highlight="Admin Advertisements"
            />
          </div>
        </Motion>
      </div>

      {/* Analytics Summary */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Ad Requests"
            subtitle="All Submissions"
            value={totalAdsCount}
            animationIndex={0}
            icon={Megaphone}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-white"
          />

          <StatsCard
            title="Pending Campaigns"
            subtitle="Requires Action"
            value={pendingCount}
            animationIndex={1}
            icon={Clock}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-white"
          />

          <StatsCard
            title="Active Campaigns"
            subtitle="Lived Banners"
            value={activeCount}
            animationIndex={2}
            icon={CheckCircle2}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-white"
          />

          <StatsCard
            title="Rejected Requests"
            subtitle="Declined Ads"
            value={rejectedCount}
            animationIndex={3}
            icon={XCircle}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-white"
          />
        </div>
      </Motion>

      {/* Navigation Tabs */}
      <Motion animationType="fadeDown" delay={0.2}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-background rounded-xl border border-border/40 shrink-0 w-fit">
            <button
              onClick={() => setActiveTab("advertisements")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "advertisements"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              Ad Submissions
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "pricing"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              Pricing Rules
            </button>
          </div>

          {activeTab === "pricing" && (
            <Button
              onClick={() => {
                setEditingPricing(null);
                setPricingDurationType("WEEK");
                setPricingPrice(0);
                setIsPricingModalOpen(true);
              }}
              className="inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Pricing Tier
            </Button>
          )}
        </div>
      </Motion>

      {/* Main Content Areas */}
      {activeTab === "advertisements" ? (
        <Motion delay={0.25}>
          <AdvertsTableAdmin
            adsData={adsData}
            isPending={isPending}
            onOpenDetails={(item) => setSelectedAd(item)}
            onPageChange={handlePageChange}
          />
        </Motion>
      ) : (
        <Motion delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingList.map((tier) => (
              <div
                key={tier.id}
                className="p-5 rounded-xl border border-border/40 bg-background space-y-4 shadow-xs relative"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase">
                    {tier.durationType}
                  </span>
                  <button
                    onClick={() => {
                      setEditingPricing(tier);
                      setPricingPrice(Number(tier.price));
                      setIsPricingModalOpen(true);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="text-2xl font-bold text-foreground">
                    ৳{tier.price}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Base cost per {tier.durationType.toLowerCase()}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-border/30">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`font-semibold ${
                      tier.isActive ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {tier.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Motion>
      )}

      {/* Modals */}
      <AdDetailsModal
        selectedAd={selectedAd}
        onClose={() => setSelectedAd(null)}
        onUpdateStatus={handleUpdateStatus}
        isPending={isPending}
      />

      <AdPricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        editingPricing={editingPricing}
        pricingDurationType={pricingDurationType}
        setPricingDurationType={setPricingDurationType}
        pricingPrice={pricingPrice}
        setPricingPrice={setPricingPrice}
        onSave={handleSavePricing}
        isPending={isPending}
      />
    </div>
  );
}
