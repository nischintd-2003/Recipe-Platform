import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ratingRouter from "./rating.route.js";

const recipeRouter: Router = Router();

recipeRouter.get("/", RecipeController.getAllRecipes);
recipeRouter.get("/:id", RecipeController.getRecipeById);

recipeRouter.post("/", authMiddleware, RecipeController.createRecipe);

recipeRouter.use("/:id/rate", ratingRouter);

export default recipeRouter;
