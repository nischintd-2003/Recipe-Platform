import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe, rateRecipe } from "../api/recipe.api";
import type { CreateRecipePayload } from "../interfaces/recipe.interface";
import { useNavigate } from "react-router-dom";

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateRecipePayload) => createRecipe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/");
    },
  });
};

export const useRateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value }: { id: number; value: number }) =>
      rateRecipe(id, value),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", String(variables.id)],
      });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
