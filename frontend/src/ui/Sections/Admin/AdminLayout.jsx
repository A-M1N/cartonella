import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import styles from "./AdminLayout.module.css";
import Logo from "../../Components/Logo";

import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineShoppingBag,
  MdOutlineLocalOffer,
  MdOutlinePeopleAlt,
  MdOutlineLogout,
  MdOutlineStorefront,
} from "react-icons/md";

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <Logo />
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <MdOutlineDashboard className={styles.navIcon} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <MdOutlineInventory2 className={styles.navIcon} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <MdOutlineShoppingBag className={styles.navIcon} />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/admin/deals"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <MdOutlineLocalOffer className={styles.navIcon} />
            <span>Deals</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <MdOutlinePeopleAlt className={styles.navIcon} />
            <span>Users</span>
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminCard}>
            <div className={styles.avatar}>
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className={styles.adminInfo}>
              <p className={styles.adminName}>{user?.name || "ADMIN"}</p>
              <p className={styles.adminRole}>{user?.role || "ADMIN"}</p>
            </div>
          </div>

          <button className={styles.logoutBtn} onClick={handleLogout}>
            <MdOutlineLogout />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className={styles.contentArea}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.welcomeText}>Welcome back,</p>
            <h1 className={styles.topbarTitle}>{user?.name || "Admin"}</h1>
          </div>

          <button
            className={styles.visitStoreBtn}
            onClick={() => navigate("/")}
          >
            Visit Store
          </button>
        </header>

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
