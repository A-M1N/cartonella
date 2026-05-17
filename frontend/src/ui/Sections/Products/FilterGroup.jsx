import { useState } from "react";
import styles from "../Products/FilterGroup.module.css";
import ArrowRight from "../../Components/ArrowRight";
export default function FilterGroup({ title, children, defaultOpen = false }) {
  const [open] = useState(defaultOpen);
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <ArrowRight />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
