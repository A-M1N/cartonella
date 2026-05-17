import styles from "../Components/RatingBar.module.css";
import Star from "./Star";

export default function RatingBar({ rating, percentage = 0, count = 0 }) {
  return (
    <div className={styles.ratingRow}>
      <div className={styles.ratingLabel}>
        <span className={styles.ratingNumber}>{rating}</span>
        <Star size={14} filled={true} readOnly={true} />
      </div>
      <div className={styles.barContainer}>
        <div className={styles.bar}>
          <div
            className={styles.fill}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
