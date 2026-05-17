import api from "../services/api";

const reviewsService = {
  getProductReviews: async (productId, params = {}) => {
    const response = await api.get(`/products/${productId}/reviews`, {
      params,
    });
    return response.data;
  },
  canUserReview: async (productId) => {
    const response = await api.get(`/products/${productId}/reviews/can-review`);
    return response.data;
  },
  createReview: async (productId, reviewData) => {
    const response = await api.post(
      `/products/${productId}/reviews`,
      reviewData,
    );
    return response.data;
  },
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};
export default reviewsService;
