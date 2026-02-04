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
export class Favourite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.favourites, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.favourites, {
    onDelete: "CASCADE",
  })
  recipe!: Recipe;

  @CreateDateColumn()
  createdAt!: Date;
}
