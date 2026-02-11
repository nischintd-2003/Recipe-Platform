import type { Comment } from "./comment.interface";
import type { Recipe, RecipeFilters } from "./recipe.interface";

export type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export interface CommentItemProps {
  comment: Comment;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export interface CommentSectionProps {
  recipeId: number;
}

export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export interface CreateRecipeModalProps {
  open: boolean;
  onClose: () => void;
  recipeToEdit?: Recipe;
}

export interface FavoriteButtonProps {
  recipeId: number;
  initialState?: boolean;
}

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  error?: boolean;
}

export interface RateRecipeProps {
  recipeId: number;
  existingRating?: number | null;
}

export interface RecipeCardProps {
  recipe: Recipe;
}

export interface RecipeFiltersUIProps {
  filters: RecipeFilters;
  onFilterChange: (newFilters: Partial<RecipeFilters>) => void;
  onClear: () => void;
}