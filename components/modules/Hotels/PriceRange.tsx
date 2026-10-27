"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TFilters } from "@/types/filters";

interface SliderControlledProps {
  priceRange?: [number, number];
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

export function SliderControlled({
  priceRange = [0, 20000],
  setFilters,
}: SliderControlledProps) {
  return (
    <div className="mx-auto grid w-full gap-3 border-b pb-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="font-semibold text-lg">Price Range</Label>
      </div>

      <Slider
        value={priceRange}
        onValueChange={(value) =>
          setFilters?.((prev) => ({
            ...prev,
            priceRange: value as [number, number],
          }))
        }
        min={0}
        max={20000}
        step={100}
      />

      <div className="flex items-center justify-between">
        <span>BDT: {priceRange[0]}</span>
        <span>BDT: {priceRange[1]}</span>
      </div>
    </div>
  );
}
