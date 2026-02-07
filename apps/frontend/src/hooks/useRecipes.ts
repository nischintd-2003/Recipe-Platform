import { useQuery } from "@tanstack/react-query";
import { fetchRecipe } from "../api/recipe.api";

export const useRecipe = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipe,
    staleTime: 1000 * 60 * 5,
  });
};
