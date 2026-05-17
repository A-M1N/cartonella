import api from "./api";

const productsService = {
  getProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  getFeaturedProduct: async (limit = 8) => {
    const response = await api.get("/products/featured", {
      params: { limit },
    });
    return response.data;
  },
  getProductsByCategory: async (slug, params = {}) => {
    const response = await api.get(`/categories/${slug}/products`, { params });
    return response.data;
  },
};

export default productsService;
