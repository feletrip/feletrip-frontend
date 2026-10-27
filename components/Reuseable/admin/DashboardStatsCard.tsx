/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface StatsCardProps {
  index?: any;
  title: string;
  value: number | string | undefined;
  icon: IconType | LucideIcon;

  bgGlow?: string;
  iconStyle?: string;
  borderGlow?: string;

  subtitle?: string;
  animationIndex?: number;

  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  bgGlow = "from-primary/25 via-primary/5 to-transparent",
  iconStyle = "bg-primary text-primary-foreground",
  borderGlow = "hover:border-primary/40",
  subtitle = "Live Stats",
  animationIndex = 0,
  className = "",
}: StatsCardProps) => {
  return (
    <Motion animationType="fadeUp" delay={animationIndex * 0.1}>
      <div
        className={`group relative overflow-hidden rounded-[28px] border border-border/60 bg-card-bg p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl/4 ${borderGlow} ${className}`}
      >
        <div
          className={`absolute inset-0 bg-linear-to-br ${bgGlow} opacity-80`}
        />

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col justify-between z-10 h-full">
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between gap-2">
              <p className="text-sm font-medium tracking-wide text-muted-foreground clump-2">
                {title}
              </p>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-[1.03] ${iconStyle}`}
              >
                <Icon className="text-2xl text-background" size={24} />
              </div>
            </div>

            <h2 className="my-2 text-4xl sm:text-xl lg:text-2xl xl:text-3xl font-black tracking-tight text-foreground wrap-break-word">
              {value}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="h-1.5 grow max-w-28 overflow-hidden rounded-full bg-border">
              <div className={`h-full rounded-full bg-linear-to-r ${bgGlow}`} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {subtitle}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[28px] border border-white/5" />
      </div>
    </Motion>
  );
};

export default StatsCard;
