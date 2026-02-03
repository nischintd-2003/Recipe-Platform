import { RatingRepository } from "../repositories/rating.repository.js";
import { RecipeRepository } from "../repositories/recipe.repository.js";
import { AppError } from "../utils/app.error.js";

export class RatingService {
  static async rateRecipe(recipeId: number, userId: number, value: number) {
    const recipeRepo = new RecipeRepository();
    const ratingRepo = new RatingRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    const existing = await ratingRepo.findByUserAndRecipe(userId, recipeId);

    if (existing) {
      throw new AppError("You have already rated this recipe", 400);
    }

    return ratingRepo.createRating(value, userId, recipeId);
  }
}
