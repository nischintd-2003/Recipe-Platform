import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../entities/User.entity.js";
import { AppError } from "../utils/app.error.js";

const SALT_ROUNDS = 10;

export class AuthService {
  static async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return UserRepository.save(user);
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    return { user, token };
  }
}
