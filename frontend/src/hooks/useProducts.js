import { useQuery } from "@tanstack/react-query";
import productsService from "../services/productsService";
import { useFilters } from "./useFilters";

// Get Products with Filters

export function useProducts(additionalParams = {}) {
  const { queryParams } = useFilters();

  const finalParams = { ...queryParams, ...additionalParams };

  return useQuery({
    queryKey: ["products", finalParams],
    queryFn: () => productsService.getProducts(finalParams),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get Single Product by ID

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getProductById(id),
    enabled: !!id, // means only fetch if id exists
  });
}

// get featured Products

export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: () => productsService.getFeaturedProduct(limit),
  });
}

// get products by category

export function useProductByCategory(slug, additionalParams = {}) {
  const { queryParams } = useFilters();
  const finalParams = {
    ...queryParams,
    ...additionalParams,
  };

  return useQuery({
    queryKey: ["products", "category", slug, finalParams],
    queryFn: () => productsService.getProductsByCategory(slug, finalParams),
    enabled: !!slug,
    keepPreviousData: true,
  });
}
