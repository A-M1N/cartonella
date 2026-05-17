import { useQuery } from "@tanstack/react-query";
import productsService from "../services/productsService";

export function useRelatedProducts(categorySlug, currentProductId, limit = 4) {
  return useQuery({
    queryKey: ["products", "related", categorySlug, currentProductId],
    queryFn: async () => {
      const response = await productsService.getProductsByCategory(
        categorySlug,
        { limit: limit + 1 },
      );
      const products = response.products.filter(
        (product) => product.id !== currentProductId,
      );
      return products.slice(0, limit);
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5,
  });
}
