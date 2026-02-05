import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Recipe } from "./Recipe.entity.js";
import { Rating } from "./Rating.entity.js";
import { Comment } from "./Comment.entity.js";
import { Favourite } from "./Favourite.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes!: Recipe[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings!: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany(() => Favourite, (fav) => fav.user)
  favourites!: Favourite[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
