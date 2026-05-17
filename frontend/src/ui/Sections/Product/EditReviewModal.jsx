import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import StarRating from "../../Components/StarRating";
import styles from "./ReviewModal.module.css";

export default function EditReviewModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  initialData,
}) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [title, setTitle] = useState(initialData?.title || "");
  const [comment, setComment] = useState(initialData?.comment || "");

  // Reset form when modal opens with new data
  useEffect(() => {
    if (isOpen && initialData) {
      setRating(initialData.rating);
      setTitle(initialData.title || "");
      setComment(initialData.comment);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    onSubmit({
      rating,
      title: title.trim() || null,
      comment: comment.trim(),
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          ×
        </button>

        <h2 className={styles.title}>Edit Your Review</h2>
        <p className={styles.subtitle}>
          Update your experience with this product
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Your Rating *</label>
            <div className={styles.ratingInput}>
              <StarRating
                rating={rating}
                size={32}
                readOnly={false}
                onRatingChange={setRating}
              />
              <span className={styles.ratingText}>
                {rating === 0 && "Select a rating"}
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-review-title">
              Review Title (Optional)
            </label>
            <input
              id="edit-review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your review in a few words"
              className={styles.input}
              maxLength={100}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-review-comment">
              Your Review *
            </label>
            <textarea
              id="edit-review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              className={styles.textarea}
              rows={5}
              maxLength={1000}
            />
            <div className={styles.charCount}>
              <span>{comment.length}</span>
              /1000 characters
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={
                isSubmitting || rating === 0 || comment.trim().length < 10
              }
            >
              {isSubmitting ? "Updating..." : "Update Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
