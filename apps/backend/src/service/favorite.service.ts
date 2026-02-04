import { FavoriteRepository } from "../repositories/favorite.repository.js";
import { RecipeRepository } from "../repositories/recipe.repository.js";
import { AppError } from "../utils/app.error.js";

export class FavoriteService {
  static async addFavorite(recipeId: number, userId: number) {
    const recipeRepo = new RecipeRepository();
    const favoriteRepo = new FavoriteRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    const existing = await favoriteRepo.find(userId, recipeId);
    if (existing) {
      return existing;
    }

    return favoriteRepo.add(userId, recipeId);
  }

  static async getUserFavorites(userId: number) {
    const favoriteRepo = new FavoriteRepository();
    return favoriteRepo.getUserFavorites(userId);
  }

  static async removeFavorite(recipeId: number, userId: number) {
    const favoriteRepo = new FavoriteRepository();
    await favoriteRepo.remove(userId, recipeId);
  }
}
