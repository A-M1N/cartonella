import api from "./api";

const categoriesService = {
  getCategories: async (level) => {
    const params = level ? { level } : {};
    const response = await api.get("/categories", { params });
    return response.data;
  },
  getMainCategories: async () => {
    const response = await api.get("/categories/main");
    return response.data;
  },
  getCategoryBySlug: async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },
};

export default categoriesService;
