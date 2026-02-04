import { Router } from "express";
import authRouter from "./auth.routes.js";
import recipeRouter from "./recipe.routes.js";
import favouriteRouter from "./favorite.route.js";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);
router.use("/favourites", favouriteRouter);

export default router;
