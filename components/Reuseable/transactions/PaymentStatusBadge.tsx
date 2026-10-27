import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/user/transactionHistory";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusStyles: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  paid: {
    label: "Paid",
    className:
      "bg-success/10 text-success border-success/20 hover:bg-success/10",
  },

  pending: {
    label: "Pending",
    className:
      "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
  },

  failed: {
    label: "Failed",
    className:
      "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
  },

  refunded: {
    label: "Refunded",
    className: "bg-info/10 text-info border-info/20 hover:bg-info/10",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusStyles[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize rounded-full px-3 py-1 text-xs font-medium border",
        config.className,
      )}
    >
      {config.label}
    </Badge>
  );
}
