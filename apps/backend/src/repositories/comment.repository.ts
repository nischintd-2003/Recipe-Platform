import { AppDataSource } from "../config/datasource.js";
import { Comment } from "../entities/Comment.entity.js";
import { AppError } from "../utils/app.error.js";

export class CommentRepository {
  private repo = AppDataSource.getRepository(Comment);

  createComment(content: string, userId: number, recipeId: number) {
    try {
      const comment = this.repo.create({
        content,
        user: { id: userId },
        recipe: { id: recipeId },
      });

      return this.repo.save(comment);
    } catch {
      throw new AppError("Failed to add comment", 500);
    }
  }

  getByRecipe(recipeId: number) {
    return this.repo.find({
      where: { recipe: { id: recipeId } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }

  async findById(commentId: number) {
    return this.repo.findOne({
      where: { id: commentId },
      relations: ["user", "recipe"],
    });
  }

  async updateComment(commentId: number, content: string) {
    try {
      await this.repo.update({ id: commentId }, { content });
      return this.findById(commentId);
    } catch {
      throw new AppError("Failed to update comment", 500);
    }
  }

  async deleteComment(commentId: number) {
    try {
      return this.repo.delete({ id: commentId });
    } catch {
      throw new AppError("Failed to update comment", 500);
    }
  }
}
