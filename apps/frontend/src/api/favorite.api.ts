import api from "../config/axios";

export const addFavorite = async (recipeId: number): Promise<void> => {
  await api.post(`/recipe/${recipeId}/favourite`);
};

export const removeFavorite = async (recipeId: number): Promise<void> => {
  await api.delete(`/recipe/${recipeId}/favourite`);
};
