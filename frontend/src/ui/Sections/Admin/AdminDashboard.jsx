import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import adminService from "../../../services/adminService";

import {
  MdOutlineInventory2,
  MdOutlineShoppingBag,
  MdOutlinePeopleAlt,
  MdOutlineAttachMoney,
  MdOutlineTrendingUp,
  MdOutlineArrowForward,
} from "react-icons/md";

import { Link } from "react-router-dom";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    latestOrders: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setIsLoading(true);
        setError("");

        const data = await adminService.getStats();

        setDashboardData({
          stats: data.stats || data,
          latestOrders: data.latestOrders || [],
        });
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load dashboard data";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const stats = dashboardData.stats;

  if (isLoading) {
    return (
      <section className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Admin Overview</p>
            <h1 className={styles.title}>Dashboard</h1>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.dashboard}>
        <div className={styles.errorBox}>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${Number(stats?.revenue || 0).toFixed(2)}`,
      icon: <MdOutlineAttachMoney />,
      tone: "blue",
    },
    {
      title: "Orders",
      value: stats?.ordersCount || 0,
      icon: <MdOutlineShoppingBag />,
      tone: "orange",
    },
    {
      title: "Products",
      value: stats?.productsCount || 0,
      icon: <MdOutlineInventory2 />,
      tone: "purple",
    },
    {
      title: "Users",
      value: stats?.usersCount || 0,
      icon: <MdOutlinePeopleAlt />,
      tone: "green",
    },
  ];

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin Overview</p>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Monitor your store performance, orders, products, and users.
          </p>
        </div>

        <Link to="/admin/products" className={styles.primaryAction}>
          Manage Products
          <MdOutlineArrowForward />
        </Link>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <div key={card.title} className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles[card.tone]}`}>
              {card.icon}
            </div>

            <div>
              <p className={styles.statTitle}>{card.title}</p>
              <h2 className={styles.statValue}>{card.value}</h2>
            </div>

            <div className={styles.trendBadge}>
              <MdOutlineTrendingUp />
              <span>Live</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Latest Orders</h2>
              <p className={styles.panelSubtitle}>
                Recent customer purchases from your store.
              </p>
            </div>

            <Link to="/admin/orders" className={styles.viewAll}>
              View all
            </Link>
          </div>

          {dashboardData.latestOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No orders yet.</p>
            </div>
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
                  {dashboardData.latestOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className={styles.orderNumber}>
                          {order.orderNumber || `#${order.id}`}
                        </span>
                      </td>

                      <td>
                        <div className={styles.customerCell}>
                          <span className={styles.customerName}>
                            {order.user?.name || "Guest"}
                          </span>
                          <span className={styles.customerEmail}>
                            {order.user?.email || order.guestEmail || "-"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[order.status?.toLowerCase()] || ""
                          }`}
                        >
                          {order.status || "PENDING"}
                        </span>
                      </td>

                      <td className={styles.totalCell}>
                        ${Number(order.total || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className={styles.quickPanel}>
          <h2 className={styles.panelTitle}>Quick Actions</h2>
          <p className={styles.panelSubtitle}>
            Common admin tasks you may need.
          </p>

          <div className={styles.quickActions}>
            <Link to="/admin/products" className={styles.quickAction}>
              <MdOutlineInventory2 />
              <div>
                <h3>Manage Products</h3>
                <p>Add, edit, or remove products.</p>
              </div>
            </Link>

            <Link to="/admin/orders" className={styles.quickAction}>
              <MdOutlineShoppingBag />
              <div>
                <h3>Review Orders</h3>
                <p>Check orders and update status.</p>
              </div>
            </Link>

            <Link to="/admin/deals" className={styles.quickAction}>
              <MdOutlineTrendingUp />
              <div>
                <h3>Daily Deal</h3>
                <p>Control your featured deal.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
