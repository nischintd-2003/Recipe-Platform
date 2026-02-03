import { AppDataSource } from "../config/datasource.js";
import { User } from "../entities/User.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
import { RatingRepository } from "../repositories/rating.repository.js";
import { RecipeRepository } from "../repositories/recipe.repository.js";
import { AppError } from "../utils/app.error.js";

export class RecipeService {
  static async createRecipe(data: CreateRecipeDTO) {
    const userRepo = AppDataSource.getRepository(User);
    const userExists = await userRepo.findOneBy({ id: data.userId });

    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    const recipeRepository = new RecipeRepository();
    return recipeRepository.createRecipe(data);
  }

  static async getAllRecipes() {
    const recipeRepo = new RecipeRepository();
    const ratingRepo = new RatingRepository();

    const recipes = await recipeRepo.getAllRecipes();

    return Promise.all(
      recipes.map(async (recipe) => {
        const rating = await ratingRepo.getAverageForRecipe(recipe.id);

        return {
          ...recipe,
          averageRating: rating.averageRating,
          ratingCount: rating.ratingCount,
        };
      }),
    );
  }

  static async getRecipeById(id: number) {
    const recipeRepo = new RecipeRepository();
    const ratingRepo = new RatingRepository();

    const recipe = await recipeRepo.getRecipeById(id);

    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    const rating = await ratingRepo.getAverageForRecipe(recipe.id);

    return {
      ...recipe,
      averageRating: rating.averageRating,
      ratingCount: rating.ratingCount,
    };
  }
}
