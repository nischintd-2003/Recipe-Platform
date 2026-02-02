import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter: Router = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login);

export default authRouter;
