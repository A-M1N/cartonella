import styles from "../Product/ProductDetailSkeleton.module.css";

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.thumbnails}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.thumbnailSkeleton} />
            ))}
          </div>
          <div className={styles.mainImageSkeleton} />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.titleSkeleton} />
          <div className={styles.ratingSkeleton} />
          <div className={styles.priceSkeleton} />
          <div className={styles.descriptionSkeleton} />
          <div className={styles.descriptionSkeleton} />
          <div className={styles.buttonSkeleton} />
        </div>
      </div>
    </div>
  );
}
