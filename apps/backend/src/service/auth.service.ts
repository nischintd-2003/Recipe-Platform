import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/app.error.js";
import { AuthResponseDTO, PublicUserDTO } from "../dto/auth.dto.js";

const SALT_ROUNDS = 10;

export class AuthService {
  static async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<PublicUserDTO> {
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

    const saved = await UserRepository.save(user);

    return { id: saved.id, name: saved.name, email: saved.email };
  }

  static async login(
    email: string,
    password: string,
  ): Promise<AuthResponseDTO> {
    const user = await UserRepository.createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();
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

    const userDTO: PublicUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return { user: userDTO, token };
  }
}
