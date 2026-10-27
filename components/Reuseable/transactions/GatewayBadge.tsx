import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PaymentGateway } from "@/types/user/transactionHistory";

interface GatewayBadgeProps {
  gateway: PaymentGateway;
}

const gatewayStyles: Record<
  PaymentGateway,
  { label: string; className: string }
> = {
  SSLCOMMERZ: {
    label: "SSLCommerz",
    className:
      "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
  },
  AAMARPAY: {
    label: "AamarPay",
    className: "bg-accent text-accent-foreground border-accent hover:bg-accent",
  },
  SURJOPAY: {
    label: "SurjoPay",
    className: "bg-info/10 text-info border-info/20 hover:bg-info/10",
  },
  BANKTRANSFER: {
    label: "Bank Transfer",
    className: "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
  NAGAD: {
    label: "Nagad",
    className:
      "bg-chart-4/10 text-chart-4 border-chart-4/20 hover:bg-chart-4/10",
  },
  ROCKET: {
    label: "Rocket",
    className: "bg-error/10 text-error border-error/20 hover:bg-error/10",
  },
  BKASH: {
    label: "bKash",
    className:
      "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
  },
};

export function GatewayBadge({ gateway }: GatewayBadgeProps) {
  const config = gatewayStyles[gateway];

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium border",
        config.className,
      )}
    >
      {config.label}
    </Badge>
  );
}
