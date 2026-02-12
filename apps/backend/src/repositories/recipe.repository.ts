import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/datasource.js";
import { Recipe } from "../entities/Recipe.entity.js";
import { CreateRecipeDTO } from "../interfaces/createRecipe.interface.js";
import { RecipeSearchFilter } from "../interfaces/recipeSearchFilter.interface.js";
import { RawRecipeData } from "../interfaces/rawRecipe.interface.js";

export class RecipeRepository {
  private repository = AppDataSource.getRepository(Recipe);

  async createRecipe(data: CreateRecipeDTO): Promise<Recipe> {
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
  }

  async getAllRecipesOfUser(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<Recipe[]> {
    const qb = this.repository
      .createQueryBuilder("recipe")
      .leftJoinAndSelect("recipe.user", "user")
      .leftJoin("recipe.ratings", "rating")
      .where("recipe.userId = :userId", { userId })

      .addSelect("AVG(rating.value)", "averageRating")
      .addSelect("COUNT(rating.id)", "ratingCount")

      .groupBy("recipe.id")
      .addGroupBy("user.id")

      .orderBy("recipe.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    const { entities, raw } = await qb.getRawAndEntities();

    const typedRaw = raw as RawRecipeData[];

    return entities.map((recipe) => {
      const rawData = typedRaw.find((r) => r.recipe_id === recipe.id);
      return {
        ...recipe,
        averageRating: rawData ? Number(rawData.averageRating) : 0,
        ratingCount: rawData ? Number(rawData.ratingCount) : 0,
      };
    });
  }

  async getRecipeById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async updateRecipe(id: number, data: Partial<Recipe>) {
    await this.repository.update({ id }, data);
    return this.getRecipeById(id);
  }

  async deleteRecipe(id: number) {
    return this.repository.delete({ id });
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
