import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../../store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CartOrderSummary.module.css";
import visa from "../../../data/visa.svg";
import mastercard from "../../../data/mastercard.svg";
import paypal from "../../../data/paypal.svg";
import { BiSolidLockAlt } from "react-icons/bi";
import formatPrice from "../../../utils/formatPrice";

export default function CartOrderSummary() {
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const subTotal = useSelector(selectCartTotalPrice);

  const shippingFee = subTotal > 100 ? 0 : 10;
  const tax = subTotal * 0.1;
  const total = subTotal + shippingFee + tax;

  return (
    <aside>
      <div className={styles.summaryContainer}>
        <h5 className={styles.heading}>Order Summary</h5>

        <div className={styles.row}>
          <span className={styles.label}>
            Subtotal ({cartItems.length} items)
          </span>
          <span className={styles.label}>{formatPrice(subTotal)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Shipping Fees</span>
          <span className={styles.label}>
            {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Tax (10%)</span>
          <span className={styles.label}>{formatPrice(tax)}</span>
        </div>

        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.total}>Total</span>
          <span className={styles.total}>{formatPrice(total)}</span>
        </div>

        <button
          className={styles.btnMain}
          onClick={() => navigate("/checkout")}
          disabled={!cartItems.length}
        >
          Proceed To Checkout
        </button>
        <button className={styles.btnSec}>
          <Link to="/products">Continue Shopping</Link>
        </button>

        <p className={styles.paragraph}>
          {shippingFee === 0
            ? "Free Shipping Applied! Tax Included"
            : `Free shipping on orders over $100. Tax included.`}
        </p>
      </div>
      <div className={styles.secureWrapper}>
        <div className={styles.secureContainer}>
          <BiSolidLockAlt className={styles.secureIcon} />
          <span className={styles.secureLabel}>Secured Payment with</span>
        </div>
        <div className={styles.paymentIcons}>
          <img src={paypal} alt="PayPal" />
          <img src={mastercard} alt="Mastercard" />
          <img src={visa} alt="Visa" />
        </div>
      </div>
    </aside>
  );
}
