"use client";

import { toast } from "@/components/Reuseable/common/toast";
import {
  EditHotelStatus,
  getAllproperties,
} from "@/Server/Admin/Properties.admin";
import React, { useEffect, useState, useCallback } from "react";
import PropertyDataGrid, {
  type Property,
} from "@/components/Reuseable/admin/propertyManagement/PropertyDataGrid";
import PropertySkeleton from "@/components/Reuseable/admin/propertyManagement/PropertySkeleton";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Building2, CheckCircle2, XCircle, Users } from "lucide-react";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const Page = () => {
  const [Allproperties, setAllproperty] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  // Manual trigger for refetching after actions (e.g. status updates)
  const refreshProperties = useCallback(
    async (page = currentPage, limit = pageSize) => {
      try {
        setLoading(true);
        const res = await getAllproperties({ page, limit });
        const data = res?.data?.data || [];
        setAllproperty(Array.isArray(data) ? data : []);
        setMeta(
          res?.data?.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
          },
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to reload properties");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await EditHotelStatus(id, { status });
      if (res?.success) {
        toast.success("Hotel status updated successfully");
        refreshProperties(currentPage, pageSize);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Safe data loading inside effect to avoid cascading re-render warnings
  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      setLoading(true);
      try {
        const res = await getAllproperties({
          page: currentPage,
          limit: pageSize,
        });
        if (isMounted) {
          const data = res?.data?.data || [];
          setAllproperty(Array.isArray(data) ? data : []);
          setMeta(
            res?.data?.pagination || {
              total: 0,
              page: 1,
              limit: 10,
              totalPages: 0,
            },
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [currentPage, pageSize]);

  // Analytics counts
  const totalProperties = meta.total || Allproperties.length;
  const activeProperties = Allproperties.filter(
    (p) => p.status === "ACTIVE",
  ).length;
  const inactiveProperties = Allproperties.filter(
    (p) => p.status === "INACTIVE",
  ).length;
  const uniqueVendors = new Set(
    Allproperties.map((p) => p.vendor?.id).filter(Boolean),
  ).size;

  return (
    <div className="space-y-8 w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="relative flex items-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Property Management
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Manage all properties in the system with ease
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Summary Cards (4 Grid Layout using StatsCard) */}
      <Motion animationType="fadeUp" delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Properties"
            subtitle="System Wide"
            value={totalProperties}
            animationIndex={0}
            icon={Building2}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-blue-500-foreground"
          />

          <StatsCard
            title="Active Properties"
            subtitle="Published & Live"
            value={activeProperties}
            animationIndex={1}
            icon={CheckCircle2}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-emerald-500-foreground"
          />

          <StatsCard
            title="Inactive Properties"
            subtitle="Disabled / Offline"
            value={inactiveProperties}
            animationIndex={2}
            icon={XCircle}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-rose-500-foreground"
          />

          <StatsCard
            title="Total Vendors"
            subtitle="Registered Partners"
            value={uniqueVendors}
            animationIndex={3}
            icon={Users}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-amber-500-foreground"
          />
        </div>
      </Motion>

      {/* Property List */}
      {loading ? (
        <PropertySkeleton />
      ) : (
        <PropertyDataGrid
          properties={Allproperties}
          onStatusChange={handleStatusChange}
          onPageChange={handlePageChange}
          meta={meta}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default Page;
