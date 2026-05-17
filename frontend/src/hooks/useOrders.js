import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../services/orderService";

// Get Single Order By Id
export function useOrder(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
}

//Get User's Orders
export function useMyOrders(params = {}) {
  return useQuery({
    queryKey: ["orders", "my-orders", params],
    queryFn: () => orderService.getMyOrders(params),
    staleTime: 1000 * 60 * 2,
  });
}

//Get All Orders (Admin)
export function useAllOrders(params = {}) {
  return useQuery({
    queryKey: ["orders", "all", params],
    queryFn: () => orderService.getAllOrders(params),
    staleTime: 1000 * 60 * 2,
  });
}

//Get PayPal Client ID
export function usePayPalClientId() {
  return useQuery({
    queryKey: ["paypal-client-id"],
    queryFn: () => orderService.getPayPalClientId(),
    staleTime: 1000 * 60 * 60,
  });
}

// Create Order
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

//update order to paid
export function useUpdateOrderToPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, paymentResult }) =>
      orderService.updateOrderToPaid(orderId, paymentResult),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }) =>
      orderService.cancelOrder(orderId, reason),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status, trackingNumber }) =>
      orderService.updateOrderStatus(orderId, { status, trackingNumber }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useValidateCoupon() {
  return useMutation({
    mutationFn: ({ code, subtotal }) =>
      orderService.validateCoupon(code, subtotal),
  });
}
