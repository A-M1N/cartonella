import styles from "../Home/BestSelling.module.css";
import SectionIntro from "../../Components/SectionIntro";
import CardItem from "../../Components/CardItem";
import { useFeaturedProducts } from "../../../hooks/useProducts";
import { Link } from "react-router-dom";

export default function BestSelling() {
  const { data: products } = useFeaturedProducts();

  return (
    <section className={styles.container}>
      <SectionIntro title="This Month" intro="Best Selling Products">
        <Link to="/products">
          <button className={styles.btn}>View All</button>
        </Link>
      </SectionIntro>
      <div className={styles.row}>
        {products?.map((product) => (
          <CardItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            labelTitle={product.labelTitle}
            labelColor={product.labelColor}
            rating={product.rating}
            reviewCount={product.reviewCount}
            categorySlug={product.category?.slug}
            categoryId={product.categoryId}
          />
        ))}
      </div>
    </section>
  );
}
