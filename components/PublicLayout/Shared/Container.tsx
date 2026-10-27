"use client";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "container px-4 mx-auto  transition-all duration-500",
        className,
      )}
    >
      {children}
    </div>
  );
}
