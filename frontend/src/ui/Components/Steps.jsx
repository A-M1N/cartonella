import styles from "../Components/Steps.module.css";
import { FaCheck } from "react-icons/fa";

export default function Steps({ step }) {
  return (
    <div className={styles.stepsContainer}>
      <div className={`${styles.line}  ${step < 2 ? `${styles.active}` : ""}`}>
        <div
          className={`${styles.circle}  ${
            step < 2 ? `${styles.activeCircle}` : ""
          }`}
        >
          {step < 2 ? <FaCheck /> : "1"}
        </div>
      </div>

      <div className={`${styles.line}  ${step > 1 ? `${styles.active}` : ""}`}>
        <div
          className={`${styles.circle}  ${
            step > 1 ? `${styles.activeCircle}` : ""
          }`}
        >
          {step > 1 ? <FaCheck /> : "2"}
        </div>
      </div>
      <div className={styles.paragraphContainer}>
        <p
          className={` ${
            step < 2 ? `${styles.activeParagraph}` : `${styles.paragraph}`
          }`}
        >
          Shipping
        </p>
        <p
          className={` ${
            step > 1 ? `${styles.activeParagraph}` : `${styles.paragraph}`
          }`}
        >
          Review & Payments
        </p>
      </div>
    </div>
  );
}
