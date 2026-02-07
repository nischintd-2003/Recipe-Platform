import { useQuery } from "@tanstack/react-query";
import { fetchRecipe, fetchRecipeById } from "../api/recipe.api";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipe,
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
