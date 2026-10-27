"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllreviews, deleteReview } from "@/Server/Admin/Reviewmanagement";
import { AdminReview } from "@/types/admin/review";
import ReviewStatsCards from "./_components/ReviewStatsCards";
import ReviewSkeleton from "@/components/Reuseable/admin/reviewManagement/ReviewSkeleton";
import ReviewsTableAdmin from "@/components/Reuseable/admin/reviewManagement/ReviewsDataGrid";
import { toast } from "@/components/Reuseable/common/toast";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Star, TrendingUp, Award, Calendar } from "lucide-react";

export default function Reviews() {
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Helper for manual refetches (e.g., after deletion)
  const fetchReviews = useCallback(
    async (page: number = currentPage, limit: number = pageSize) => {
      try {
        setReviewsLoading(true);

        const res = await getAllreviews({ page, limit });

        const reviewsData = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data
            : [];

        const paginationData = res?.data?.pagination || res?.pagination || {};

        setReviews(reviewsData);
        setPagination({
          page: paginationData.page || page,
          limit: paginationData.limit || limit,
          total: paginationData.total || reviewsData.length,
          totalPages:
            paginationData.totalPages ||
            Math.ceil(reviewsData.length / limit) ||
            1,
        });
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        toast.error("Error", "Failed to load reviews.");
      } finally {
        setReviewsLoading(false);
      }
    },
    [currentPage, pageSize],
  );

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      // Set loading state inside the async microtask flow
      setReviewsLoading(true);

      try {
        const res = await getAllreviews({
          page: currentPage,
          limit: pageSize,
        });

        if (ignore) return;

        const reviewsData = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data
            : [];

        const paginationData = res?.data?.pagination || res?.pagination || {};

        setReviews(reviewsData);
        setPagination({
          page: paginationData.page || currentPage,
          limit: paginationData.limit || pageSize,
          total: paginationData.total || reviewsData.length,
          totalPages:
            paginationData.totalPages ||
            Math.ceil(reviewsData.length / pageSize) ||
            1,
        });
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch reviews:", err);
          toast.error("Error", "Failed to load reviews.");
        }
      } finally {
        if (!ignore) {
          setReviewsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [currentPage, pageSize]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      toast.loading("Deleting review...", "Please wait a moment");
      const res = await deleteReview(id);

      if (res?.success) {
        toast.success("Success", "Review deleted successfully.");
        fetchReviews(currentPage, pageSize);
      } else {
        toast.error(
          "Action Failed",
          res?.message || "Failed to delete review.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Error", "An unexpected error occurred while deleting.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Stats Calculations
  const totalReviews = pagination.total || reviews.length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        reviews.length
      : 0;
  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5,
  ).length;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentReviews = reviews.filter(
    (review) => review.createdAt && new Date(review.createdAt) >= thirtyDaysAgo,
  ).length;

  if (reviewsLoading && reviews.length === 0) {
    return <ReviewSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="relative">
          <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Reviews Management
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mt-2">
            Manage and monitor all customer reviews
          </p>
        </div>
      </div>

      {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Reviews"
            subtitle="Overall feedback"
            value={totalReviews}
            animationIndex={0}
            icon={Star}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-white"
          />

          <StatsCard
            title="Avg Rating"
            subtitle="Overall score"
            value={averageRating}
            animationIndex={1}
            icon={TrendingUp}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-white"
          />

          <StatsCard
            title="5-Star Reviews"
            subtitle="Top ratings"
            value={fiveStarReviews}
            animationIndex={2}
            icon={Award}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-white"
          />

          <StatsCard
            title="Recent (30Days)"
            subtitle="Last month"
            value={recentReviews}
            animationIndex={3}
            icon={Calendar}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-white"
          />
        </div>

      {/* Reviews Custom Responsive Table */}
      <ReviewsTableAdmin
        reviews={reviews}
        isPending={reviewsLoading}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        meta={pagination}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
}
