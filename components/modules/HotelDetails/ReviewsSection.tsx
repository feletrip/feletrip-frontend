"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { TReview } from "@/types/review";
import {
  Star,
  MessageSquareOff,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ReviewsModal } from "./ReviewsModal";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface ReviewsSectionProps {
  reviews: TReview[];
}

const PREVIEW_LIMIT = 4;

const ReviewsSection = ({ reviews = [] }: ReviewsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized statistics calculations
  const { totalReviews, averageRating, breakdown } = useMemo(() => {
    const total = reviews.length;
    const avg =
      total > 0
        ? reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / total
        : 0;

    const starsBreakdown = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter(
        (r) => Math.round(Number(r.rating)) === star,
      ).length;
      return {
        star,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      };
    });

    return {
      totalReviews: total,
      averageRating: avg,
      breakdown: starsBreakdown,
    };
  }, [reviews]);

  const previewReviews = reviews.slice(0, PREVIEW_LIMIT);

  return (
    <section className="space-y-8 relative my-12 pt-10 border-t border-muted/60">
      {/* Section Header */}
      <Motion animationType="fadeUp" duration={0.4}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Guest Experiences
              </h2>
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Verified Feedback
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real feedback from verified guests who stayed at this property.
            </p>
          </div>

          {totalReviews > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors self-start sm:self-auto bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-xl border border-primary/20 cursor-pointer"
            >
              <span>See All ({totalReviews}) Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Motion>

      {/* Main Grid: Side-by-Side on LG screens */}
      {reviews.length === 0 ? (
        /* Empty State Animation */
        <Motion animationType="fade" duration={0.5}>
          <div className="border-t border-muted/60 py-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150 animate-pulse" />
              <div className="relative h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                <MessageSquareOff className="h-8 w-8 stroke-2" />
              </div>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
              No Reviews Yet
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Be among the first guests to share your experience after your
              upcoming stay at this property!
            </p>
          </div>
        </Motion>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Summary Card (Sticky on desktop) */}
          <Motion
            animationType="fadeUp"
            duration={0.4}
            delay={0.1}
            className="lg:col-span-5 lg:sticky lg:top-24 space-y-4"
          >
            <div className="bg-background border border-muted/80 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Rating Big Display */}
              <div className="flex flex-col items-center sm:items-start border-b border-muted/80 pb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground font-semibold">
                    / 5.0
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 gap-1 my-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted/30"
                      }
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                  <p className="text-xs font-semibold text-muted-foreground">
                    Based on {totalReviews}{" "}
                    {totalReviews === 1 ? "review" : "verified reviews"}
                  </p>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="space-y-2.5">
                {breakdown.map((item, idx) => (
                  <Motion
                    key={item.star}
                    animationType="fadeUp"
                    delay={0.15 + idx * 0.05}
                    className="flex items-center gap-3 text-xs"
                  >
                    <span className="w-8 font-bold text-muted-foreground flex items-center gap-1 shrink-0">
                      {item.star}{" "}
                      <Star
                        size={11}
                        className="fill-amber-400 text-amber-400 shrink-0"
                      />
                    </span>

                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-400 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    <span className="w-8 text-right font-semibold text-muted-foreground shrink-0">
                      {item.count}
                    </span>
                  </Motion>
                ))}
              </div>

              {/* View All Button Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read All {totalReviews} Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Motion>

          {/* Right Column: Minimal Preview Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {previewReviews.map((review, index) => {
                const displayName = review.customer?.name || "Anonymous Guest";
                const avatarUrl = review.customer?.avatar;

                return (
                  <Motion
                    key={review.id}
                    animationType="fadeUp"
                    delay={0.15 + index * 0.08}
                    duration={0.35}
                  >
                    <div className="group bg-background border border-muted/80 hover:border-primary/40 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between gap-3 relative overflow-hidden">
                      {/* Top Bar */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
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

                          <div className="min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
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

                        {/* Mini Star Pill */}
                        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md text-[11px] font-bold shrink-0">
                          <Star
                            size={11}
                            className="fill-amber-500 text-amber-500 shrink-0"
                          />
                          <span>{Number(review.rating).toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  </Motion>
                );
              })}
            </div>

            {/* Footer Prompt */}
            {totalReviews > PREVIEW_LIMIT && (
              <Motion
                animationType="fade"
                delay={0.45}
                className="text-center pt-2"
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Showing {PREVIEW_LIMIT} of {totalReviews} reviews. Click to
                  see all →
                </button>
              </Motion>
            )}
          </div>
        </div>
      )}

      {/* Modal Component */}
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={reviews}
        totalReviews={totalReviews}
      />
    </section>
  );
};

export default ReviewsSection;
