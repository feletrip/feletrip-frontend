"use client";

import { format } from "date-fns";

interface DateFieldDisplayProps {
  value?: Date;
}

export const DateFieldDisplay = ({ value }: DateFieldDisplayProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl font-bold leading-none text-foreground/40">
        {value ? format(value, "dd") : "--"}
      </span>
      <div className="h-10 w-px shrink-0 bg-border" />
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">
          {value ? format(value, "EEEE") : "Day"}
        </span>
        <span className="text-sm text-muted-foreground">
          {value ? format(value, "MMM yyyy") : "Mon YYYY"}
        </span>
      </div>
    </div>
  );
};
