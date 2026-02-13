import { COMPONENTS, CONFIG } from "../config/constants";

export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
  imageUrl: string | null;
  prepTime: number | null;
  averageRating: number;
  ratingCount: number;
  createdAt: string;
  user: {
    id: number;
    email: string;
  };
  userRating?: number | null;
  isFavourite?: boolean;
}

export interface CreateRecipePayload {
  title: string;
  ingredients: string;
  steps: string;
  prepTime: number;
  image?: string;
}

export const InitialCreateRecipeForm: CreateRecipePayload = {
  title: "",
  ingredients: "",
  steps: "",
  prepTime: 0,
  image: "",
};

export interface RecipeFilters {
  q?: string;
  minRating?: number;
  maxPrepTime?: number;
  sort?: "latest" | "rating";
  page?: number;
  limit?: number;
}

export const InitialRecipeFilters: RecipeFilters = {
  q: "",
  minRating: 0,
  maxPrepTime: COMPONENTS.RECIPE_FILTER.MAX_NUM_TIME,
  sort: "latest",
  page: 1,
  limit: CONFIG.PAGINATION_LIMIT,
};

export interface FavoriteItem {
  id: number;
  recipe: Recipe;
  createdAt: string;
}
