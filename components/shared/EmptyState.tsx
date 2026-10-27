import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  actionType?: "link" | "button";
  containerClassName?: string;
  iconContainerClassName?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  actionType = "link",
  containerClassName,
  iconContainerClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center",
        containerClassName
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center",
            iconContainerClassName
          )}
        >
          {icon}
        </div>
      )}

      <h4 className="mt-4 font-semibold text-foreground">{title}</h4>

      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {actionLabel && actionHref && (
        <div className="mt-4">
          {actionType === "button" ? (
            <Button size="sm" asChild>
              <Link href={actionHref}>
                {actionLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80"
            >
              {actionLabel}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
