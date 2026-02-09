import api from "../config/axios";
import type {
  CreateRecipePayload,
  Recipe,
  RecipeFilters,
} from "../interfaces/recipe.interface";

export const fetchRecipes = async (
  params?: RecipeFilters,
): Promise<Recipe[]> => {
  const response = await api.get("/recipe", { params });
  return response.data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/recipe/${id}`);
  return response.data;
};

export const createRecipe = async (
  payload: CreateRecipePayload,
): Promise<Recipe> => {
  const response = await api.post("/recipe", payload);
  return response.data;
};
