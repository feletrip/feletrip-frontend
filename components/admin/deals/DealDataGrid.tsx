"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import DealDataGridRow from "./DealDataGridRow";

type Props = {
  deals: any[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  handleToggleStatus: (id: string) => void;
};

export default function DealDataGrid({
  deals,
  activeDropdown,
  setActiveDropdown,
  handleToggleStatus,
}: Props) {
  if (!deals.length) {
    return (
      <Motion
        animationType="scale"
        className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground"
      >
        No deals found
      </Motion>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {deals.map((deal, index) => (
        <Motion key={deal.id} animationType="card" custom={index}>
          <DealDataGridRow
            deal={deal}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            handleToggleStatus={handleToggleStatus}
          />
        </Motion>
      ))}
    </div>
  );
}
