"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  // Ensure totalPages is at least 1 for display purposes
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(safeTotalPages, 5) }, (_, i) => {
          let page: number;

          if (safeTotalPages <= 5) {
            page = i + 1;
          } else if (currentPage <= 3) {
            page = i + 1;
          } else if (currentPage >= safeTotalPages - 2) {
            page = safeTotalPages - 4 + i;
          } else {
            page = currentPage - 2 + i;
          }

          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 p-0 rounded-lg font-medium shadow-sm transition-all duration-200 ${
                page === currentPage
                  ? "bg-linear-to-r from-primary to-primary/80 text-primary-foreground shadow-primary/30 hover:shadow-md hover:shadow-primary/40"
                  : "bg-background shadow-foreground/5 border-2 border-border/50 hover:border-primary/50 hover:bg-primary/75"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= safeTotalPages}
        className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
