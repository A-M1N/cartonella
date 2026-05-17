import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductReviews,
  useCanReview,
  useCreateReview,
} from "../../../hooks/useReviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import styles from "../Product/CustomerReviews.module.css";
import CustomerReviewCard from "./CustomerReviewCard";
import RatingBar from "../../Components/RatingBar";
import StarRating from "../../Components/StarRating";
import ReviewModal from "./ReviewModal";

export default function CustomerReviews({ productId }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token && !!user;

  const { data: reviewsData, isLoading } = useProductReviews(productId, {
    sort: sortBy,
  });

  const { data: canReviewData, isLoading: canReviewLoading } = useCanReview(
    productId,
    isAuthenticated,
  );

  const createReviewMutation = useCreateReview(productId);

  const stats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  };

  const reviews = reviewsData?.reviews || [];

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast.error("Please Login to write a review");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (!canReviewData?.canReview) {
      if (canReviewData?.reason === "already_reviewed") {
        toast.error("You have already reviewed this product");
      } else {
        toast.error(
          "You can only review products you have purchased and received",
        );
      }
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitReview = async (reviewData) => {
    await createReviewMutation.mutateAsync(reviewData);
    setIsModalOpen(false);
  };

  // Calculate percentages for rating bars
  const getPercentage = (ratingValue) => {
    if (stats.totalReviews === 0) return 0;
    return (stats.ratingDistribution[ratingValue] / stats.totalReviews) * 100;
  };

  const getButtonState = () => {
    if (!isAuthenticated) {
      return { disabled: false, text: "Login to Review" };
    }
    if (canReviewLoading) {
      return { disabled: true, text: "Checking..." };
    }
    if (canReviewData?.reason === "already_reviewed") {
      return { disabled: true, text: "Already Reviewed" };
    }
    if (canReviewData?.reason === "not_purchased") {
      return { disabled: true, text: "Purchase to Review" };
    }
    if (canReviewData?.canReview) {
      return { disabled: false, text: "Write a Review" };
    }
    return { disabled: true, text: "Cannot Review" };
  };

  const buttonState = getButtonState();

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Customers Reviews</h3>
      <p className={styles.paragraph}>
        See what our customers are saying about this product
      </p>

      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h3 className={styles.title}>Customer Reviews</h3>

          <div className={styles.row}>
            <span className={styles.rating}>
              {stats.averageRating.toFixed(1)}
            </span>
            <StarRating
              defaultValue={Math.round(stats.averageRating)}
              size={18}
              readOnly={true}
            />
          </div>

          <span className={styles.totalReviews}>
            Based on {stats.totalReviews}{" "}
            {stats.totalReviews === 1 ? "review" : "reviews"}
          </span>

          <div className={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((ratingValue) => (
              <RatingBar
                key={ratingValue}
                rating={ratingValue}
                percentage={getPercentage(ratingValue)}
                count={stats.ratingDistribution[ratingValue] || 0}
              />
            ))}
          </div>

          <div className={styles.ctaSection}>
            <p className={styles.valueParagraph}>We Value Your Opinion</p>
            <p className={styles.reviewParagraph}>
              {!isAuthenticated
                ? "Login to write a review for this product"
                : canReviewData?.canReview
                  ? "You purchased this item. Share your thoughts!"
                  : canReviewData?.reason === "already_reviewed"
                    ? "You have already reviewed this product"
                    : "Purchase and receive this item to write a review"}
            </p>
            <button
              className={`${styles.btnReview} ${buttonState.disabled ? styles.btnDisabled : ""}`}
              onClick={handleWriteReview}
              disabled={buttonState.disabled && isAuthenticated}
            >
              {buttonState.text}
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          {reviews.length > 0 && (
            <div className={styles.sortContainer}>
              <label htmlFor="sort-reviews" className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                id="sort-reviews"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          )}

          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p className={styles.noReviewsTitle}>No Reviews Yet</p>
              <p className={styles.noReviewsText}>
                Be the first to share your experience with this product!
              </p>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <CustomerReviewCard
                  key={review.id}
                  review={review}
                  isOwner={user?.id === review.userId}
                  productId={productId}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        isSubmitting={createReviewMutation.isPending}
      />
    </section>
  );
}
