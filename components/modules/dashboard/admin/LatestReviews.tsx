import React from "react";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { MailCheck, Star } from "lucide-react";
import { LatestReviewsResponse } from "@/types/admin/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface LatestReviewsProps {
  reviewsResponse?: LatestReviewsResponse;
}

export const LatestReviews: React.FC<LatestReviewsProps> = ({
  reviewsResponse,
}) => {
  const reviews = reviewsResponse?.data || [];
  const totalReviews = reviews.length;

  // Dynamically calculate average rating from real-time data
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <Motion animationType="fadeRight" delay={0.5}>
      <Card className="p-6 shadow-lg border border-border bg-card">
        {/* Dynamic Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-secondary-foreground">
              Latest Reviews
            </h2>
            <div className="p-2 rounded-full bg-yellow-500/10">
              <GoVerified className="text-yellow-500" size={24} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Based on {totalReviews} verified guest submissions
          </p>
        </div>

        {/* Dynamic Score Indicator */}
        <div className="flex items-center gap-2 mt-3 mb-4">
          <p className="text-4xl font-bold tracking-tight text-primary">
            {averageRating}/5
          </p>
        </div>

        {/* Reviews Render Queue */}
        <div className="mt-4 space-y-4 max-h-85 overflow-y-auto pr-1 custom-scrollbar">
          {totalReviews === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-xl border-border/60 bg-primary/10 ">
              <MailCheck className="size-8 text-primary  mb-2" />
              <p className="text-xs font-medium text-muted-foreground">
                No property reviews posted yet
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                  <FaStar size={14} className="text-amber-500" />
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {/* {review.customerName} */}
                      Riadul
                    </p>
                    <span className="flex items-center gap-2 text-xs font-bold text-amber-500 whitespace-nowrap shrink-0">
                      {/* <Star /> {review.rating}.0 */}
                      <Star /> 4.0
                    </span>
                  </div>

                  <p className="text-[11px] text-muted-foreground font-medium truncate">
                    {/* Stayed in {review.hotelName} */}
                    Stayed in Geo Hotels
                  </p>

                  <p className="text-xs text-secondary-foreground mt-1 line-clamp-3 italic leading-relaxed">
                    {/* &quot;{review.comment}&quot; */}
                    &quot;Great&quot;
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </Motion>
  );
};
