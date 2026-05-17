import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./Spinner.module.css";

export default function Spinner({ size = 40, className = "" }) {
  return (
    <span
      className={`${styles.spinner} ${className}`}
      style={{ fontSize: size }}
      role="status"
      aria-label="Loading"
    >
      <AiOutlineLoading3Quarters />
    </span>
  );
}
