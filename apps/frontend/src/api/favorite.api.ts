import api from "../config/axios";
import { API_ROUTES } from "../config/constants";
import type { FavoriteItem } from "../interfaces/recipe.interface";

export const fetchFavorites = async () => {
  const response = await api.get<FavoriteItem[]>(API_ROUTES.FAVORITES);
  return response.data.map((fav) => fav.recipe);
};

export const addFavorite = async (recipeId: number): Promise<void> => {
  await api.post(API_ROUTES.RECIPE.FAVORITE(recipeId));
};

export const removeFavorite = async (recipeId: number): Promise<void> => {
  await api.delete(API_ROUTES.RECIPE.FAVORITE(recipeId));
};
