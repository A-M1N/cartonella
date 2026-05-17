import styles from "./AboutSection.module.css";

function AboutSection({ title, text, image, bg = "white", reverse = false }) {
  return (
    <section
      className={`${styles.section} ${
        bg === "black" ? styles.black : styles.white
      }`}
    >
      <div className={`${styles.content} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.text}>
          <h2 className={styles.heading}>{title}</h2>
          <p className={styles.subheading}>{text}</p>
        </div>

        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
