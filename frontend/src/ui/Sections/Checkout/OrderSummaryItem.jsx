import styles from "../Checkout/OrderSummaryItem.module.css";
import formatPrice from "../../../utils/formatPrice";

export default function OrderSummaryItem({ item }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={item.image} className={styles.img} alt={item.name} />
      </div>
      <div className={styles.itemContent}>
        <p className={styles.title}>{item.name}</p>
        <div className={styles.row}>
          <p className={styles.qty}>Qty {item.quantity}</p>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
      </div>
    </div>
  );
}
