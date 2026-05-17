import styles from "../pages/WishlistPage.module.css";
import laptop from "../data/lists-icons/Asus.jpg";
import laptop2 from "../data/lists-icons/lenovo.jpeg";
import laptop3 from "../data/lists-icons/msi.png";

import CardItem from "../ui/Components/CardItem";
import SectionIntro from "../ui/Components/SectionIntro";

import { useDispatch, useSelector } from "react-redux";
import {
  selectWishlistCount,
  selectWishlistItems,
} from "../store/slices/wishlistSlice";

import { useMoveWishlistToCart } from "../hooks/useMoveWishlistToCart";
import RelatedItems from "../ui/Components/RelatedItems";

function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems) || [];
  const itemsCount = items.length;

  const { moveAllToCart } = useMoveWishlistToCart();

  const baseItem = items[0];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <SectionIntro title={`Wishlist (${itemsCount})`} />
          {items.length > 0 && (
            <button className={styles.btn} onClick={moveAllToCart}>
              Move All To Cart
            </button>
          )}
        </div>
        <div className={styles.cardsContainer}>
          {items.length === 0 && <p>Your Wishlist Is empty</p>}
          {items.map((item) => (
            <CardItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.name}
              price={item.price}
              labelTitle={item.labelTitle}
              labelColor={item.labelColor}
              rating={item.rating}
              reviewCount={item.reviewCount}
              categorySlug={item.categorySlug}
              categoryId={item.categoryId}
              mode="wishlist"
            />
          ))}
        </div>
        {items.length > 0 && (
          <>
            <div className={styles.headerRow}>
              {baseItem?.categorySlug && (
                <RelatedItems
                  categorySlug={baseItem.categorySlug}
                  currentProductId={baseItem.id}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default WishlistPage;
