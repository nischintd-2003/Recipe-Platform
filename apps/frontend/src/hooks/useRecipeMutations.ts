import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRecipe,
  deleteRecipe,
  rateRecipe,
  updateRecipe,
} from "../api/recipe.api";
import type { CreateRecipePayload } from "../interfaces/recipe.interface";
import { addFavorite, removeFavorite } from "../api/favorite.api";
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

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isFavorited,
    }: {
      id: number;
      isFavorited: boolean;
    }) => {
      if (isFavorited) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["recipe", String(variables.id)],
      });
    },
  });
};

export const useUpdateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateRecipePayload }) =>
      updateRecipe(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["recipe", String(data.id)], data);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/", { replace: true });
    },
  });
};
