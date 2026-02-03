import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity.js";
import { Recipe } from "./Recipe.entity.js";

@Entity()
@Unique(["user", "recipe"])
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  value!: number;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.ratings, { onDelete: "CASCADE" })
  recipe!: Recipe;

  @CreateDateColumn()
  createdAt!: Date;
}
