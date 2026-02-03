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
}
