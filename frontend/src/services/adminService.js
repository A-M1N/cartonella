import api from "./api";

const adminService = {
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  getUsers: async (params = {}) => {
    const response = await api.get("/admin/users", { params });
    return response.data;
  },

  getOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  getProducts: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  createDailyDeal: async (productData) => {
    const response = await api.post("/deals", productData);
    return response.data;
  },
  deleteDailyDeal: async (id) => {
    const response = await api.delete(`/deals/${id}`);
    return response.data;
  },
};

export default adminService;
