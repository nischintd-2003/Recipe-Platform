import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/datasource.js";
import { Recipe } from "../entities/Recipe.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
import { AppError } from "../utils/app.error.js";
import { RecipeSearchFilter } from "../interfaces/recipeSearchFilter.interface.js";

export class RecipeRepository {
  private repository = AppDataSource.getRepository(Recipe);

  async createRecipe(data: CreateRecipeDTO): Promise<Recipe> {
    try {
      const recipeData: DeepPartial<Recipe> = {
        title: data.title,
        ingredients: data.ingredients,
        steps: data.steps,
        user: { id: data.userId },
      };

      if (data.prepTime !== undefined) {
        recipeData.prepTime = data.prepTime;
      }

      if (data.image) {
        recipeData.imageUrl = data.image;
      }

      const recipe = this.repository.create(recipeData);
      return await this.repository.save(recipe);
    } catch {
      throw new AppError("Failed to create recipe", 500);
    }
  }

  async getAllRecipes(): Promise<Recipe[]> {
    try {
      return await this.repository.find({
        relations: ["user"],
        order: {
          createdAt: "DESC",
        },
      });
    } catch {
      throw new AppError("Failed to fetch recipes", 500);
    }
  }

  async getRecipeById(id: number) {
    try {
      return await this.repository.findOne({
        where: { id },
        relations: ["user"],
      });
    } catch {
      throw new AppError("Failed to fetch recipe", 500);
    }
  }

  async updateRecipe(id: number, data: Partial<Recipe>) {
    try {
      await this.repository.update({ id }, data);
      return this.getRecipeById(id);
    } catch {
      throw new AppError("Failed to update recipe", 500);
    }
  }

  async deleteRecipe(id: number) {
    try {
      return this.repository.delete({ id });
    } catch {
      throw new AppError("Failed to delete recipe", 500);
    }
  }

  async searchAndFilter(options: RecipeSearchFilter) {
    const {
      q,
      minRating,
      maxPrepTime,
      sort = "latest",
      page = 1,
      limit = 10,
    } = options;

    const qb = this.repository
      .createQueryBuilder("recipe")
      .leftJoin("recipe.user", "user")
      .leftJoin("recipe.ratings", "rating")
      .select([
        "recipe.id",
        "recipe.title",
        "recipe.ingredients",
        "recipe.steps",
        "recipe.imageUrl",
        "recipe.prepTime",
        "recipe.createdAt",
        "user.id",
        "user.email",
      ])
      .addSelect("AVG(rating.value)", "averageRating")
      .addSelect("COUNT(rating.id)", "ratingCount")
      .groupBy("recipe.id")
      .addGroupBy("user.id");

    if (q) {
      qb.andWhere("(recipe.title LIKE :q OR recipe.ingredients LIKE :q)", {
        q: `%${q}%`,
      });
    }

    if (minRating !== undefined) {
      qb.andHaving("AVG(rating.value) >= :minRating", { minRating });
    }

    if (maxPrepTime !== undefined) {
      qb.andWhere("recipe.prepTime <= :maxPrepTime", { maxPrepTime });
    }

    if (sort === "rating") {
      qb.orderBy("averageRating", "DESC");
    } else {
      qb.orderBy("recipe.createdAt", "DESC");
    }

    qb.skip((page - 1) * limit).take(limit);

    const result = await qb.getRawAndEntities();

    return result.entities.map((recipe, index) => ({
      ...recipe,
      averageRating: Number(result.raw[index].averageRating) || 0,
      ratingCount: Number(result.raw[index].ratingCount),
    }));
  }
}
