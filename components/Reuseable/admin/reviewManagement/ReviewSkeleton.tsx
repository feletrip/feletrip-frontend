"use client";

export default function ReviewSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="h-12 w-64 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-6 w-96 bg-muted/50 rounded-lg animate-pulse mt-3" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border-2 border-border/50 bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-muted/50 animate-pulse" />
              <div className="space-y-2">
                <div className="h-8 w-16 bg-muted/50 rounded-lg animate-pulse" />
                <div className="h-4 w-24 bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

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
            {/* Rating Column */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted/50 rounded animate-pulse" />
              <div className="h-5 w-8 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-4 w-12 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Comment Column */}
            <div className="flex items-center">
              <div className="h-4 w-48 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Customer ID Column */}
            <div className="flex items-center">
              <div className="h-4 w-20 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Hotel ID Column */}
            <div className="flex items-center">
              <div className="h-4 w-20 bg-muted/50 rounded-lg animate-pulse" />
            </div>

            {/* Created At Column */}
            <div className="flex items-center">
              <div className="h-4 w-28 bg-muted/50 rounded-lg animate-pulse" />
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
