"use client";

import { SliderControlled } from "./PriceRange";
import PropertyRating from "./PropertyRating";
import PropertyType from "./PropertyType";
import ReservationPolicy from "./ReservationPolicy";
import BedPreference from "./BedPreference";
import Facilities from "./Facilities";
import { Button } from "@/components/ui/button";
import { TFilters } from "@/types/filters";
import { THotel } from "@/types/hotel";

interface FilterSideBarProps {
  hotels?: THotel[];
  handleApplyFilter?: () => void;
  filters?: TFilters;
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const FilterSideBar = ({
  handleApplyFilter,
  filters,
  setFilters,
}: FilterSideBarProps) => {
  return (
    // The main container fills the sidebar column layout flexbox cleanly
    <div className="w-full flex flex-col h-full max-h-[inherit] bg-card text-card-foreground relative">
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 hide-scrollbar pb-2">
        <SliderControlled
          priceRange={filters?.priceRange}
          setFilters={setFilters}
        />

        <PropertyRating rating={filters?.rating} setFilters={setFilters} />

        <PropertyType selected={filters?.propertyType} setFilters={setFilters} />

        <ReservationPolicy
          selected={filters?.reservationPolicy}
          setFilters={setFilters}
        />

        <BedPreference
          selected={filters?.bedPreference}
          setFilters={setFilters}
        />

        <Facilities selected={filters?.facilities} setFilters={setFilters} />
      </div>

      <div className="sticky w-full -bottom-4 bg-background py-4 border-t border-border/60 z-10 mt-auto">
        <Button 
          className="w-full hidden lg:block" 
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterSideBar;