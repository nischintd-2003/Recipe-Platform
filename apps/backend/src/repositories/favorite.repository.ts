import { AppDataSource } from "../config/datasource.js";
import { Favourite } from "../entities/Favorite.entity.js";
import { AppError } from "../utils/app.error.js";

export class FavouriteRepository {
  private repo = AppDataSource.getRepository(Favourite);

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
      const favourite = this.repo.create({
        user: { id: userId },
        recipe: { id: recipeId },
      });
      return this.repo.save(favourite);
    } catch {
      throw new AppError("Failed to add to favourite", 500);
    }
  }

  getUserFavourites(userId: number) {
    try {
      return this.repo.find({
        where: { user: { id: userId } },
        relations: ["recipe"],
        order: { createdAt: "DESC" },
      });
    } catch {
      throw new AppError("Failed to fetch to favourite recipe", 500);
    }
  }

  remove(userId: number, recipeId: number) {
    try {
      return this.repo.delete({
        user: { id: userId },
        recipe: { id: recipeId },
      });
    } catch {
      throw new AppError("Failed to remove recipe from favourite", 500);
    }
  }
}
