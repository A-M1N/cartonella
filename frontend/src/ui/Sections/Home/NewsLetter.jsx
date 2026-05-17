import plane from "../../../data/plane.png";
import styles from "../Home/NewsLetter.module.css";
import { MdOutlineMail } from "react-icons/md";

export default function NewsLetter() {
  return (
    <section className={styles.newsLetterSection}>
      <div className={styles.newsLetterContainer}>
        <h3 className={styles.subscribeHeading}>
          <b>Subscribe</b> & Get <span className={styles.offer}>10% OFF</span>{" "}
          for the first order
        </h3>
        <img className={styles.bgNewsLetterImg} src={plane} alt="" />
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <MdOutlineMail className={styles.mailIcon} />
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className={styles.submitBtn}>
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
