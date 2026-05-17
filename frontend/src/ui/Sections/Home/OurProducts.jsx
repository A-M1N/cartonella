import styles from "../Home/OurProducts.module.css";
import CardItem from "../../Components/CardItem";
import SectionIntro from "../../Components/SectionIntro";
import { useProducts } from "../../../hooks/useProducts";
import { Link } from "react-router";

export default function OurProducts() {
  const { data, isLoading } = useProducts({ onSale: true, limit: 8 });

  const products = data?.products || [];

  return (
    <section className={styles.ourProductsContainer}>
      <SectionIntro title="Our Products" intro="Explore Our Products" />
      <div className={styles.row}>
        {products.map((product) => (
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
          />
        ))}
      </div>
      <Link to="/products">
        <button className={styles.viewAllBtn}>View All Products</button>
      </Link>
    </section>
  );
}
