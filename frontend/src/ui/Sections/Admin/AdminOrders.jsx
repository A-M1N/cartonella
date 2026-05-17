import { useEffect, useState } from "react";
import styles from "./AdminPages.module.css";
import adminService from "../../../services/adminService";
import toast from "react-hot-toast";
import Pagination from "../../Components/Pagination";

const statuses = ["CONFIRMED", "DELIVERED", "CANCELLED"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async (page = currentPage) => {
    try {
      setIsLoading(true);
      setError("");

      const data = await adminService.getOrders({
        page,
        limit: 20,
        search: search || undefined,
        status: status || undefined,
      });

      setOrders(data.orders || []);
      setPagination(data.pagination);
      setCurrentPage(data.pagination?.page || 1);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(page);
  };

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, {
        status: nextStatus,
      });

      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Sales</p>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>
            View customer orders and update fulfillment status.
          </p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.panel}>
        <form className={styles.toolbar} onSubmit={handleFilter}>
          <input
            className={styles.input}
            placeholder="Search by order/customer/email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>

          <button className={styles.primaryBtn} type="submit">
            Filter
          </button>

          <button
            className={styles.secondaryBtn}
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("");
              setCurrentPage(1);
              fetchOrders(1);
            }}
          >
            Reset
          </button>
        </form>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>No orders found.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className={styles.bold}>
                        {order.orderNumber} {`OrderID: ${order.id}`}
                      </div>
                      <div className={styles.muted}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td>
                      <div className={styles.bold}>
                        {order.user?.name || "Guest"}
                      </div>
                      <div className={styles.muted}>
                        {order.user?.email || order.guestEmail || "-"}
                      </div>
                    </td>

                    <td>{order.items?.length || 0}</td>

                    <td className={styles.bold}>
                      ${Number(order.total || 0).toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[order.status?.toLowerCase()] || ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className={styles.select}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option value={status} key={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.pages}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}

export default AdminOrders;
