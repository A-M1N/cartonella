import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  //Parse All Filters from URL
  const filters = useMemo(() => {
    return {
      category: searchParams.get("category") || null,
      minPrice: searchParams.get("minPrice")
        ? parseFloat(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? parseFloat(searchParams.get("maxPrice"))
        : null,
      rating: searchParams.get("rating")
        ? parseInt(searchParams.get("rating"))
        : null,
      color: searchParams.get("color") || null,
      inStock: searchParams.get("inStock") === "true",
      onSale: searchParams.get("onSale") === "true",
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "newest",
      page: parseInt(searchParams.get("page")) || 1,
    };
  }, [searchParams]);

  const queryParams = useMemo(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.minPrice !== null) params.minPrice = filters.minPrice;
    if (filters.maxPrice !== null) params.maxPrice = filters.maxPrice;
    if (filters.rating) params.rating = filters.rating;
    if (filters.color) params.color = filters.color;
    if (filters.inStock) params.inStock = true;
    if (filters.onSale) params.onSale = true;
    if (filters.search) params.search = filters.search;
    if (filters.sort && filters.sort !== "newest") params.sort = filters.sort;
    if (filters.page > 1) params.page = filters.page;

    return params;
  }, [filters]);

  // Update a single filter (resets page to 1)
  const setFilter = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (value === null || value === "" || value === false) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }

        // Reset to page 1 when filter changes (except for page itself)
        if (key !== "page") {
          newParams.delete("page");
        }

        return newParams;
      });
    },
    [setSearchParams],
  );

  // Set price range
  const setPriceRange = useCallback(
    (min, max) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (min === null || min === "") {
          newParams.delete("minPrice");
        } else {
          newParams.set("minPrice", String(min));
        }

        if (max === null || max === "") {
          newParams.delete("maxPrice");
        } else {
          newParams.set("maxPrice", String(max));
        }

        newParams.delete("page");
        return newParams;
      });
    },
    [setSearchParams],
  );

  // Pagination
  const setPage = useCallback(
    (page) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (page === 1) {
          newParams.delete("page");
        } else {
          newParams.set("page", String(page));
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  const goToNextPage = useCallback(() => {
    setPage(filters.page + 1);
  }, [filters.page, setPage]);

  const goToPrevPage = useCallback(() => {
    if (filters.page > 1) {
      setPage(filters.page - 1);
    }
  }, [filters.page, setPage]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  // Clear a specific filter
  const clearFilter = useCallback(
    (key) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(key);
        newParams.delete("page");
        return newParams;
      });
    },
    [setSearchParams],
  );

  // Check if any filters are active
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.rating) count++;
    if (filters.color) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  return {
    filters,
    queryParams,
    setFilter,
    setPriceRange,
    setPage,
    goToNextPage,
    goToPrevPage,
    clearFilters,
    clearFilter,
    activeFiltersCount,
  };
}
