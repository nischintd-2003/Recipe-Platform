import { FavouriteRepository } from "../repositories/favourite.repository.js";
import { RecipeRepository } from "../repositories/recipe.repository.js";
import { AppError } from "../utils/app.error.js";

export class FavouriteService {
  static async addFavourite(recipeId: number, userId: number) {
    const recipeRepo = new RecipeRepository();
    const favouriteRepo = new FavouriteRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    const existing = await favouriteRepo.find(userId, recipeId);
    if (existing) {
      return existing;
    }

    return favouriteRepo.add(userId, recipeId);
  }

  static async getUserFavourites(userId: number) {
    const favouriteRepo = new FavouriteRepository();
    return favouriteRepo.getUserFavourites(userId);
  }

  static async removeFavourite(recipeId: number, userId: number) {
    const favouriteRepo = new FavouriteRepository();
    await favouriteRepo.remove(userId, recipeId);
  }
}
