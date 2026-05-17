import styles from "../Components/ColorSelector.module.css";

const DEFAULT_COLORS = ["black", "blue", "red", "white", "green", "yellow"];

export default function ColorSelector({
  colors = DEFAULT_COLORS,
  value,
  onChange,
  title,
}) {
  const handleColorClick = (color) => {
    // If clicking the same color, deselect it
    if (value === color) {
      onChange(null);
    } else {
      onChange(color);
    }
  };

  return (
    <div className={styles.colorsContainer}>
      {title && <span className={styles.labelTitle}>{title}</span>}
      <div className={styles.colors}>
        {colors.map((color) => (
          <div
            key={color}
            className={`${styles.colorOption} ${
              value === color ? styles.selected : ""
            }`}
            onClick={() => handleColorClick(color)}
          >
            <span
              className={styles.colorCircle}
              style={{ backgroundColor: color }}
              title={color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
