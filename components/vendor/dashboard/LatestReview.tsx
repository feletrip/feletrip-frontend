import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Button } from "@/components/ui/button";
import { getVendorLatestReview } from "@/Server/Vendor/dashboard.action";
import { VendorLatestReview } from "@/types/vendor/dashboard";
import {
  Star,
  MessageSquareQuote,
  UserRound,
  Hotel,
  CalendarDays,
  Sparkles,
  MessageCircleQuestionMark,
  Smile,
} from "lucide-react";

const LatestReview = async () => {
  const reviewRes = await getVendorLatestReview();
  const latestReviews = reviewRes?.data ?? [];

  // const demoReviews = [
  //   {
  //     id: "review-001",
  //     rating: 5,
  //     comment:
  //       "Absolutely amazing experience. The room was clean, the staff was friendly, and the view was breathtaking.",
  //     createdAt: "2026-07-21T16:04:24.921Z",
  //     customerName: "John Doe",
  //     hotelName: "Sea View Resort",
  //   },
  //   {
  //     id: "review-002",
  //     rating: 4,
  //     comment:
  //       "Very comfortable stay with excellent service. The breakfast options could be improved, but overall a great experience.",
  //     createdAt: "2026-07-20T10:25:18.421Z",
  //     customerName: "Sarah Williams",
  //     hotelName: "Mountain Paradise Hotel",
  //   },
  //   {
  //     id: "review-003",
  //     rating: 5,
  //     comment:
  //       "One of the best stays I have ever had. The location, hospitality, and room quality were outstanding.",
  //     createdAt: "2026-07-18T14:42:09.112Z",
  //     customerName: "Michael Smith",
  //     hotelName: "Royal Garden Suites",
  //   },
  //   {
  //     id: "review-004",
  //     rating: 3,
  //     comment:
  //       "The property was nice and the rooms were spacious. Service was average but acceptable.",
  //     createdAt: "2026-07-15T08:15:33.700Z",
  //     customerName: "Emma Johnson",
  //     hotelName: "Lake View Inn",
  //   },
  //   {
  //     id: "review-005",
  //     rating: 5,
  //     comment:
  //       "Fantastic hospitality! The team made our vacation memorable. Highly recommended for families.",
  //     createdAt: "2026-07-12T19:30:44.520Z",
  //     customerName: "David Brown",
  //     hotelName: "Ocean Breeze Resort",
  //   },
  //   {
  //     id: "review-006",
  //     rating: 6,
  //     comment:
  //       "Fantastic hospitality! The team made our vacation memorable. Highly recommended for families.",
  //     createdAt: "2026-07-12T19:30:44.520Z",
  //     customerName: "David Brown",
  //     hotelName: "Ocean Breeze Resort",
  //   },
  // ];

  return (
    <Motion animationType="slideDown" className="sticky top-[85px]">
      <section className="relative h-screen flex flex-col  overflow-hidden rounded-2xl border border-border bg-card p-5">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10" />

        {/* Outer Flex Container filling full available height */}
        <div className="relative flex flex-col overflow-hidden">
          {/* Header */}
          <div className="shrink-0">
            <Motion animationType="slideDown" delay={0.4}>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MessageSquareQuote size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Latest Reviews
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Recent guest experiences and feedback
                    </p>
                  </div>
                </div>

                <Sparkles className="text-primary" size={22} />
              </div>
            </Motion>
          </div>

          {/* Empty State */}
          {latestReviews.length === 0 && (
            <Motion animationType="fadeRight" delay={0.6}>
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border  bg-background px-6 py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/20 text-warning">
                  <MessageCircleQuestionMark size={28} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground/80">
                  No Latest Reviews
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Guest feedback will appear here after completed stays.
                </p>
              </div>
            </Motion>
          )}

          {/* Review List Section */}
          <div className="flex flex-col items-center space-y-4 overflow-y-auto scroll-smooth scrollbar-none ">
            {latestReviews.length > 0 && (
              <div id="reviewScrollBar" className="space-y-4">
                {latestReviews.map((review: VendorLatestReview, idx) => {
                  const formattedDate = new Date(
                    review.createdAt,
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <Motion
                      key={review.id}
                      animationType="slideDown"
                      delay={idx * 0.1}
                    >
                      <article className="group cursor-pointer rounded-2xl border border-border bg-linear-to-bl from-info/10 to-warning/10 p-5 transition-all duration-300 hover:shadow-lg">
                        {/* Customer Header */}
                        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 ">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <UserRound size={20} />
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground">
                                {review.customerName}
                              </h3>

                              <p className="text-xs text-muted-foreground">
                                Guest Review
                              </p>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1">
                            <Star
                              size={14}
                              className="fill-warning text-warning"
                            />

                            <span className="text-sm font-semibold text-warning">
                              {review.rating}
                            </span>
                          </div>
                        </div>

                        {/* Comment */}
                        <div className="mt-5 rounded-xl bg-muted p-4">
                          <p className="text-sm leading-relaxed text-foreground">
                            &quot;{review.comment}&quot;
                          </p>
                        </div>

                        {/* Footer Details */}
                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                          <div className="flex items-center gap-2">
                            <Hotel size={16} className="text-info" />

                            <span className="text-sm text-muted-foreground">
                              {review.hotelName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-success" />

                            <span className="text-sm text-muted-foreground">
                              {formattedDate}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Motion>
                  );
                })}
              </div>
            )}
            {latestReviews.length > 0 && (
              <div>
                <Motion animationType="slideDown" delay={0.3}>
                  <Button variant={"outline"}>
                    <span className="text-primary">
                      <Smile></Smile>
                    </span>{" "}
                    No More Review
                  </Button>
                </Motion>
              </div>
            )}
          </div>
        </div>
      </section>
    </Motion>
  );
};

export default LatestReview;
