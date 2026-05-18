import ps5 from "../../../data/ps5.svg";
import woman from "../../../data/woman.svg";
import perfume from "../../../data/perfume.svg";
import speakers from "../../../data/speakers.svg";
import styles from "../Home/NewArrival.module.css";
import SectionIntro from "../../Components/SectionIntro";
import { Link } from "react-router";

export default function NewArrival() {
  return (
    <section className={styles.newArrivalContainer}>
      <SectionIntro title="Featured" intro="New Arrival" />

      <div className={styles.layoutImgs}>
        <div className={styles.psContainer}>
          <img
            className={styles.psContainerImg}
            src={ps5}
            alt="PlayStation 5"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>PlayStation 5</h4>
            <p className={styles.cardParagraph}>
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              className={styles.shopNow}
              to="/products?category=pc-components"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className={styles.verticalContainer}>
          <div className={styles.womanContainer}>
            <img
              className={styles.womanContainerImg}
              src={woman}
              alt="Women's Collection"
            />
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>Women's Collection</h4>
              <p className={styles.cardParagraph}>
                Featured woman collections that give you another vibe.
              </p>
              <Link
                className={styles.shopNow}
                to="/products?category=womens-clothing"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.speakersContainer}>
              <img
                className={styles.speakersContainerImg}
                src={speakers}
                alt="Speakers"
              />
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>Speakers</h4>
                <p className={styles.cardParagraph}>Amazon wireless speakers</p>
                <Link
                  className={styles.shopNow}
                  to="/products?category=pc-headset"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className={styles.perfumeContainer}>
              <img
                className={styles.perfumeContainerImg}
                src={perfume}
                alt="Perfume"
              />
              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>Perfumes</h4>
                <p className={styles.cardParagraph}>GUCCI INTENSE OUD EDP</p>
                <Link
                  className={styles.shopNow}
                  to="/products?category=perfumes"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
