"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { TReview } from "@/types/review";
import { Star, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Button, Dropdown, Label } from "@heroui/react";

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: TReview[];
  totalReviews: number;
}

type SortOption = "recent" | "highest" | "lowest";

export const ReviewsModal = ({
  isOpen,
  onClose,
  reviews,
  totalReviews,
}: ReviewsModalProps) => {
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(
    null,
  );
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Calculate review count for each star rating
  const starCounts = useMemo(() => {
    return [5, 4, 3, 2, 1].reduce(
      (acc, star) => {
        acc[star] = reviews.filter(
          (r) => Math.round(Number(r.rating)) === star,
        ).length;
        return acc;
      },
      {} as Record<number, number>,
    );
  }, [reviews]);

  // Filter and sort reviews dynamically
  const processedReviews = useMemo(() => {
    let result = [...reviews];

    // Filter by rating
    if (selectedStarFilter !== null) {
      result = result.filter(
        (r) => Math.round(Number(r.rating)) === selectedStarFilter,
      );
    }

    // Sort by selection
    result.sort((a, b) => {
      if (sortBy === "highest") {
        return Number(b.rating) - Number(a.rating);
      }
      if (sortBy === "lowest") {
        return Number(a.rating) - Number(b.rating);
      }
      // Default: "recent"
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return result;
  }, [reviews, selectedStarFilter, sortBy]);

  // Dynamic label helpers for active selections
  const getFilterLabel = () => {
    if (selectedStarFilter === null) return `All Stars (${totalReviews})`;
    return `${selectedStarFilter} Stars (${starCounts[selectedStarFilter] || 0})`;
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "highest":
        return "Highest Rating";
      case "lowest":
        return "Lowest Rating";
      case "recent":
      default:
        return "Most Recent";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Animation */}
          <Motion
            animationType="fade"
            duration={0.25}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          >
            <div className="w-full h-full" onClick={onClose} />
          </Motion>

          {/* Modal Container Animation */}
          <Motion
            animationType="scale"
            duration={0.3}
            className="relative z-10 bg-background border border-muted/80 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4 bg-muted/20 shrink-0">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  All Guest Reviews
                </h3>
                <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full">
                  {totalReviews}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toolbar: Dropdown Filters & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3 border-b bg-background/50 shrink-0">
              {/* Star Rating Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground">
                  Filter:
                </span>
                <Dropdown>
                  <Button
                    aria-label="Filter by star rating"
                    variant="secondary"
                    className="h-8 rounded-lg! text-xs min-w-30 justify-between"
                  >
                    {getFilterLabel()}
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      onAction={(key) =>
                        setSelectedStarFilter(
                          key === "all" ? null : Number(key),
                        )
                      }
                    >
                      <Dropdown.Item
                        id="all"
                        textValue={`All Stars (${totalReviews})`}
                      >
                        <Label>All Stars ({totalReviews})</Label>
                      </Dropdown.Item>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <Dropdown.Item
                          key={star}
                          id={String(star)}
                          textValue={`${star} Stars (${starCounts[star] || 0})`}
                        >
                          <Label>
                            {star} Stars ({starCounts[star] || 0})
                          </Label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-muted/60">
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground">
                  Sort:
                </span>
                <Dropdown>
                  <Button
                    aria-label="Sort reviews"
                    variant="secondary"
                    className="h-8 rounded-lg! text-xs min-w-30 justify-between"
                  >
                    {getSortLabel()}
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      onAction={(key) => setSortBy(key as SortOption)}
                    >
                      <Dropdown.Item id="recent" textValue="Most Recent">
                        <Label>Most Recent</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="highest" textValue="Highest Rating">
                        <Label>Highest Rating</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="lowest" textValue="Lowest Rating">
                        <Label>Lowest Rating</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            </div>

            {/* Scrollable Reviews List */}
            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-muted/60">
              {processedReviews.length === 0 ? (
                <Motion
                  animationType="fade"
                  className="py-12 text-center text-muted-foreground text-xs"
                >
                  No reviews found matching the selected filter criteria.
                </Motion>
              ) : (
                processedReviews.map((review, index) => {
                  const displayName =
                    review.customer?.name || "Anonymous Guest";
                  const avatarUrl = review.customer?.avatar;

                  return (
                    <Motion
                      key={review.id}
                      animationType="fadeUp"
                      delay={index * 0.04}
                      className="pt-4 first:pt-0 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border/80 shrink-0 bg-muted flex items-center justify-center">
                            {avatarUrl ? (
                              <Image
                                src={avatarUrl}
                                alt={displayName}
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                {displayName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-foreground">
                              {displayName}
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium">
                              {review.createdAt
                                ? new Date(review.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )
                                : "Recently stayed"}
                            </p>
                          </div>
                        </div>

                        {/* Star Badge */}
                        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-md text-xs font-bold shrink-0">
                          <Star
                            size={12}
                            className="fill-amber-500 text-amber-500 shrink-0"
                          />
                          <span>{Number(review.rating).toFixed(1)}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {review.comment}
                      </p>
                    </Motion>
                  );
                })
              )}
            </div>
          </Motion>
        </div>
      )}
    </AnimatePresence>
  );
};
