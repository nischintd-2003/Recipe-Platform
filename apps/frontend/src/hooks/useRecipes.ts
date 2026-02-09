import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRecipes, fetchRecipeById } from "../api/recipe.api";
import type { RecipeFilters } from "../interfaces/recipe.interface";

export const useRecipes = (filters: RecipeFilters) => {
  return useQuery({
    queryKey: ["recipes", filters],
    queryFn: () => fetchRecipes(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};

export function useRecipe(id?: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id as string),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
