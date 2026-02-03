import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/datasource.js";
import { Recipe } from "../entities/Recipe.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
import { AppError } from "../utils/app.error.js";

export class RecipeRepository {
  private repository = AppDataSource.getRepository(Recipe);

  async createRecipe(data: CreateRecipeDTO): Promise<Recipe> {
    try {
      const recipeData: DeepPartial<Recipe> = {
        title: data.title,
        ingredients: data.ingredients,
        steps: data.steps,
        user: { id: data.userId },
      };

      if (data.prepTime !== undefined) {
        recipeData.prepTime = data.prepTime;
      }

      if (data.image) {
        recipeData.imageUrl = data.image;
      }

      const recipe = this.repository.create(recipeData);
      return await this.repository.save(recipe);
    } catch {
      throw new AppError("Failed to create recipe", 500);
    }
  }

  async getAllRecipes(): Promise<Recipe[]> {
    try {
      return await this.repository.find({
        relations: ["user"],
        order: {
          createdAt: "DESC",
        },
      });
    } catch {
      throw new AppError("Failed to fetch recipes", 500);
    }
  }

  async getRecipeById(id: number) {
    try {
      return await this.repository.findOne({
        where: { id },
        relations: ["user"],
      });
    } catch {
      throw new AppError("Failed to fetch recipe", 500);
    }
  }
}
