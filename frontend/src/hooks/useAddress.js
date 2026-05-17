import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import addressService from "../services/addressService";

export function useAddress() {
  const queryClient = useQueryClient();

  const {
    data: addresses = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: addressService.getAddresses,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: addressService.createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address added");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add address");
    },
  });

  const updateMutation = useMutation({
    mutationFn: addressService.updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update address");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: addressService.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted");
    },
    onError: () => {
      toast.error("Failed to delete address");
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: addressService.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Default address set");
    },
    onError: () => {
      toast.error("Failed to set default address");
    },
  });
  return {
    addresses,
    isLoading,
    isError,
    error,
    createAddress: createMutation.mutate,
    updateAddress: updateMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    setDefaultAddress: setDefaultMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
