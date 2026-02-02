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

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  ingredients!: string;

  @Column("text")
  steps!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column()
  prepTime!: number;

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings!: Rating[];

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;
}
