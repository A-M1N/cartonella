import styles from "../Products/FiltersSidebar.module.css";
import ColorSelector from "../../Components/ColorSelector";
import FilterGroup from "./FilterGroup";
import StarRating from "../../Components/StarRating";
import { useState } from "react";
import { useFilters } from "../../../hooks/useFilters";
import { useCategories } from "../../../hooks/useCategories";

const PRICE_RANGES = [
  { label: "$0.00 - $499.00", min: 0, max: 499 },
  { label: "$500.00 - $999.00", min: 500, max: 999 },
  { label: "$1000.00 - $1499.00", min: 1000, max: 1499 },
  { label: "$1500.00 - $1999.00", min: 1500, max: 1999 },
  { label: "$2000.00 - $2499.00", min: 2000, max: 2499 },
  { label: "$2500.00 - $2999.00", min: 2500, max: 2999 },
  { label: "$3000.00 - $3499.00", min: 3000, max: 3499 },
  { label: "$3500.00 - $3999.00", min: 3500, max: 3999 },
  { label: "$4000.00 And Above", min: 4000, max: null },
];

const COLORS = ["black", "blue", "red", "white", "green", "yellow"];

export default function FiltersSidebar() {
  const {
    filters,
    setFilter,
    setPriceRange,
    clearFilters,
    activeFiltersCount,
  } = useFilters();

  // Fetch categories from API
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  // Local state for custom price inputs
  const [customMinPrice, setCustomMinPrice] = useState("");
  const [customMaxPrice, setCustomMaxPrice] = useState("");

  // ===== HANDLERS =====

  const handleCategoryClick = (categorySlug) => {
    if (filters.category === categorySlug) {
      setFilter("category", null);
    } else {
      setFilter("category", categorySlug);
    }
  };

  const handlePriceRangeClick = (min, max) => {
    // Check if this range is already active
    const isActive =
      filters.minPrice === min &&
      (filters.maxPrice === max || (max === null && filters.maxPrice === null));

    if (isActive) {
      setPriceRange(null, null);
    } else {
      setPriceRange(min, max);
    }
  };

  const handleCustomPriceApply = () => {
    const min = customMinPrice ? parseFloat(customMinPrice) : null;
    const max = customMaxPrice ? parseFloat(customMaxPrice) : null;
    setPriceRange(min, max);
  };

  const handleRatingClick = (rating) => {
    if (filters.rating === rating) {
      setFilter("rating", null);
    } else {
      setFilter("rating", rating);
    }
  };

  const handleColorChange = (color) => {
    if (filters.color === color) {
      setFilter("color", null);
    } else {
      setFilter("color", color);
    }
  };

  const handleInStockChange = (checked) => {
    setFilter("inStock", checked);
  };

  const handleClearFilters = () => {
    clearFilters();
    setCustomMinPrice("");
    setCustomMaxPrice("");
  };

  // ===== HELPER FUNCTIONS =====
  const isActiveCategory = (categorySlug) => {
    return filters.category === categorySlug;
  };

  const isActivePriceRange = (min, max) => {
    return (
      filters.minPrice === min &&
      (filters.maxPrice === max || (max === null && filters.maxPrice === null))
    );
  };

  const isActiveRating = (rating) => {
    return filters.rating === rating;
  };

  return (
    <aside className={styles.leftPanel}>
      <h6 className={styles.filterTitle}>
        Filters
        {activeFiltersCount > 0 && (
          <span className={styles.filterCount}>({activeFiltersCount})</span>
        )}
      </h6>

      <div className={styles.btnContainer}>
        <button
          className={styles.clearBtn}
          onClick={handleClearFilters}
          disabled={activeFiltersCount === 0}
        >
          Clear Filters
        </button>
      </div>

      <FilterGroup title="Category" defaultOpen>
        <ul className={styles.ulFilters}>
          {categoriesLoading ? (
            <li className={styles.liFilter}>Loading...</li>
          ) : categoriesData?.categories?.length > 0 ? (
            categoriesData.categories.map((category) => (
              <li
                key={category._id || category.slug}
                className={`${styles.liFilter} ${
                  isActiveCategory(category.slug) ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
                {category.productCount !== undefined && (
                  <span className={styles.count}>
                    ({category.productCount})
                  </span>
                )}
              </li>
            ))
          ) : (
            // Fallback static categories if API doesn't return data
            <>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("mobile") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("phones")}
              >
                Mobile
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("laptops") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("laptops")}
              >
                Laptops
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("pc") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("pc-components")}
              >
                PC
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("tv") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("tv")}
              >
                TV
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("camera") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("camera")}
              >
                Camera
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("smart-watch") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("smart-watch")}
              >
                Smart Watch
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("video-games") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("video-games")}
              >
                Video Games
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("gift-cards") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("gift-cards")}
              >
                Gift Cards
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("software") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("software")}
              >
                Software
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("subscriptions") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("subscriptions")}
              >
                Subscriptions
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("perfumes") ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick("perfumes")}
              >
                Perfumes
              </li>
              <li
                className={`${styles.liFilter} ${
                  isActiveCategory("on-sale") ? styles.active : ""
                }`}
                onClick={() => setFilter("onSale", !filters.onSale)}
              >
                On Sale
              </li>
            </>
          )}
        </ul>
      </FilterGroup>

      <FilterGroup title="Price">
        <ul className={styles.ulFilters}>
          {PRICE_RANGES.map((range) => (
            <li
              key={range.label}
              className={`${styles.liFilter} ${
                isActivePriceRange(range.min, range.max) ? styles.active : ""
              }`}
              onClick={() => handlePriceRangeClick(range.min, range.max)}
            >
              {range.label}
            </li>
          ))}
        </ul>

        <div className={styles.rowPrice}>
          <input
            type="number"
            placeholder="$ 0"
            className={styles.inputPrice}
            value={customMinPrice}
            onChange={(e) => setCustomMinPrice(e.target.value)}
          />
          <span className={styles.dash}>-</span>
          <input
            type="number"
            placeholder="$ 10000"
            className={styles.inputPrice}
            value={customMaxPrice}
            onChange={(e) => setCustomMaxPrice(e.target.value)}
          />
        </div>

        <div className={styles.rowBtn}>
          <button
            className={styles.applyPriceBtn}
            onClick={handleCustomPriceApply}
          >
            Apply
          </button>
        </div>
      </FilterGroup>

      {/* ===== RATING FILTER ===== */}
      <FilterGroup title="Rating">
        <ul className={styles.ulRating}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <li
              key={rating}
              className={`${styles.ratingItem} ${
                isActiveRating(rating) ? styles.active : ""
              }`}
              onClick={() => handleRatingClick(rating)}
            >
              <StarRating max={rating} size="14" readOnly />
              <span className={styles.ratingText}>& Up</span>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className={styles.colorContainer}>
          <ColorSelector
            colors={COLORS}
            value={filters.color}
            onChange={handleColorChange}
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.inStock}
            onChange={(e) => handleInStockChange(e.target.checked)}
          />
          <span className={styles.liFilter}>In Stock</span>
        </label>
      </FilterGroup>
    </aside>
  );
}
