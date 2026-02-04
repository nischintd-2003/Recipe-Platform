import { Router } from "express";
import authRouter from "./auth.routes.js";
import recipeRouter from "./recipe.routes.js";
import favoriteRouter from "./favorite.route.js";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);
router.use("/favorites", favoriteRouter);

export default router;
