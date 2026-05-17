import styles from "../Components/RelatedItems.module.css";
import CardItem from "./CardItem";
import SectionIntro from "./SectionIntro";
import { useRelatedProducts } from "../../hooks/useRelatedProducts";
import { Link } from "react-router";

export default function RelatedItems({ categorySlug, currentProductId }) {
  const { data: products, isLoading } = useRelatedProducts(
    categorySlug,
    currentProductId,
    4,
  );
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <SectionIntro title="Related Items" />
        </div>
        <div className={styles.cardsContainer}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionIntro title="Related Items" />

        <Link to={`/products?category=${categorySlug}`}>
          <button className={styles.viewAll}>View All</button>
        </Link>
      </div>

      <div className={styles.cardsContainer}>
        {products.map((product) => (
          <CardItem
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price.toFixed(2)}
            oldPrice={product.oldPrice ? product.oldPrice.toFixed(2) : null}
            image={product.image}
            mode="default"
            rating={product.rating}
            reviewCount={product.reviewCount}
            labelColor={
              product.isNew ? "#00FF66" : product.onSale ? "#e53a13" : null
            }
            labelTitle={
              product.isNew
                ? "New"
                : product.onSale
                  ? `${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
                  : null
            }
          />
        ))}
      </div>
    </section>
  );
}
