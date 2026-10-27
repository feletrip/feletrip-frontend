"use client";

export default function DealsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Table Container */}
      <div className="rounded-2xl border-2 border-border/50 bg-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b-2 border-border/50 bg-muted/30">
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-6 bg-muted/50 rounded-lg animate-pulse" />
        </div>

        {/* Table Rows */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 p-4 border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
          >
            {/* Deal Title Column */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted/50 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted/50 rounded-lg animate-pulse" />
                <div className="h-3 w-24 bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Type Column */}
            <div className="flex items-center">
              <div className="h-7 w-20 bg-muted/50 rounded-full animate-pulse" />
            </div>

            {/* Discount Column */}
            <div className="flex items-center">
              <div className="h-4 w-16 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Usage Column */}
            <div className="flex items-center">
              <div className="h-4 w-20 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Status Column */}
            <div className="flex items-center">
              <div className="h-7 w-20 bg-muted/50 rounded-full animate-pulse" />
            </div>

            {/* Actions Column */}
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 bg-muted/50 rounded-lg animate-pulse" />
            <div className="h-5 w-8 bg-muted/50 rounded-lg animate-pulse" />
            <div className="h-5 w-16 bg-muted/50 rounded-lg animate-pulse" />
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
              ))}
            </div>
            <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
