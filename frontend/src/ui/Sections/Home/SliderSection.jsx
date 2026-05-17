import styles from "./SliderSection.module.css";
import Slider from "../../Components/Slider";
import { slides } from "../../../data/slides";

function SliderSection() {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sliderWrapper}>
        <Slider
          slides={slides}
          variant="hero"
          autoPlay={true}
          autoPlayInterval={3000}
        />
      </div>
    </section>
  );
}

export default SliderSection;
