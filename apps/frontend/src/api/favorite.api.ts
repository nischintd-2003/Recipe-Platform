import api from "../config/axios";
import type { FavoriteItem } from "../interfaces/recipe.interface";

export const fetchFavorites = async () => {
  const response = await api.get<FavoriteItem[]>("/favourites");
  return response.data.map((fav) => fav.recipe);
};

export const addFavorite = async (recipeId: number): Promise<void> => {
  await api.post(`/recipe/${recipeId}/favourite`);
};

export const removeFavorite = async (recipeId: number): Promise<void> => {
  await api.delete(`/recipe/${recipeId}/favourite`);
};
