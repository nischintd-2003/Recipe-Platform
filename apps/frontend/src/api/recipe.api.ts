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

export const fetchMyRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get("/recipe/user");
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

export const rateRecipe = async (id: number, value: number) => {
  await api.post(`/recipe/${id}/rate`, { value });
};

export const updateRecipe = async (
  id: number,
  payload: CreateRecipePayload,
): Promise<Recipe> => {
  const response = await api.patch(`/recipe/${id}`, payload);
  return response.data;
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await api.delete(`/recipe/${id}`);
};
