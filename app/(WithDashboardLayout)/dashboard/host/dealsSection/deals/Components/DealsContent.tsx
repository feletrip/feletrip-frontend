"use client";

import { useState } from "react";
import SearchFilter from "../Reuseable/SearchFilter";
import DealTable from "./DealTable";
import {
  DealsData,
  updateDealsAction,
  deleteDealsAction,
} from "@/Server/Deals/DealsByVendor.actions";
import { toast } from "@/components/Reuseable/common/toast";

export default function DealsContent({
  initialDeals,
}: {
  initialDeals: DealsData[];
}) {
  const [deals, setDeals] = useState<DealsData[]>(initialDeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.promoCode.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "all") return matchesSearch;

    return (
      matchesSearch && deal.status?.toLowerCase() === filterType.toLowerCase()
    );
  });

  // update
  const handleUpdate = async (id: string, updatedData: Partial<DealsData>) => {
    toast.loading("Updating deal...");
    const res = await updateDealsAction(id, updatedData);
    toast.close();
    if (res?.success && res.data) {
      setDeals((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...res.data! } : d)),
      );
      toast.success("Updated successfully");
    } else {
      toast.error(res?.message || "Failed to update");
    }
  };

  // delete
  const handleDelete = async (id: string) => {
    toast.loading("Deleting deal...");
    const res = await deleteDealsAction(id);
    toast.close();

    if (res?.success) {
      setDeals((prev) => prev.filter((d) => d.id !== id));
      toast.success("Deleted successfully");
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>

      <DealTable
        deals={filteredDeals}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
}
