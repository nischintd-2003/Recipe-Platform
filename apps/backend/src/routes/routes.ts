import { Router } from "express";
import authRouter from "./auth.routes.js";
import recipeRouter from "./recipe.routes.js";
import favouriteRouter from "./favourite.route.js";
import { HealthController } from "../controllers/health.controller.js";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);
router.use("/favourites", favouriteRouter);
router.get("/health", HealthController.getHealth);

export default router;
