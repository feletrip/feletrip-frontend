import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title?: string;
  label: string;
  value: number | string;
  icon: LucideIcon;
  gradient?: string;
  border?: string;
  shadow?: string;
  iconColorClass?: string;
  iconBgClass?: string;
  animationIndex?: number;
  bgGlow?: string;
  borderGlow?: string;
  iconStyle?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  gradient = "from-primary/15 via-primary/10 to-primary/5",
  border = "border-primary/30",
  shadow = "shadow-primary/10",
  iconColorClass = "text-primary",
  iconBgClass = "from-primary/30 to-primary/20",
}: StatCardProps) {
  return (
    <Card
      className={`bg-linear-to-br ${gradient} ${border} shadow-lg ${shadow} overflow-hidden relative group hover:scale-105 hover:shadow-2xl transition-all duration-500 py-2`}>
      <div className="absolute inset-0 bg-linear-to-br from-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-4">
        <div className="flex flex-col items-start">
          <div
            className={`p-3 bg-linear-to-br ${iconBgClass} rounded-2xl shadow-lg mb-2`}>
            <Icon className={`h-5 w-5 ${iconColorClass}`} />
          </div>
          <div className="w-full min-w-0">
            <p className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-foreground truncate max-w-full" title={String(value)}>
              {value}
            </p>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 truncate">
              {label}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
