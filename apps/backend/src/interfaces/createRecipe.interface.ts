export interface CreateRecipeDTO {
  title: string;
  ingredients: string;
  steps: string;
  prepTime?: number;
  image?: string;
  userId: number;
}
