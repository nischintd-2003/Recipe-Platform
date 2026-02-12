export interface CreateRecipeDTO {
  title: string;
  ingredients: string;
  steps: string;
  prepTime?: number;
  image?: string;
  userId: number;
}


export interface RecipeResponseDTO {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
  prepTime: number;
  imageUrl?: string;
  createdAt: Date;

  averageRating: number;
  ratingCount: number;
  userRating: number | null;
  isFavourite: boolean;

  user: {
    id: number;
    email: string;
  };
}
