import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { User } from "./User.entity.js";
import { Recipe } from "./Recipe.entity.js";

@Entity()
@Unique(["user", "recipe"])
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.favorites, {
    onDelete: "CASCADE",
  })
  recipe!: Recipe;

  @CreateDateColumn()
  createdAt!: Date;
}
