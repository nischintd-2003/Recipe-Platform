import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { AppError } from "../utils/app.error.js";
import { RecipeService } from "../service/recipe.service.js";

export class RecipeController {
  static async createRecipe(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const { title, ingredients, steps, prepTime, image } = req.body;

    const recipe = await RecipeService.createRecipe({
      title,
      ingredients,
      steps,
      prepTime,
      image,
      userId,
    });

    res.status(201).json(recipe);
  }

  static async getAllRecipes(_req: Request, res: Response) {
    const recipes = await RecipeService.getAllRecipes();
    res.status(200).json(recipes);
  }

  static async getRecipeById(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const recipe = await RecipeService.getRecipeById(recipeId);
    res.status(200).json(recipe);
  }

  static async updateRecipe(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = Number(req.user?.userId);

    const updated = await RecipeService.updateRecipe(
      recipeId,
      userId,
      req.body,
    );

    res.status(200).json(updated);
  }

  static async deleteRecipe(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = Number(req.user?.userId);

    await RecipeService.deleteRecipe(recipeId, userId);

    res.status(204).send();
  }
}
