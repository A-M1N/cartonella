import styles from "../Components/BrandCard.module.css";
import { Link } from "react-router-dom";

export default function BrandCard({ Logo, link, alt, hoverColor, color }) {
  return (
    <Link
      to={link}
      className={styles.brandCard}
      style={{ "--hover-color": hoverColor, "--brand-color": color }}
      aria-label={alt}
    >
      <div className={styles.svgWrapper}>
        <Logo className={styles.svg} />
      </div>
    </Link>
  );
}
