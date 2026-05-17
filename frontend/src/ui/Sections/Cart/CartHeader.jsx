import styles from "../../../pages/CartPage.module.css";
export default function CartHeader() {
  return (
    <div className={styles.labelsHeader}>
      <span className={styles.label}>Item</span>
      <span className={styles.label}>Price</span>
      <span className={styles.label}>Qty</span>
      <span className={styles.label}>Total</span>
    </div>
  );
}
