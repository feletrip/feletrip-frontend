"use client";

import { motion, Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatItem {
  label: string;
  value: string | number;
  change: string;
  icon: string; // Changed from iconName to match your exact server data key
}

interface UserStatCardsProps {
  stats: StatItem[];
  cardVariants?: Variants;
}

export function UserStatCards({ stats, cardVariants }: UserStatCardsProps) {
  return (
    <>
      {stats.map((item, i) => {
        // Since your data values are already PascalCase ("Building2", "ShieldCheck"),
        // we look up the key directly, defaulting safely to HelpCircle if a typo happens.
        const DynamicIcon = (Icons as any)[item.icon] || Icons.HelpCircle;

        return (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="focus-within:ring-2 focus-within:ring-primary/20 outline-none rounded-2xl"
          >
            <Card className="relative overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-md shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6 flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {item.label}
                  </p>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {item.value}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-primary/10 text-primary border-none hover:bg-primary/15 font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {item.change}
                  </Badge>
                </div>

                <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                  <DynamicIcon className="size-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
}
