import styles from "../Components/FeatureCard.module.css";
export default function FeatureCard({
  title,
  icon,
  description,
  variant = "default",
}) {
  const isProduct = variant === "product";
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <div
        className={`${styles.iconContainer} ${
          isProduct ? styles.productIcon : styles.defaultIcon
        }`}
      >
        <img src={icon} className={styles.icon} alt={title} />
      </div>
      <div className={styles.paragraphsContainer}>
        <p
          className={`${isProduct ? styles.productTitle : styles.defaultTitle}`}
        >
          {title}
        </p>
        <p
          className={`${
            isProduct ? styles.productDescription : styles.defaultDescription
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
