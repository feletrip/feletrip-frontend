"use client";

import { BookingStatus } from "@/types/vendor/bookings";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  status?: BookingStatus;
  setStatus: (value?: BookingStatus) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "refunded",
  "checked_out",
  "checked_in",
];

const statusItems = [
  {
    label: "All Status",
    value: "all",
  },
  ...statuses.map((status) => ({
    label: status.replace("_", " "),
    value: status,
  })),
];

const sortItems = [
  {
    label: "Newest",
    value: "desc",
  },
  {
    label: "Oldest",
    value: "asc",
  },
];

export default function BookingFilters({
  status,
  setStatus,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* Status Filter */}

      <Select
        value={status ?? "all"}
        onValueChange={(value) => {
          setStatus(value === "all" ? undefined : (value as BookingStatus));
        }}
      >
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Booking Status</SelectLabel>

            {statusItems.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="capitalize"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Sort Filter */}

      <Select
        value={sortOrder}
        onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
      >
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>

            {sortItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
