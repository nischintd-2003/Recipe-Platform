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
}
