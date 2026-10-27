import { ReactNode } from "react";

interface TripInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function TripInfoItem({
  icon,
  label,
  value,
}: TripInfoItemProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}