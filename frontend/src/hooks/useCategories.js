import { useQuery } from "@tanstack/react-query";
import categoriesService from "../services/categoriesService";

// Get Categories

export function useCategories(level) {
  return useQuery({
    queryKey: ["categories", level],
    queryFn: () => categoriesService.getCategories(level),
  });
}

// get Main Categories

export function useMainCategories() {
  return useQuery({
    queryKey: ["categories", "main"],
    queryFn: () => categoriesService.getMainCategories(),
  });
}

// Get single category

export function useCategory(slug) {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: () => categoriesService.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
