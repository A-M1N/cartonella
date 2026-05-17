import ps5 from "../../../data/ps5.svg";
import woman from "../../../data/woman.svg";
import perfume from "../../../data/perfume.svg";
import speakers from "../../../data/speakers.svg";
import styles from "../Home/NewArrival.module.css";
import SectionIntro from "../../Components/SectionIntro";

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
            <a href="/products?category=playstation" className={styles.shopNow}>
              Shop Now
            </a>
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
              <a
                href="/products?category=womens-clothing"
                className={styles.shopNow}
              >
                Shop Now
              </a>
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
                <a
                  href="/products?category=speakers"
                  className={styles.shopNow}
                >
                  Shop Now
                </a>
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
                <a
                  href="/products?category=perfumes"
                  className={styles.shopNow}
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
