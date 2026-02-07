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
