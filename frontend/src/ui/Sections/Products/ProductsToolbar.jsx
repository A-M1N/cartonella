import { useFilters } from "../../../hooks/useFilters";
import { useSearchParams } from "react-router-dom";
import styles from "../Products/ProductsToolbar.module.css";
import ButtonsToolbar from "../../Components/ButtonsToolbar";
import { BsGrid3X3GapFill, BsList } from "react-icons/bs";

export default function ProductsToolbar({
  total = 0,
  viewMode = "grid",
  setViewMode,
}) {
  const {
    filters,
    setFilter,
    clearFilters,
    setPriceRange,
    activeFiltersCount,
  } = useFilters();

  // Handle sort change
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setFilter("sort", newSort || null);
  };

  // Remove a specific filter
  const removeFilter = (filterKey) => {
    if (filterKey === "price") {
      setPriceRange(null, null);
    } else {
      setFilter(filterKey, null);
    }
  };
  // Build active filters array
  const activeFilters = [];

  if (filters.category) {
    activeFilters.push({
      key: "category",
      label: filters.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    });
  }
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const priceLabel = `Price: $${filters.minPrice || 0} - $${filters.maxPrice || "∞"}`;
    activeFilters.push({
      key: "price",
      label: priceLabel,
    });
  }

  if (filters.search) {
    activeFilters.push({
      key: "search",
      label: `Search: "${filters.search}"`,
    });
  }

  if (filters.rating) {
    activeFilters.push({
      key: "rating",
      label: `Rating: ${filters.rating}+ stars`,
    });
  }

  if (filters.color) {
    activeFilters.push({
      key: "color",
      label: `Color :  ${filters.color.replace(/\b\w/g, (char) => char.toUpperCase())}`,
    });
  }
  if (filters.inStock) {
    activeFilters.push({
      key: "inStock",
      label: "In Stock Only",
    });
  }
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <div className={styles.resultCount}>
          Showing <strong>{total}</strong> products
        </div>

        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilters.map((filter) => (
              <ButtonsToolbar
                key={filter.key}
                filterName={filter.label}
                onClick={() => removeFilter(filter.key)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewActive : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <BsGrid3X3GapFill size={18} />
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewActive : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <BsList size={20} />
          </button>
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sort"
            className={styles.sortSelect}
            value={filters.sort}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
