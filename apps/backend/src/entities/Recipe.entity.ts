import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity.js";
import { Rating } from "./Rating.entity.js";
import { Comment } from "./Comment.entity.js";
import { Favourite } from "./Favorite.entity.js";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text" })
  ingredients!: string;

  @Column({ type: "text" })
  steps!: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl!: string;

  @Column({ type: "int" })
  prepTime!: number;

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings!: Rating[];

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments!: Comment[];

  @OneToMany(() => Favourite, (fav) => fav.recipe)
  favourites!: Favourite[];

  @CreateDateColumn()
  createdAt!: Date;
}
