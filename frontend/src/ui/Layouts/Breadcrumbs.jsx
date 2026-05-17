import styles from "../Layouts/Breadcrumbs.module.css";
import { Link, useMatches } from "react-router-dom";
import ArrowIcon from "../Components/Logos/icons/ArrowIcon";

export default function BreadCrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => ({
      label: match.handle.crumb(match.data),
      path: match.pathname,
    }));

  if (crumbs.length <= 1) return null;

  return (
    <nav className={styles.breadcrumbsContainer}>
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className={styles.listItem}>
              {isLast ? (
                <span className={styles.lastLabel}>{crumb.label}</span>
              ) : (
                <>
                  <Link className={styles.label} to={crumb.path}>
                    {crumb.label}
                  </Link>
                  <ArrowIcon className={styles.arrow} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
