"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import FilterSidebar from "@/components/modules/Hotels/FilterSideBar";
import { CiFilter } from "react-icons/ci";
import { TFilters } from "@/types/filters";

interface FilterPatternProps {
  filters?: TFilters;
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
  handleApplyFilter?: () => void;
}
export function FilterPattern({
  filters,
  setFilters,
  handleApplyFilter,
}: FilterPatternProps) {
  const handleApplyFilterFromDrawer = () => {
    handleApplyFilter?.();
  };
  return (
    <div className="flex items-center justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <CiFilter /> Show Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-xl">Filters</DrawerTitle>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              handleApplyFilter={handleApplyFilterFromDrawer}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="bg-primary text-destructive-foreground"
                variant="outline"
                onClick={handleApplyFilterFromDrawer}
              >
                Apply Filter
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button className="bg-muted text-foreground" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
