import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../store/slices/cartSlice";
import styles from "../Cart/CartItem.module.css";
import { IoTrashOutline } from "react-icons/io5";
import { useCartActions } from "../../../hooks/useCartActions";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartActions();

  const total = item.price * item.quantity;

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.itemInfo}>
        <div className={styles.imgWrapper}>
          <img src={item.image} className={styles.img} alt={item.name} />
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{item.name}</h3>
          <span className={styles.mobilePrice}>${item.price}</span>
        </div>
      </div>

      <div className={styles.detailsRow}>
        <div className={styles.priceWrapper}>
          <span className={styles.priceLabel}>Price</span>
          <span className={styles.price}>${item.price}</span>
        </div>

        <div className={styles.qtyWrapper}>
          <span className={styles.qtyLabel}>Qty</span>
          <div className={styles.qtyController}>
            <div className={styles.btnsContainer}>
              <button
                className={styles.qtyBtn}
                onClick={() => increaseQuantity(item.id)}
                aria-label="Increase quantity"
              >
                +
              </button>
              <button
                className={styles.qtyBtn}
                onClick={() => decreaseQuantity(item.id)}
                aria-label="Decrease quantity"
              >
                -
              </button>
            </div>
            <div className={styles.qtyNumber}>{item.quantity}</div>
          </div>
        </div>

        <div className={styles.totalWrapper}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.price}>${total}</span>
        </div>

        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(item.id, item.name)}
          aria-label="Remove item"
        >
          <IoTrashOutline className={styles.removeIcon} />
        </button>
      </div>
    </div>
  );
}
