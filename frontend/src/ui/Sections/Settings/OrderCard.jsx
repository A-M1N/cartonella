import { Link } from "react-router-dom";
import styles from "../Settings/OrderCard.module.css";
export const API_URL = "http://localhost:5000";

export default function OrderCard({
  items,
  amount,
  status,
  id,
  orderID,
  date,
}) {
  // Convert status to CSS class name
  const getStatusClass = (status) => {
    const statusMap = {
      Confirmed: "confirmed",
      Delivered: "delivered",
      Cancelled: "cancelled",
    };
    return statusMap[status] || "pending";
  };

  return (
    <div className={styles.orderItemsContainer}>
      {/* Order Header Row */}
      <div className={styles.row}>
        <div className={styles.column}>
          <h3 className={styles.columnHeader}>Order ID</h3>
          <p className={styles.columnValue}>#{orderID}</p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeader}>Date Of Placement</h3>
          <p className={styles.columnValue}>{date}</p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeader}>Amount</h3>
          <p className={styles.columnValue}>{amount}</p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnHeader}>Status</h3>
          <p
            className={`${styles.orderStatus} ${styles[getStatusClass(status)]}`}
          >
            {status}
          </p>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.viewLink} to={`/settings/orders/${id}`}>
            View Order Details
          </Link>
        </div>
      </div>

      {/* Items Table Header */}
      <div className={styles.labelsHeader}>
        <span className={styles.label}>Item</span>
        <span className={styles.label}>Price</span>
        <span className={styles.label}>Qty</span>
        <span className={styles.label}>Subtotal</span>
      </div>

      {/* Items List */}
      <div className={styles.itemsList}>
        {items.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.itemInfo}>
              <div className={styles.imgWrapper}>
                <img src={item.img} className={styles.img} alt={item.name} />
              </div>
              <p className={styles.itemName}>{item.name}</p>
            </div>
            <div className={styles.itemCell}>
              <span className={styles.mobileLabel}>Price:</span>
              <p className={styles.itemPrice}>{item.price}</p>
            </div>
            <div className={styles.itemCell}>
              <span className={styles.mobileLabel}>Qty:</span>
              <p className={styles.itemQty}>{item.qty}</p>
            </div>
            <div className={styles.itemCell}>
              <span className={styles.mobileLabel}>Subtotal:</span>
              <p className={styles.itemSubtotal}>
                $
                {(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(
                  2,
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
