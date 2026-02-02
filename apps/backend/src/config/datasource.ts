import { DataSource } from "typeorm";
import { env } from "./env.js";
import { User } from "../entities/User.entity.js";
import { Recipe } from "../entities/Recipe.entity.js";
import { Rating } from "../entities/Rating.entity.js";
import { Comment } from "../entities/Comment.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Recipe, Rating, Comment],
});
