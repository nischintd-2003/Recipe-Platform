import { Response } from "express";
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
    const recipes = await RecipeService.getAllRecipe();
    res.status(200).json(recipes);
  }
}
