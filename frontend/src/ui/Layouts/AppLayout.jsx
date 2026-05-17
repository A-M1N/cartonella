import styles from "../Layouts/AppLayout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />
      <Breadcrumbs />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
