"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPagination } from "@/Server/Hotels/getHotelsAction";
  
interface HotelsPaginationProps {
  pagination: IPagination;
  onPageChange: (page: number) => void;
}

export default function HotelsPagination({
  pagination,
  onPageChange,
}: HotelsPaginationProps) {
  const { page: currentPage, totalPages, total, limit } = pagination;

  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="px-4 pt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Result Count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {from} - {to}
          </span>

          <span>of</span>

          <span className="font-medium text-foreground">{total}</span>

          <span>hotels</span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;

              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }

              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`h-9 w-9 p-0 rounded-lg font-medium shadow-lg transition-all duration-200 ${
                    page === currentPage
                      ? "bg-linear-to-r from-primary to-primary/80 shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                      : "bg-background shadow-foreground/5 border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
