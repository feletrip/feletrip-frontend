import type { ElementType } from "react";

type BookingDetailProps = {
  icon: ElementType;
  label: string;
  value: string;
};

export function BookingDetail({
  icon: Icon,
  label,
  value,
}: BookingDetailProps) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent">
        <Icon className="size-4 text-accent-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
