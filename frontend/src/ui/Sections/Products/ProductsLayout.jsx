import styles from "../Products/ProductsLayout.module.css";
import FiltersSidebar from "../Products/FiltersSidebar";
import ProductsGrid from "../Products/ProductsGrid";
import { useState } from "react";
export default function ProductsLayout() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className={styles.section}>
      <div className={styles.sidebarWrapper}>
        <FiltersSidebar />
      </div>
      <div className={styles.gridWrapper}>
        <ProductsGrid viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
}
