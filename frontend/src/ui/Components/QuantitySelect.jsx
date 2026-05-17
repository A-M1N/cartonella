import styles from "../Components/QuantitySelect.module.css";

export default function QuantitySelect({ value, onChange, max }) {
  const handleMinusQty = () => {
    if (value === 1) return;
    onChange((value) => value - 1);
  };
  const handlePlusQty = (value) => {
    if (value === 10) {
      return;
    }
    onChange((value) => value + 1);
  };
  return (
    <div className={styles.qtyRow}>
      <button className={styles.minusBtn} onClick={handleMinusQty}>
        -
      </button>
      <div className={styles.qtyNumber}>{value}</div>
      <button className={styles.plusBtn} onClick={handlePlusQty}>
        +
      </button>
    </div>
  );
}
