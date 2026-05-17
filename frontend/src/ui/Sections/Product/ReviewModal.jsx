import { useState } from "react";
import styles from "../Product/ReviewModal.module.css";
import toast from "react-hot-toast";
import StarRating from "../../Components/StarRating";

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    onSubmit({ rating, title: title.trim() || null, comment: comment.trim() });
  };

  const handleClose = () => {
    setRating(0);
    setTitle("");
    setComment("");
    onClose();
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose} type="button">
          ×
        </button>

        <h2 className={styles.title}>Write a Review</h2>
        <p className={styles.subtitle}>
          Share your experience with this product
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Your Rating *</label>
            <div className={styles.ratingInput}>
              <StarRating
                defaultValue={rating}
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
            <label className={styles.label}>Review Title (Optional)</label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your review"
              className={styles.input}
              maxLength={100}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Your Review *</label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think about this product..."
              className={styles.textarea}
              rows={5}
              maxLength={1000}
            />
            <span className={styles.charCount}>{comment.length}/1000</span>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleClose}
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
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
