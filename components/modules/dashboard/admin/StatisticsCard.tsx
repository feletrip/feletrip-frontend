import { IconType } from "react-icons";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";

interface StatsCardProps {
  index: number;
  title: string;
  value: string | number;
  icon: IconType | LucideIcon; // Added LucideIcon type support here
  trendText?: string;
  trendDescription?: string;
  className?: string;
  iconClassName?: string;
}

export const StatisticsCard: React.FC<StatsCardProps> = ({
  index,
  title,
  value,
  icon: Icon,
  trendText,
  trendDescription,
  className,
  iconClassName,
}) => {
  const isPositive = trendText !== undefined && trendText.includes("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      }}
      className={cn("group relative overflow-hidden rounded-2xl", className)}
    >
      <Card className="relative p-5 border border-border/50 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-500 bg-transparent">
        {/* Header */}
        <CardHeader className="flex items-start justify-between px-0 py-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>

            {trendText && (
              <div
                className={cn(
                  "mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  isPositive
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive",
                )}
              >
                {isPositive ? (
                  <FaCaretUp size={14} />
                ) : (
                  <FaCaretDown size={14} />
                )}
                {trendText}
              </div>
            )}
          </div>

          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.05,
            }}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              iconClassName,
            )}
          >
            <Icon
              size={28}
              className="transition-all duration-300 group-hover:scale-110"
            />
          </motion.div>
        </CardHeader>

        {/* Value */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>

            {trendDescription && (
              <p className="mt-1 text-sm text-muted-foreground">
                {trendDescription}
              </p>
            )}
          </div>

          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {isPositive ? (
              <TrendingUp size={40} className="text-primary opacity-80" />
            ) : (
              <TrendingDown size={40} className="text-destructive opacity-80" />
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
