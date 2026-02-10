import api from "../config/axios";
import type { FavouriteItem } from "../interfaces/recipe.interface";

export const fetchFavourites = async () => {
  const response = await api.get<FavouriteItem[]>("/favourites");
  return response.data.map((fav) => fav.recipe);
};

export const addFavorite = async (recipeId: number): Promise<void> => {
  await api.post(`/recipe/${recipeId}/favourite`);
};

export const removeFavorite = async (recipeId: number): Promise<void> => {
  await api.delete(`/recipe/${recipeId}/favourite`);
};
