import { AppDataSource } from "../config/datasource.js";
import { Recipe } from "../entities/Recipe.entity.js";
import { User } from "../entities/User.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
import { RecipeSearchFilter } from "../interfaces/recipeSearchFilter.interface.js";
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

  static async getAllRecipes(filters: RecipeSearchFilter) {
    const recipeRepo = new RecipeRepository();
    return recipeRepo.searchAndFilter(filters);
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

  static async updateRecipe(
    recipeId: number,
    userId: number,
    data: {
      title?: string;
      ingredients?: string;
      steps?: string;
      prepTime?: number;
      image?: string;
    },
  ) {
    const recipeRepo = new RecipeRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    if (recipe.user.id !== userId) {
      throw new AppError("You are not allowed to update this recipe", 403);
    }

    const updateData: Partial<Recipe> = {};

    if (data.title) updateData.title = data.title;
    if (data.ingredients) updateData.ingredients = data.ingredients;
    if (data.steps) updateData.steps = data.steps;
    if (data.prepTime !== undefined) updateData.prepTime = data.prepTime;
    if (data.image) updateData.imageUrl = data.image;

    return recipeRepo.updateRecipe(recipeId, updateData);
  }

  static async deleteRecipe(recipeId: number, userId: number) {
    const recipeRepo = new RecipeRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    if (recipe.user.id !== userId) {
      throw new AppError("You are not allowed to delete this recipe", 403);
    }
    await recipeRepo.deleteRecipe(recipeId);
  }
}
