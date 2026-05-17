import SectionIntro from "../../Components/SectionIntro";
import styles from "../Home/Categories.module.css";
import CategoryCard from "../../Components/CategoryCard";
import { icons } from "../../../data/icons/icons.js";

export default function Categories() {
  return (
    <section className={styles.container}>
      <SectionIntro
        title="Categories"
        intro="Browse By Category"
      ></SectionIntro>
      <div className={styles.row}>
        {icons.map((logo) => (
          <CategoryCard
            key={logo.title}
            Logo={logo.Logo}
            title={logo.title}
            link={logo.link}
          />
        ))}
      </div>
    </section>
  );
}
