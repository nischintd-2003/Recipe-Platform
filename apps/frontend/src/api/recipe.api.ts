import api from "../config/axios";
import { API_ROUTES } from "../config/constants";
import type {
  CreateRecipePayload,
  Recipe,
  RecipeFilters,
} from "../interfaces/recipe.interface";

export const fetchRecipes = async (
  params?: RecipeFilters,
): Promise<Recipe[]> => {
  const response = await api.get(API_ROUTES.RECIPE.BASE, { params });
  return response.data;
};

export const fetchMyRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get(API_ROUTES.RECIPE.USER);
  return response.data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get(API_ROUTES.RECIPE.BY_ID(id));
  return response.data;
};

export const createRecipe = async (
  payload: CreateRecipePayload,
): Promise<Recipe> => {
  const response = await api.post(API_ROUTES.RECIPE.BASE, payload);
  return response.data;
};

export const rateRecipe = async (id: number, value: number) => {
  await api.post(API_ROUTES.RECIPE.RATE(id), { value });
};

export const updateRecipe = async (
  id: number,
  payload: CreateRecipePayload,
): Promise<Recipe> => {
  const response = await api.patch(API_ROUTES.RECIPE.BY_ID(id), payload);
  return response.data;
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await api.delete(API_ROUTES.RECIPE.BY_ID(id));
};
