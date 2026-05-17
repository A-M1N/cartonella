import { useEffect, useState } from "react";
import styles from "./AdminPages.module.css";
import adminService from "../../../services/adminService";
import Pagination from "../../Components/Pagination";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async (page = currentPage) => {
    try {
      setIsLoading(true);
      const data = await adminService.getUsers({ page, limit: 20 });
      setUsers(data.users || []);
      setPagination(data.pagination);
      setCurrentPage(data.pagination?.page || 1);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Customers</p>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>
            View registered users and their activity.
          </p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.panel}>
        {isLoading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <div className={styles.empty}>No users found.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Orders</th>
                  <th>Reviews</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div
                          className={styles.productImg}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            background: "#eef2ff",
                            color: "#5171ff",
                          }}
                        >
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>
                          <div className={styles.bold}>{user.name}</div>
                          <div className={styles.muted}>ID #{user.id}</div>
                        </div>
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`${styles.roleBadge} ${
                          user.role === "ADMIN" ? styles.adminRole : ""
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{user._count?.orders || 0}</td>
                    <td>{user._count?.reviews || 0}</td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagination && pagination.pages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.pages}
                total={pagination.total}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminUsers;
