import { AppDataSource } from "../config/datasource.js";
import { Favourite } from "../entities/Favourite.entity.js";
import { RawFavouriteData } from "../interfaces/rawFavourite.interface.js";
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

  async getUserFavourites(userId: number) {
    try {
      const qb = this.repo
        .createQueryBuilder("fav")
        .leftJoinAndSelect("fav.recipe", "recipe")
        .leftJoinAndSelect("recipe.user", "user")
        .leftJoin("recipe.ratings", "rating")
        .where("fav.userId = :userId", { userId })

        .addSelect("AVG(rating.value)", "averageRating")
        .addSelect("COUNT(rating.id)", "ratingCount")

        .groupBy("fav.id")
        .addGroupBy("recipe.id")
        .addGroupBy("user.id")

        .orderBy("fav.createdAt", "DESC");

      const { entities, raw } = await qb.getRawAndEntities();

      const typedRaw = raw as RawFavouriteData[];

      return entities.map((fav) => {
        const rawData = typedRaw.find((r) => r.fav_id === fav.id);
        const recipeWithRatings = {
          ...fav.recipe,
          averageRating: rawData ? Number(rawData.averageRating) : 0,
          ratingCount: rawData ? Number(rawData.ratingCount) : 0,
        };

        return {
          ...fav,
          recipe: recipeWithRatings,
        };
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
