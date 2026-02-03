import { Router } from "express";
import authRouter from "./auth.routes.js";
import recipeRouter from "./recipe.routes.js";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);

export default router;
