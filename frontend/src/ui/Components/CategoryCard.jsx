import styles from "./CategoryCard.module.css";
import { Link } from "react-router";
export default function CategoryCard({ Logo, title, link }) {
  return (
    <Link to={link}>
      <div className={styles.cardContainer}>
        <div className={styles.imgWrapper}>
          <Logo className={styles.svg} />
        </div>
        <h6 className={styles.title}>{title}</h6>
      </div>
    </Link>
  );
}
