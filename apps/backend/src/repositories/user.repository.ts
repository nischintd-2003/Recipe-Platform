import { AppDataSource } from "../config/datasource.js";
import { User } from "../entities/User.entity.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },
});
