import { CalendarDays } from "lucide-react";

import { Motion } from "@/components/Reuseable/common/Framermotion";

export function BookingEmptyState() {
  return (
    <Motion animationType="scale">
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent">
          <CalendarDays className="size-7 text-primary" />
        </div>

        <h3 className="mt-4 font-semibold">No bookings found</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          There are no reservations available in this category or matching your
          search.
        </p>
      </div>
    </Motion>
  );
}
