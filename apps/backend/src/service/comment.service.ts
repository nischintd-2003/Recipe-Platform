import { CommentRepository } from "../repositories/comment.repository.js";
import { RecipeRepository } from "../repositories/recipe.repository.js";
import { AppError } from "../utils/app.error.js";

export class CommentService {
  static async addComment(recipeId: number, userId: number, content: string) {
    const recipeRepo = new RecipeRepository();
    const commentRepo = new CommentRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    return commentRepo.createComment(content, userId, recipeId);
  }

  static async getComments(recipeId: number) {
    const recipeRepo = new RecipeRepository();
    const commentRepo = new CommentRepository();

    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      throw new AppError("Recipe not found", 404);
    }

    return commentRepo.getByRecipe(recipeId);
  }
}
