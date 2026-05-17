import { useQuery } from "@tanstack/react-query";
import dealsService from "../services/dealsService";

export function useDealOfDay() {
  return useQuery({
    queryKey: ["deals", "today"],
    queryFn: dealsService.getDealOfDay,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
