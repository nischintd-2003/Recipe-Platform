import { AppDataSource } from "../config/datasource.js";
import { Rating } from "../entities/Rating.entity.js";

export class RatingRepository {
  private repo = AppDataSource.getRepository(Rating);

  findByUserAndRecipe(userId: number, recipeId: number) {
    return this.repo.findOne({
      where: {
        user: { id: userId },
        recipe: { id: recipeId },
      },
    });
  }

  createRating(value: number, userId: number, recipeId: number) {
    const rating = this.repo.create({
      value,
      user: { id: userId },
      recipe: { id: recipeId },
    });
    return this.repo.save(rating);
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
