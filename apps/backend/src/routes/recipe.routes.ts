import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const recipeRouter: Router = Router();

recipeRouter.post("/", authMiddleware, RecipeController.createRecipe);

export default recipeRouter;
