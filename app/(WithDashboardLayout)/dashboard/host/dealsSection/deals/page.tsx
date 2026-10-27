import React from "react";
import DealsContent from "./Components/DealsContent";
import DealsHeader from "./Components/DealsHeader";
import DealStats from "./Reuseable/DealState";
import { getMyDealsAction } from "@/Server/Deals/DealsByVendor.actions";

export default async function DealsPage() {
  const response = await getMyDealsAction();
  const initialDeals = response?.success && response.data ? response.data : [];
  const dynamicStats = {
    total: initialDeals.length,
    active: initialDeals.filter((deal: any) => deal.status === "ACTIVE").length,
    pending: initialDeals.filter((deal: any) => deal.status === "PENDING")
      .length,
    expired: initialDeals.filter((deal: any) => deal.status === "EXPIRED")
      .length,
  };

  return (
    <div>
      <DealsHeader />

      <DealStats stats={dynamicStats} />

      <DealsContent initialDeals={initialDeals} />
    </div>
  );
}
