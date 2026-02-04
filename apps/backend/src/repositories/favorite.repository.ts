import { AppDataSource } from "../config/datasource.js";
import { Favorite } from "../entities/Favorite.entity.js";
import { AppError } from "../utils/app.error.js";

export class FavoriteRepository {
  private repo = AppDataSource.getRepository(Favorite);

  find(userId: number, recipeId: number) {
    try {
      return this.repo.findOne({
        where: {
          user: { id: userId },
          recipe: { id: recipeId },
        },
      });
    } catch {
      throw new AppError("Failed to find recipe", 500);
    }
  }

  add(userId: number, recipeId: number) {
    try {
      const favorite = this.repo.create({
        user: { id: userId },
        recipe: { id: recipeId },
      });
      return this.repo.save(favorite);
    } catch {
      throw new AppError("Failed to add to favorite", 500);
    }
  }
}
