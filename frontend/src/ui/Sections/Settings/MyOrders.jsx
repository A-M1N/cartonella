// pages/Settings/MyOrders.jsx
import styles from "../Settings/MyOrders.module.css";
import OrderCard from "./OrderCard";
import { useState } from "react";
import { useMyOrders } from "../../../hooks/useOrders";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

import formatPrice from "../../../utils/formatPrice";
import formatDate from "../../../utils/formatDate";

export default function MyOrders() {
  const filterOptions = [
    { label: "All", value: "" },
    { label: "In Progress", value: "CONFIRMED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  const [activeFilter, setActiveFilter] = useState("");
  const [page, setPage] = useState(1);

  // Fetch orders using React Query
  const { data, isLoading, isError, error } = useMyOrders({
    page,
    limit: 10,
    status: activeFilter || undefined,
  });

  const orders = data?.orders || [];
  const pagination = data?.pagination;

  // Format status for display
  const formatStatus = (status) => {
    const statusMap = {
      CONFIRMED: "Confirmed",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled",
    };
    return statusMap[status] || status;
  };

  // Format orders for OrderCard component
  const formattedOrders = orders.map((order) => ({
    id: order.id,
    orderID: order.orderNumber,
    amount: formatPrice(order.total),
    status: formatStatus(order.status),
    date: formatDate(order.createdAt),
    items: order.items.map((item) => ({
      name: item.name,
      price: formatPrice(item.price),
      img: item.image,
      qty: item.quantity,
    })),
  }));

  // Get display label for current filter
  const getFilterLabel = () => {
    const filter = filterOptions.find((f) => f.value === activeFilter);
    return filter?.label || "All";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>My Orders</h1>
        <div className={styles.loadingContainer}>
          <AiOutlineLoading3Quarters className={styles.spinner} />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>My Orders</h1>
        <div className={styles.errorContainer}>
          <p>{error?.response?.data?.message || "Failed to load orders"}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>

      {/* Filter Buttons */}
      <div className={styles.filterRow}>
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filterBtn} ${
              activeFilter === filter.value ? styles.filterBtnActive : ""
            }`}
            onClick={() => {
              setActiveFilter(filter.value);
              setPage(1);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className={styles.ordersContainer}>
        {formattedOrders.length > 0 ? (
          <>
            {formattedOrders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                orderID={order.orderID}
                amount={order.amount}
                status={order.status}
                date={order.date}
                items={order.items}
              />
            ))}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className={styles.pageInfo}>
                  Page {page} of {pagination.pages}
                </span>
                <button
                  className={styles.pageBtn}
                  onClick={() =>
                    setPage((p) => Math.min(pagination.pages, p + 1))
                  }
                  disabled={page === pagination.pages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <HiOutlineShoppingBag className={styles.emptyIcon} />
            <p className={styles.noOrders}>
              {activeFilter
                ? `No ${getFilterLabel().toLowerCase()} orders found.`
                : "You haven't placed any orders yet."}
            </p>
            <Link to="/products" className={styles.shopLink}>
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
