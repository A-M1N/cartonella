import { useParams, useLocation, Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrders";

import styles from "../pages/OrderConfirmationPage.module.css";
import formatPrice from "../utils/formatPrice";
import formatDate from "../utils/formatDate";
import getEstimatedDelivery from "../utils/getEstimatedDelivery";

import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiArrowRight, HiHome } from "react-icons/hi";

function OrderConfirmationPage() {
  const { orderId } = useParams();

  const location = useLocation();

  const {
    orderNumber: passedOrderNumber,
    paymentId,
    paymentMethod,
  } = location.state || {};

  const { data, isLoading, error, isError } = useOrder(orderId);
  const order = data?.order;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <AiOutlineLoading3Quarters className={styles.spinner} />
        <p>Loading order details...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Order Not Found</h2>
        <p>
          {error?.response?.data?.message || "Unable to load order details"}
        </p>
        <Link to="/" className={styles.homeLink}>
          <HiHome /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.successHeader}>
          <div className={styles.successIconWrapper}>
            <FaCheckCircle className={styles.successIcon} />
          </div>
          <h1>Order Confirmed!</h1>
          <p className={styles.thankYou}>
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className={styles.orderNumber}>
            Order Number: <strong>{order.orderNumber}</strong>
          </div>
        </div>

        <div className={styles.statusTimeline}>
          <div className={`${styles.statusStep} ${styles.completed}`}>
            <div className={styles.statusIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.statusInfo}>
              <span className={styles.statusTitle}>Order Placed</span>
              <span className={styles.statusDate}>
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
          <div className={styles.statusLine}></div>
          <div
            className={`${styles.statusStep} ${order.status === "CONFIRMED" ? styles.completed : ""}`}
          >
            <div className={styles.statusIcon}>
              <FaBox />
            </div>
            <div className={styles.statusInfo}>
              <span className={styles.statusTitle}>Processing</span>
              <span className={styles.statusDate}>
                We're preparing your order
              </span>
            </div>
          </div>
          <div className={styles.statusLine}></div>
          <div
            className={`${styles.statusStep} ${order.status === "SHIPPED" ? styles.completed : ""}`}
          >
            <div className={styles.statusIcon}>
              <FaTruck />
            </div>
            <div className={styles.statusInfo}>
              <span className={styles.statusTitle}>Shipping</span>
              <span className={styles.statusDate}>
                Est. delivery: {getEstimatedDelivery()}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <FaBox /> Order Items ({order.items.length})
              </h3>
              <div className={styles.itemsList}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                      <span className={styles.itemQty}>{item.quantity}</span>
                    </div>
                    <div className={styles.itemInfo}>
                      <h4>{item.name}</h4>
                      <p className={styles.itemPrice}>
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <FaMapMarkerAlt /> Shipping Address
              </h3>
              <div className={styles.addressInfo}>
                <p className={styles.addressName}>
                  {order.shippingFirstName} {order.shippingLastName}
                </p>
                {order.shippingCompany && <p>{order.shippingCompany}</p>}
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}, {order.shippingState}{" "}
                  {order.shippingPostalCode}
                </p>
                <p>{order.shippingCountry}</p>
                <div className={styles.contactInfo}>
                  <p>
                    <MdEmail /> {order.shippingEmail}
                  </p>
                  <p>
                    <MdPhone /> {order.shippingPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <FaCreditCard /> Payment Information
              </h3>
              <div className={styles.paymentInfo}>
                <div className={styles.paymentRow}>
                  <span>Payment Method</span>
                  <span className={styles.paymentMethod}>
                    {order.paymentMethod.replace("_", " ")}
                  </span>
                </div>
                <div className={styles.paymentRow}>
                  <span>Payment Status</span>
                  <span
                    className={`${styles.paymentStatus} ${styles[order.paymentStatus.toLowerCase()]}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                {paymentId && (
                  <div className={styles.paymentRow}>
                    <span>Transaction ID</span>
                    <span className={styles.transactionId}>{paymentId}</span>
                  </div>
                )}
                {order.paidAt && (
                  <div className={styles.paymentRow}>
                    <span>Paid At</span>
                    <span>{formatDate(order.paidAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Order Summary</h3>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>
                    {order.shippingFee === 0
                      ? "Free"
                      : formatPrice(order.shippingFee)}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className={`${styles.summaryRow} ${styles.discount}`}>
                    <span>
                      Discount {order.couponCode && `(${order.couponCode})`}
                    </span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>What's Next?</h3>
              <ul className={styles.nextSteps}>
                <li>
                  <FaCheckCircle className={styles.stepIcon} />
                  <span>You'll receive an email confirmation shortly</span>
                </li>
                <li>
                  <FaBox className={styles.stepIcon} />
                  <span>We'll notify you when your order ships</span>
                </li>
                <li>
                  <FaTruck className={styles.stepIcon} />
                  <span>
                    Track your package with the tracking number we'll provide
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Link to="/settings/orders" className={styles.viewOrdersBtn}>
            View All Orders
          </Link>
          <Link to="/products" className={styles.continueShoppingBtn}>
            Continue Shopping <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmationPage;
