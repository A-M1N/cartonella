import api from "./api";

const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  getAllOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },
  getMyOrders: async (params = {}) => {
    const response = await api.get("/orders/my-orders", { params });
    return response.data;
  },
  updateOrderToPaid: async (orderId, paymentResult) => {
    const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
    return response.data;
  },
  updateOrderStatus: async (orderId, data) => {
    const response = await api.put(`/orders/${orderId}/status`, data);
    return response.data;
  },
  cancelOrder: async (orderId, reason) => {
    const response = await api.put(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  },
  validateCoupon: async (code, subtotal) => {
    const response = await api.post("/orders/validate-coupon", {
      code,
      subtotal,
    });
    return response.data;
  },
  getPayPalClientId: async () => {
    const response = await api.get("orders/paypal-client-id");
    return response.data;
  },
  // Get order by order number (for guest tracking)
  getOrderByNumber: async (orderNumber, email) => {
    const response = await api.get(
      `/orders/track?orderNumber=${orderNumber}&email=${email}`,
    );
    return response.data;
  },
};
export default orderService;
