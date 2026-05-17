import { useSelector } from "react-redux";
import { selectCartItems } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

import styles from "../pages/CartPage.module.css";
import CartHeader from "../ui/Sections/Cart/CartHeader";
import CartItem from "../ui/Sections/Cart/CartItem";
import SectionIntro from "../ui/Components/SectionIntro";
import CartOrderSummary from "../ui/Sections/Cart/CartOrderSummary";

function CartPage() {
  const cartItems = useSelector(selectCartItems);
  if (cartItems.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionIntro title="My Cart" />
          <div className={styles.emptyCart}>
            <p className={styles.emptyText}>Your cart is empty</p>
            <Link to="/products" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionIntro title="My Cart" />
        <div className={styles.cartContainer}>
          <div className={styles.cartItemsWrapper}>
            <CartHeader />
            <div className={styles.cartItemsList}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className={styles.orderSummaryWrapper}>
            <CartOrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
