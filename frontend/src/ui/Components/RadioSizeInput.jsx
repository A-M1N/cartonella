import styles from "../Components/RadioSizeInput.module.css";

export default function RadioSizeInput({ selectedSize, onChange }) {
  const sizes = ["XS", "S", "M", "L", "XL"];
  return (
    <div className={styles.container}>
      <p className={styles.labelTitle}>Size :</p>
      {sizes.map((size) => (
        <label key={size} className={styles.sizeOption}>
          <input
            type="radio"
            checked={selectedSize === size}
            className={styles.input}
            onChange={() => onChange(size)}
          />
          <span className={styles.sizeSquare}>{size}</span>
        </label>
      ))}
    </div>
  );
}
