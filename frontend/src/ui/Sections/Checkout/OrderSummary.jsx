import styles from "../Checkout/OrderSummary.module.css";
import OrderSummaryItem from "../Checkout/OrderSummaryItem";
import formatPrice from "../../../utils/formatPrice";
export default function OrderSummary({ cartItems = [], orderData = {} }) {
  const {
    subtotal = 0,
    shippingFee = 0,
    tax = 0,
    discount = 0,
    total = 0,
    totalQuantity = 0,
    appliedCoupon = null,
  } = orderData;

  const calculatedSubtotal =
    subtotal ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const calculatedQuantity =
    totalQuantity || cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.summaryContainer}>
      <h5 className={styles.heading}>Order Summary</h5>

      <p className={styles.paragraph}>{calculatedQuantity} Items in Cart</p>

      <div className={styles.itemsContainer}>
        {cartItems.map((item) => (
          <OrderSummaryItem key={item.id} item={item} />
        ))}
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>
            {formatPrice(calculatedSubtotal)}
          </span>
        </div>

        {appliedCoupon && discount > 0 && (
          <div className={styles.priceRow}>
            <div className={styles.discountInfo}>
              <span className={styles.label}>Discount</span>
              <span className={styles.couponBadge}>{appliedCoupon.code}</span>
            </div>
            <span className={styles.discountValue}>
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className={styles.priceRow}>
          <span className={styles.label}>Shipping</span>
          <span className={styles.value}>
            {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
          </span>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.label}>Tax (10%)</span>
          <span className={styles.value}>{formatPrice(tax)}</span>
        </div>

        <div className={`${styles.priceRow} ${styles.totalRow}`}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formatPrice(total)}</span>
        </div>

        {appliedCoupon && (
          <div className={styles.savingsNote}>
            🎉 You're saving {formatPrice(discount)} with coupon!
          </div>
        )}
      </div>
    </div>
  );
}
