import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/recipe.api";
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
