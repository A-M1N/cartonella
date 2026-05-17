import styles from "../Components/Label.module.css";
export default function Label({ title, color }) {
  return (
    <span className={styles.label} style={{ backgroundColor: color }}>
      {title}
    </span>
  );
}
