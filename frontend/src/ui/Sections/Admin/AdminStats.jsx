import { useEffect, useState } from "react";
import styles from "./AdminPages.module.css";
import adminService from "../../../services/adminService";
import {
  MdOutlineAttachMoney,
  MdOutlineInventory2,
  MdOutlinePeopleAlt,
  MdOutlineShoppingBag,
} from "react-icons/md";

function AdminStats() {
  const [stats, setStats] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const data = await adminService.getStats();
        setStats(data.stats);
        setLatestOrders(data.latestOrders || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) return <p>Loading stats...</p>;

  if (error) return <div className={styles.error}>{error}</div>;

  const cards = [
    {
      label: "Revenue",
      value: `$${Number(stats?.revenue || 0).toFixed(2)}`,
      icon: <MdOutlineAttachMoney />,
    },
    {
      label: "Orders",
      value: stats?.ordersCount || 0,
      icon: <MdOutlineShoppingBag />,
    },
    {
      label: "Products",
      value: stats?.productsCount || 0,
      icon: <MdOutlineInventory2 />,
    },
    {
      label: "Users",
      value: stats?.usersCount || 0,
      icon: <MdOutlinePeopleAlt />,
    },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin Overview</p>
          <h1 className={styles.title}>Dashboard Stats</h1>
          <p className={styles.subtitle}>
            Quick overview of your store performance.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <div className={styles.statCard} key={card.label}>
            <div className={styles.statIcon}>{card.icon}</div>
            <p className={styles.statLabel}>{card.label}</p>
            <h2 className={styles.statValue}>{card.value}</h2>
          </div>
        ))}
      </div>

      <div className={styles.panel} style={{ marginTop: "1.5rem" }}>
        <h2 className={styles.title} style={{ fontSize: "1.2rem" }}>
          Latest Orders
        </h2>

        {latestOrders.length === 0 ? (
          <div className={styles.empty}>No recent orders.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {latestOrders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.bold}>
                      {order.orderNumber || `#${order.id}`}
                    </td>
                    <td>
                      <div className={styles.bold}>
                        {order.user?.name || "Guest"}
                      </div>
                      <div className={styles.muted}>
                        {order.user?.email || order.guestEmail || "-"}
                      </div>
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
                    <td className={styles.bold}>
                      ${Number(order.total || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminStats;
