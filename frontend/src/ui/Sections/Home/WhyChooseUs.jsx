import styles from "./WhyChooseUs.module.css";
import moneySaving from "../../../data/money1.svg";
import customerService from "../../../data/customerservice.svg";
import delivery from "../../../data/icon-delivery.svg";
import secure from "../../../data/secure.svg";
import FeatureCard from "../../Components/FeatureCard";
import arcraiders from "../../../data/arcraiders.jpg";
import layoutclothes from "../../../data/1234.jpg";
import tv from "../../../data/tv.jpg";
import layoutrazer from "../../../data/pop.png";
export default function WhyChooseUs() {
  return (
    <section className={styles.whyChooseUsSection}>
      <div className={styles.layoutImagesContainer}>
        <div className={styles.imagesWrapper}>
          <div className={styles.row}>
            <div className={styles.img1Container}>
              <img className={styles.image} src={tv} />
            </div>
            <div className={styles.img2Container}>
              <img className={styles.image} src={layoutclothes} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.img3Container}>
              <img src={arcraiders} className={styles.image} />
            </div>
            <div className={styles.img4Container}>
              <img src={layoutrazer} className={styles.image} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionSection}>
        <h2 className={styles.paragraphChooseUs}>
          Why Choose <span className={styles.usWord}>Us</span>
        </h2>
        <p className={styles.descriptionParagraph}>
          Explore the benefits we offer—designed to save you time, boost your
          experience, and deliver real value every step of the way.
        </p>
        <div className={styles.cardsContainer}>
          <FeatureCard
            title="Money Saving"
            icon={moneySaving}
            description="Get the best value for your money with frequent promotions, discounts"
          />
          <FeatureCard
            title="24/7 Customer Service"
            icon={customerService}
            description="Friendly 24/7 customer support"
          />
          <FeatureCard
            title="Free And Fast Delivery"
            icon={delivery}
            description="Free delivery for all orders over $140"
          />
          <FeatureCard
            title="Secure Payment"
            icon={secure}
            description="100% Secure Payment Method"
          />
        </div>
      </div>
    </section>
  );
}
