import { useState } from "react";
import styles from "../Components/Accordion.module.css";
import ArrowDown from "./ArrowDown";
import ArrowRight from "./ArrowRight";
export default function Accordion({ defaultOpen, title, features }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.accordion}>
      <button
        className={styles.titleBtn}
        onClick={() => setOpen((open) => !open)}
      >
        <span>{title}</span>
        <span className={styles.iconWrapper}>
          {open ? <ArrowDown /> : <ArrowRight />}
        </span>
      </button>
      {open && (
        <ul className={styles.content}>
          {features.map((feature, index) => (
            <li className={styles.contentItem} key={index}>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
