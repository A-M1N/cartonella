import { useRouteError, Link } from "react-router-dom";
import styles from "../pages/ErrorPage.module.css";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Something Went Wrong</h1>
      <p className={styles.paragraph}>
        {error?.statusText ||
          error?.message ||
          "Your visited page not found. You may go home page."}
      </p>
      <Link to="/" className={styles.homeBtn}>
        Back to home page
      </Link>
    </div>
  );
}
