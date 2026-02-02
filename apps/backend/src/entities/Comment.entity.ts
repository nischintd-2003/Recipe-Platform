import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity.js";
import { Recipe } from "./Recipe.entity.js";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.comments, { onDelete: "CASCADE" })
  recipe!: Recipe;

  @CreateDateColumn()
  createdAt!: Date;
}
