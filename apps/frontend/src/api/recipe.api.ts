import api from "../config/axios";
import type { Recipe } from "../interfaces/recipe.interface";

export const fetchRecipe = async (): Promise<Recipe[]> => {
  const response = await api.get("/recipe");
  return response.data;
};
