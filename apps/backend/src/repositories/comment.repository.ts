import { AppDataSource } from "../config/datasource.js";
import { Comment } from "../entities/Comment.entity.js";

export class CommentRepository {
  private repo = AppDataSource.getRepository(Comment);

  createComment(content: string, userId: number, recipeId: number) {
    const comment = this.repo.create({
      content,
      user: { id: userId },
      recipe: { id: recipeId },
    });

    return this.repo.save(comment);
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
    await this.repo.update({ id: commentId }, { content });
    return this.findById(commentId);
  }

  async deleteComment(commentId: number) {
    return this.repo.delete({ id: commentId });
  }
}
