import { ReviewEmptyState } from "@/components/modules/Review/ReviewEmptyState";
import UserReviewCard from "@/components/user/userReviewCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { getMyReviews } from "@/Server/User/user.reviewmanagement";

export const metadata = {
  title: "Reviews",
};

const myReviews = async () => {
  const reviewsResponse = await getMyReviews();
  const reviews = reviewsResponse.data ?? [];

  return (
    <Motion
      animationType="fadeUp"
      delay={0.1}
      duration={0.5}
      className="space-y-6 px-4 sm:px-6 py-6 sm:py-10"
    >
      <Motion animationType="fadeUp" delay={0.15} duration={0.5}>
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            My Reviews
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Feedback you left for hotels, and their responses
          </p>
        </div>
      </Motion>

      {reviews.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <Motion
              key={review.id}
              animationType="card"
              custom={index}
              className="h-full"
            >
              <UserReviewCard review={review} />
            </Motion>
          ))}
        </section>
      ) : (
        <ReviewEmptyState />
      )}
    </Motion>
  );
};

export default myReviews;
