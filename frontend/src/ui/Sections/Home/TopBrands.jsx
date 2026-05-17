import styles from "../Home/TopBrands.module.css";
import BrandCard from "../../Components/BrandCard";
import { brands } from "../../../data/brands/brands";
export default function TopBrands() {
  return (
    <section className={styles.topBrandsSection}>
      <div className={styles.container}>
        <h3 className={styles.titleTop}>Top Brands</h3>
        <p className={styles.paragraph}>
          Browse the biggest names in gaming, electronics, and accessories from
          PlayStation and Nintendo to Meta and Xbox. Discover trusted brands
          shaping the future of play.
        </p>
        <div className={styles.row}>
          {brands.map((brand) => (
            <BrandCard
              key={brand.name}
              Logo={brand.Logo}
              link={brand.link}
              alt={brand.name}
              hoverColor={brand.hoverColor}
              color={brand.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
