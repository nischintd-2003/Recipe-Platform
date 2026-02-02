import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../entities/User.entity.js";
import { AppError } from "../utils/app.error.js";

const SALT_ROUNDS = 10;

export class AuthService {
  async signup(name: string, email: string, password: string): Promise<User> {
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
}
