import { AppDataSource } from "../config/datasource.js";
import { Favourite } from "../entities/Favourite.entity.js";
import { RawFavouriteData } from "../interfaces/rawFavourite.interface.js";

export class FavouriteRepository {
  private repo = AppDataSource.getRepository(Favourite);

  find(userId: number, recipeId: number) {
    return this.repo.findOne({
      where: {
        user: { id: userId },
        recipe: { id: recipeId },
      },
    });
  }

  add(userId: number, recipeId: number) {
    const favourite = this.repo.create({
      user: { id: userId },
      recipe: { id: recipeId },
    });
    return this.repo.save(favourite);
  }

  async getUserFavourites(userId: number) {
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
  }

  remove(userId: number, recipeId: number) {
    return this.repo.delete({
      user: { id: userId },
      recipe: { id: recipeId },
    });
  }
}
