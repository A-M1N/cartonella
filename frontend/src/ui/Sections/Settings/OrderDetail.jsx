import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrder, useCancelOrder } from "../../../hooks/useOrders";
import styles from "./OrderDetail.module.css";

import formatPrice from "../../../utils/formatPrice";
import formatDate from "../../../utils/formatDate";
import { formatShortDate } from "../../../utils/formatShortDate";
// Icons
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCreditCard,
  FaClock,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdContentCopy } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";

const statusConfig = {
  PENDING: { icon: FaClock, color: "#f59e0b", bg: "#fef3c7", label: "Pending" },
  CONFIRMED: {
    icon: FaCheckCircle,
    color: "#3b82f6",
    bg: "#dbeafe",
    label: "Confirmed",
  },
  PROCESSING: {
    icon: FaBox,
    color: "#8b5cf6",
    bg: "#ede9fe",
    label: "Processing",
  },
  SHIPPED: { icon: FaTruck, color: "#6366f1", bg: "#e0e7ff", label: "Shipped" },
  OUT_FOR_DELIVERY: {
    icon: FaTruck,
    color: "#0891b2",
    bg: "#cffafe",
    label: "Out for Delivery",
  },
  DELIVERED: {
    icon: FaCheckCircle,
    color: "#10b981",
    bg: "#d1fae5",
    label: "Delivered",
  },
  CANCELLED: {
    icon: FaTimesCircle,
    color: "#ef4444",
    bg: "#fee2e2",
    label: "Cancelled",
  },
  REFUNDED: {
    icon: FaTimesCircle,
    color: "#6b7280",
    bg: "#f3f4f6",
    label: "Refunded",
  },
};

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError, error } = useOrder(orderId);
  const cancelMutation = useCancelOrder();

  const order = data?.order;

  const getStatusInfo = (status) => {
    return statusConfig[status] || statusConfig.PENDING;
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancelOrder = async () => {
    try {
      await cancelMutation.mutateAsync({
        orderId: order.id,
        reason: cancelReason,
      });
      setShowCancelModal(false);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const canCancel = ["PENDING", "CONFIRMED"].includes(order?.status);

  // Loading State
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <AiOutlineLoading3Quarters className={styles.spinner} />
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h3>Order Not Found</h3>
          <p>
            {error?.response?.data?.message || "Unable to load order details"}
          </p>
          <Link to="/settings/orders" className={styles.backLink}>
            <FaArrowLeft /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  // Build timeline
  const timeline = [
    {
      status: "PENDING",
      label: "Order Placed",
      date: order.createdAt,
      completed: true,
    },
    {
      status: "CONFIRMED",
      label: "Confirmed",
      date: order.status !== "PENDING" ? order.createdAt : null,
      completed: [
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
      ].includes(order.status),
    },
    {
      status: "PROCESSING",
      label: "Processing",
      date: null,
      completed: [
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
      ].includes(order.status),
    },
    {
      status: "SHIPPED",
      label: "Shipped",
      date: order.shippedAt,
      completed: ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
        order.status,
      ),
    },
    {
      status: "DELIVERED",
      label: "Delivered",
      date: order.deliveredAt,
      completed: order.status === "DELIVERED",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => navigate("/settings/orders")}
          className={styles.backButton}
        >
          <FaArrowLeft /> Back to Orders
        </button>
      </div>

      <div className={styles.orderHeaderCard}>
        <div className={styles.orderMainInfo}>
          <div className={styles.orderNumberRow}>
            <h1>Order #{order.orderNumber}</h1>
            <button
              onClick={copyOrderNumber}
              className={styles.copyBtn}
              title="Copy order number"
            >
              <MdContentCopy />
              {copied && <span className={styles.copiedText}>Copied!</span>}
            </button>
          </div>
          <p className={styles.orderDate}>
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div
          className={styles.statusBadgeLarge}
          style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}
        >
          <StatusIcon size={18} />
          {statusInfo.label}
        </div>
      </div>

      {order.status !== "CANCELLED" && order.status !== "REFUNDED" && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Order Status</h3>
          <div className={styles.timeline}>
            {timeline.map((step, index) => (
              <div
                key={step.status}
                className={`${styles.timelineStep} ${step.completed ? styles.completed : ""}`}
              >
                <div className={styles.timelineIcon}>
                  {step.completed ? (
                    <FaCheckCircle />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineLabel}>{step.label}</span>
                  {step.date && (
                    <span className={styles.timelineDate}>
                      {formatShortDate(step.date)}
                    </span>
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div
                    className={`${styles.timelineLine} ${step.completed ? styles.completed : ""}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className={styles.trackingInfo}>
              <div className={styles.trackingRow}>
                <span>Tracking Number:</span>
                <strong>{order.trackingNumber}</strong>
              </div>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.trackingLink}
                >
                  Track Package <FaExternalLinkAlt size={12} />
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cancelled Notice */}
      {order.status === "CANCELLED" && (
        <div className={styles.cancelledNotice}>
          <FaTimesCircle />
          <div>
            <h4>Order Cancelled</h4>
            <p>
              This order was cancelled on {formatShortDate(order.cancelledAt)}
            </p>
            {order.notes && (
              <p className={styles.cancelReason}>Reason: {order.notes}</p>
            )}
          </div>
        </div>
      )}

      <div className={styles.contentGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Order Items */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <FaBox /> Order Items ({order.items.length})
            </h3>
            <div className={styles.itemsList}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <Link
                    to={`/product/${item.productId}`}
                    className={styles.itemImageLink}
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className={styles.itemInfo}>
                    <Link
                      to={`/product/${item.productId}`}
                      className={styles.itemName}
                    >
                      {item.name}
                    </Link>
                    <p className={styles.itemMeta}>
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

          {/* Shipping Address */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <FaMapMarkerAlt /> Shipping Address
            </h3>
            <div className={styles.addressContent}>
              <p className={styles.addressName}>
                {order.shippingFirstName} {order.shippingLastName}
              </p>
              {order.shippingAddress.company && (
                <p>{order.shippingAddress.company}</p>
              )}
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingState}{" "}
                {order.shippingPostalCode}
              </p>
              <p>{order.shippingCountry}</p>
              <div className={styles.contactDetails}>
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
              <FaCreditCard /> Payment
            </h3>
            <div className={styles.paymentContent}>
              <div className={styles.paymentRow}>
                <span>Method</span>
                <span className={styles.paymentMethod}>
                  {order.paymentMethod.replace("_", " ")}
                </span>
              </div>
              <div className={styles.paymentRow}>
                <span>Status</span>
                <span
                  className={`${styles.paymentStatus} ${styles[order.paymentStatus.toLowerCase()]}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentId && (
                <div className={styles.paymentRow}>
                  <span>Transaction ID</span>
                  <span className={styles.transactionId}>
                    {order.paymentId}
                  </span>
                </div>
              )}
              {order.paidAt && (
                <div className={styles.paymentRow}>
                  <span>Paid At</span>
                  <span>{formatShortDate(order.paidAt)}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Summary</h3>
            <div className={styles.summaryContent}>
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

          <div className={styles.actionsCard}>
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className={styles.cancelOrderBtn}
              >
                <FaTimesCircle /> Cancel Order
              </button>
            )}
            <Link to="/products" className={styles.shopAgainBtn}>
              Shop Again <HiArrowRight />
            </Link>
          </div>

          <div className={styles.helpCard}>
            <h4>Need Help?</h4>
            <p>
              If you have any questions about your order, please contact our
              support team.
            </p>
            <a href="mailto:support@example.com" className={styles.supportLink}>
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <FaExclamationTriangle className={styles.warningIcon} />
              <h3>Cancel Order</h3>
            </div>
            <div className={styles.modalContent}>
              <p>
                Are you sure you want to cancel this order? This action cannot
                be undone.
              </p>
              <div className={styles.reasonField}>
                <label>Reason for cancellation (optional)</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Let us know why you're cancelling..."
                  rows={3}
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowCancelModal(false)}
                className={styles.modalCancelBtn}
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className={styles.modalConfirmBtn}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? (
                  <AiOutlineLoading3Quarters className={styles.btnSpinner} />
                ) : (
                  "Yes, Cancel Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
