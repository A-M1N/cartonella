import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import reviewsService from "../services/reviewsService";

//Get reviews for a product
export function useProductReviews(productId, params = {}) {
  return useQuery({
    queryKey: ["reviews", productId, params],
    queryFn: () => reviewsService.getProductReviews(productId, params),
    enabled: !!productId,
  });
}

export function useCanReview(productId, isAuthenticated = false) {
  return useQuery({
    queryKey: ["canReview", productId],
    queryFn: () => reviewsService.canUserReview(productId),
    enabled: !!productId && isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData) =>
      reviewsService.createReview(productId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      queryClient.invalidateQueries(["product", productId]);
      queryClient.invalidateQueries(["canReview", productId]);
      toast.success("Review Submitted Successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });
}

export function useUpdateReview(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, data }) =>
      reviewsService.updateReview(reviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      queryClient.invalidateQueries(["product", productId]);
      toast.success("Review Updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update review");
    },
  });
}

export function useDeleteReview(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId) => reviewsService.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      queryClient.invalidateQueries(["product", productId]);
      queryClient.invalidateQueries(["canReview", productId]);
      toast.success("Review Deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });
}
