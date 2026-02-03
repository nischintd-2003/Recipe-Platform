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

  static async updateComment(
    recipeId: number,
    commentId: number,
    userId: number,
    content: string,
  ) {
    const commentRepo = new CommentRepository();

    const comment = await commentRepo.findById(commentId);
    if (!comment || comment.recipe.id !== recipeId) {
      throw new AppError("Comment not found", 404);
    }

    if (comment.user.id !== userId) {
      throw new AppError("You are not allowed to edit this comment", 403);
    }

    return commentRepo.updateComment(commentId, content);
  }

  static async deleteComment(
    recipeId: number,
    commentId: number,
    userId: number,
  ) {
    const commentRepo = new CommentRepository();

    const comment = await commentRepo.findById(commentId);
    if (!comment || comment.recipe.id !== recipeId) {
      throw new AppError("Comment not found", 404);
    }

    if (comment.user.id !== userId) {
      throw new AppError("You are not allowed to delete this comment", 403);
    }

    await commentRepo.deleteComment(commentId);
  }
}
