import { AppDataSource } from "../config/datasource.js";
import { User } from "../entities/User.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
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
  static async getAllRecipe() {
    const recipeRepository = new RecipeRepository();
    return recipeRepository.getAllRecipes();
  }

  static async getRecipeById(id: number) {
    const recipeRepository = new RecipeRepository();

    const recipe = await recipeRepository.getRecipeById(id);

    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }
    return recipe;
  }
}
