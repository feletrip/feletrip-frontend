"use client";

import React, { useState, useTransition } from "react";
import { Clock, CheckCircle2, XCircle, DollarSign, Plus } from "lucide-react";
import {
  IVendorAdListItem,
  ICreateVendorAdPayload,
  IUpdateVendorAdPayload,
  IPaginationMeta,
} from "@/types/vendor/vendorAdvertisement";
import { VendorAdvertisementsTable } from "./VendorAdvertisementsTable";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  createVendorAdvertisement,
  deleteVendorAdvertisement,
  getVendorAdvertisements,
  updateVendorAdvertisement,
} from "@/Server/Vendor/advertisementVendor.action";
import { CreateEditAdModal, AdFormValues } from "./AdCreateEditAdModal";
import { toast } from "@/components/Reuseable/common/toast";

interface HotelOption {
  id: string;
  name: string;
  city?: string;
}

interface AdvertisePageClientProps {
  initialAds: IVendorAdListItem[];
  initialPagination?: IPaginationMeta;
  vendorHotels?: HotelOption[];
}

export default function AdvertisePageClient({
  initialAds,
  initialPagination,
  vendorHotels = [],
}: AdvertisePageClientProps) {
  const [ads, setAds] = useState<IVendorAdListItem[]>(initialAds);
  const [pagination, setPagination] = useState<IPaginationMeta | undefined>(
    initialPagination,
  );

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<IVendorAdListItem | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleOpenCreateModal = () => {
    setEditingAd(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ad: IVendorAdListItem) => {
    setEditingAd(ad);
    setIsModalOpen(true);
  };

  // Fetch ads for specific page or refresh current page
  const fetchAds = async (page: number = pagination?.page || 1) => {
    try {
      const res = await getVendorAdvertisements({
        page,
        limit: pagination?.limit || 10,
      });
      if (res?.success && Array.isArray(res?.data)) {
        setAds(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      console.error("Error fetching ads:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    startTransition(async () => {
      await fetchAds(newPage);
    });
  };

  const handleFormSubmit = async (values: AdFormValues, bannerUrl: string) => {
    const isEditing = Boolean(editingAd);
    toast.loading(isEditing ? "Updating campaign..." : "Creating campaign...");

    try {
      if (editingAd) {
        // --- Update Action Payload ---
        const updatePayload: IUpdateVendorAdPayload = {
          title: values.title,
          description: values.description,
          ...(bannerUrl ? { bannerImage: bannerUrl } : {}),
        };

        const res = await updateVendorAdvertisement(
          editingAd.id,
          updatePayload,
        );
        if (!res?.success) {
          throw new Error(res?.message || "Failed to update advertisement");
        }
      } else {
        // --- Create Action Payload ---
        const createPayload: ICreateVendorAdPayload = {
          hotelId: values.hotelId,
          title: values.title,
          description: values.description,
          bannerImage: bannerUrl,
          durationType: values.durationType,
        };

        const res = await createVendorAdvertisement(createPayload);
        if (!res?.success) {
          throw new Error(res?.message || "Failed to create advertisement");
        }
      }

      // Refresh list on current page within transition block
      startTransition(async () => {
        await fetchAds(pagination?.page || 1);
      });

      toast.success(
        "Success!",
        isEditing
          ? "Campaign updated successfully."
          : "Campaign created successfully.",
      );
      setIsModalOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error("Process Failed", errorMessage);
      throw error;
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (!confirm("Are you sure you want to delete this advertisement?")) return;

    startTransition(async () => {
      try {
        const res = await deleteVendorAdvertisement(id);
        if (res?.success) {
          toast.success("Deleted", "Advertisement has been removed.");
          await fetchAds(pagination?.page || 1);
        } else {
          toast.error(
            "Error",
            res?.message || "Could not delete advertisement.",
          );
        }
      } catch {
        toast.error("Error", "Failed to communicate with server.");
      }
    });
  };

  // Quick summary statistics calculation
  const totalSpend = ads.reduce(
    (acc, curr) => acc + (Number(curr.price) || 0),
    0,
  );
  const pendingCount = ads.filter((i) =>
    i.status?.toUpperCase().includes("PENDING"),
  ).length;
  const approvedCount = ads.filter(
    (i) => i.status?.toUpperCase() === "APPROVED",
  ).length;
  const rejectedCount = ads.filter(
    (i) => i.status?.toUpperCase() === "REJECTED",
  ).length;

  return (
    <div className="space-y-6 w-full p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="relative z-10">
        <Motion>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded-2xl p-6 lg:p-9 border-ring/30 bg-primary/10">
            <SectionHeader
              title="Vendor Advertisements"
              description="Promote your hotel properties, monitor ad approvals, and track campaign performance."
              highlight="Vendor Advertisements"
            />
            <Button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Advertisement
            </Button>
          </div>
        </Motion>
      </div>

      {/* Stats Cards */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Ad Spend"
            subtitle="Overall Investment"
            value={`৳${totalSpend.toLocaleString()}`}
            animationIndex={0}
            icon={DollarSign}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-blue-500-foreground"
          />
          <StatsCard
            title="Pending Requests"
            subtitle="Under Review"
            value={pendingCount}
            animationIndex={1}
            icon={Clock}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-amber-500-foreground"
          />
          <StatsCard
            title="Active / Approved"
            subtitle="Live Campaigns"
            value={approvedCount}
            animationIndex={2}
            icon={CheckCircle2}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-emerald-500-foreground"
          />
          <StatsCard
            title="Rejected Ads"
            subtitle="Declined"
            value={rejectedCount}
            animationIndex={3}
            icon={XCircle}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-rose-500-foreground"
          />
        </div>
      </Motion>

      {/* Main Table with Pagination */}
      <Motion delay={0.25}>
        <VendorAdvertisementsTable
          advertisements={ads}
          pagination={pagination}
          isPending={isPending}
          onPageChange={handlePageChange}
          onEditAd={handleOpenEditModal}
          onDeleteAd={handleDeleteAd}
        />
      </Motion>

      {/* Create / Edit Modal */}
      <CreateEditAdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingAd}
        hotels={vendorHotels}
        isSubmitting={isPending}
      />
    </div>
  );
}
