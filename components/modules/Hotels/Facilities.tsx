"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { TFilters } from "@/types/filters";

interface FacilitiesProps {
  selected?: string[];
  setFilters?: React.Dispatch<React.SetStateAction<TFilters>>;
}

const Facilities = ({
  selected = [],
  setFilters,
}: FacilitiesProps) => {
  const facilitiesList: string[] = [
    "Fitness centre",
    "Restaurant",
    "Spa and wellness centre",
    "Airport shuttle",
    "Free WiFi",
    "Swimming pool",
    "Electric vehicle charging station",
    "Non-smoking rooms",
    "Room service",
    "Hot tub/Jacuzzi",
    "Wheelchair accessible",
    "Parking",
    "24-hour front desk",
  ];

  const initialVisibleFacilities = 5;
  const [showAll, setShowAll] = React.useState(false);

  const visibleFacilities = showAll
    ? facilitiesList
    : facilitiesList.slice(0, initialVisibleFacilities);

  const toggle = (value: string) => {
    setFilters?.((prev) => {
      const exists = prev.facilities.includes(value);

      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f !== value)
          : [...prev.facilities, value],
      };
    });
  };

  return (
    <div className="pb-4">
      <h2 className="font-semibold mb-2 text-lg">Facilities</h2>

      <FieldGroup className="gap-3">
        {visibleFacilities.map((facility) => (
          <Field key={facility} orientation="horizontal">
            <Checkbox
              checked={selected.includes(facility)}
              onCheckedChange={() => toggle(facility)}
              id={`facility-${facility}`}
              className="cursor-pointer"
            />

            <FieldLabel
              htmlFor={`facility-${facility}`}
              className="font-normal cursor-pointer"
            >
              {facility}
            </FieldLabel>
          </Field>
        ))}

        {facilitiesList.length > initialVisibleFacilities && (
          <button
            type="button"
            className="text-green-500 text-sm font-semibold cursor-pointer text-left"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        )}
      </FieldGroup>
    </div>
  );
};

export default Facilities;