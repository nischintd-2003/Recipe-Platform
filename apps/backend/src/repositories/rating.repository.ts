import { AppDataSource } from "../config/datasource.js";
import { Rating } from "../entities/Rating.entity.js";
import { AppError } from "../utils/app.error.js";

export class RatingRepository {
  private repo = AppDataSource.getRepository(Rating);

  findByUserAndRecipe(userId: number, recipeId: number) {
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

  createRating(value: number, userId: number, recipeId: number) {
    try {
      const rating = this.repo.create({
        value,
        user: { id: userId },
        recipe: { id: recipeId },
      });
      return this.repo.save(rating);
    } catch {
      throw new AppError("Failed to add rating", 500);
    }
  }

  async getAverageForRecipe(recipeId: number) {
    const result = await this.repo
      .createQueryBuilder("rating")
      .select("AVG(rating.value)", "average")
      .addSelect("COUNT(rating.id)", "count")
      .where("rating.recipeId = :recipeId", { recipeId })
      .getRawOne<{
        average: string | null;
        count: string;
      }>();

    return {
      averageRating: result?.average ? Number(result.average) : 0,
      ratingCount: Number(result?.count),
    };
  }
}
