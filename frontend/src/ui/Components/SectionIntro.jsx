import styles from "../Components/SectionIntro.module.css";

export default function SectionIntro({ title, intro, children }) {
  return (
    <>
      <div className={styles.featuredContainer}>
        <span className={styles.decor}></span>
        <h3 className={styles.featuredTitle}>{title}</h3>
      </div>
      <div className={styles.container}>
        <h2 className={styles.newArrivalTitle}>{intro}</h2>
        {children && <div className={styles.action}>{children}</div>}
      </div>
    </>
  );
}
