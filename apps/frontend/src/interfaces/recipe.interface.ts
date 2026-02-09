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
  minRating?: string;
  maxPrepTime?: number;
  sort?: "latest" | "rating";
  page?: number;
  limit?: number;
}
