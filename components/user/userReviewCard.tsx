import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquareReply, Star } from "lucide-react";
import { IReview } from "@/types/user/Review";

interface ReviewCardProps {
  review: IReview;
}

export default function UserReviewCard({ review }: ReviewCardProps) {
  const hotel = review.hotel ?? {
    id: "",
    name: review.customer?.name ?? "Hotel",
    image: undefined,
  };
  const hotelName = hotel.name || review.customer?.name || "Hotel";
  const hotelInitial = hotelName.charAt(0).toUpperCase();
  const hotelFeedback = review.hotelFeedback;

  return (
    <Card className="h-full w-full overflow-hidden border-border/70 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-4 p-4 sm:p-5 lg:p-6">
        {/* Hotel Information */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0 ring-2 ring-border/60 sm:h-12 sm:w-12">
            {review.hotel.image && (
              <AvatarImage
                src={review.hotel.image}
                alt={review.hotel.name}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {review.hotel.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold tracking-tight sm:text-base">
              {review.hotel.name}
            </h3>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Reviewed on{" "}
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div
          className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index < review.rating;

            return (
              <Star
                key={index}
                className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/35"
                }`}
              />
            );
          })}

          <span className="ml-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            {review.rating}/5
          </span>
        </div>

        {/* Review Comment */}
        <div className="flex-1">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            My Review
          </p>

          <p className="wrap-break-words text-sm leading-6 text-foreground/85">
            {review.comment}
          </p>
        </div>

        {/* Hotel Feedback */}
        {hotelFeedback && (
          <div className="mt-auto rounded-xl border border-primary/15 bg-linear-to-br from-primary/5 via-muted/40 to-transparent p-3 sm:p-4">
            <div className="mb-2.5 flex min-w-0 items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquareReply className="size-3.5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  Feedback from {review.hotel.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {new Date(hotelFeedback.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>

            <p className="wrap-break-words border-l-2 border-primary/25 pl-3 text-sm leading-6 text-foreground/80">
              {hotelFeedback.comment}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
