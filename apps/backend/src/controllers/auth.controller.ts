import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service.js";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.signup(username, email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ user: user, token: token });
    } catch (error) {
      next(error);
    }
  }
}
