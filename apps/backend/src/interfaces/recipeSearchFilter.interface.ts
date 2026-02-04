export interface RecipeSearchFilter {
  q?: string;
  minRating?: number;
  maxPrepTime?: number;
  sort?: "rating" | "latest";
  page?: number;
  limit?: number;
}
