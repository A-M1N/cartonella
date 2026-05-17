import { useQuery } from "@tanstack/react-query";
import { collectionService } from "../services/collectionService";

export function useCollection() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: collectionService.getCollections,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
