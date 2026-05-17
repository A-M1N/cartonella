import styles from "../Product/CustomerReviewCard.module.css";
import StarRating from "../../Components/StarRating";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useDeleteReview, useUpdateReview } from "../../../hooks/useReviews";
import EditReviewModal from "./EditReviewModal";

// Default avatar if user doesn't have one
const DEFAULT_AVATAR =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

export default function CustomerReviewCard({ review, isOwner, productId }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteReviewMutation = useDeleteReview(productId);
  const updateReviewMutation = useUpdateReview(productId);

  const handleDelete = async () => {
    await deleteReviewMutation.mutateAsync(review.id);
    setShowDeleteConfirm(false);
  };

  const handleUpdate = async (updatedData) => {
    await updateReviewMutation.mutateAsync({
      reviewId: review.id,
      data: updatedData,
    });
    setShowEditModal(false);
  };

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.layoutProfile}>
          <div className={styles.imgWrapper}>
            <img
              src={review.user?.avatar || DEFAULT_AVATAR}
              className={styles.iconProfile}
              alt={review.user?.name || "User"}
            />
          </div>
          <div className={styles.verticalInfo}>
            <p className={styles.name}>{review.user?.name || "Anonymous"}</p>
            {review.isVerifiedPurchase && (
              <span className={styles.verifiedBadge}>
                <FaCheckCircle size={12} />
                Verified Purchase
              </span>
            )}
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>

        {isOwner && (
          <div className={styles.actionButtons}>
            <button
              className={styles.editBtn}
              title="Edit review"
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit size={14} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => setShowDeleteConfirm(true)}
              title="Delete review"
            >
              <FaTrash size={14} />
            </button>
          </div>
        )}
        <div className={styles.ratingContainer}>
          <StarRating defaultValue={review.rating} size="14" readOnly={true} />
          {review.title && (
            <span className={styles.reviewTitle}>{review.title}</span>
          )}
        </div>
        <p className={styles.review}>{review.comment}</p>
        {showDeleteConfirm && (
          <div className={styles.deleteConfirm}>
            <p>Are you sure you want to delete this review?</p>
            <div className={styles.confirmButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={handleDelete}
                disabled={deleteReviewMutation.isPending}
              >
                {deleteReviewMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
      <EditReviewModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdate}
        isSubmitting={updateReviewMutation.isPending}
        initialData={{
          rating: review.rating,
          title: review.title || "",
          comment: review.comment,
        }}
      />
    </>
  );
}
