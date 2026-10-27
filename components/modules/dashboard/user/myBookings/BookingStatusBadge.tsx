import type { ElementType } from "react";
import { CheckCircle2, CircleDollarSign, Clock3, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types/user/booking";

type StatusConfig = {
  label: string;
  className: string;
  icon: ElementType;
};

const statusConfig: Record<BookingStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    className:"border-warning/20 bg-warning/10 text-warning hover:bg-warning/10",
    icon: Clock3,
  },

  confirmed: {
    label: "Confirmed",
    className:"border-primary/20 bg-primary/10 text-accent-foreground hover:bg-primary/10",
    icon: CheckCircle2,
  },

  completed: {
    label: "Completed",
    className:"border-success/20 bg-success/10 text-success hover:bg-success/10",
    icon: CheckCircle2,
  },

  cancelled: {
    label: "Cancelled",
    className:"border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10",
    icon: XCircle,
  },

  refunded: {
    label: "Refunded",
    className: "border-info/20 bg-info/10 text-info hover:bg-info/10",
    icon: CircleDollarSign,
  },
};

type BookingStatusBadgeProps = {
  status: BookingStatus;
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 rounded-full px-3 py-1 ${config.className}`}
    >
      <Icon className="size-3.5" />

      {config.label}
    </Badge>
  );
}
