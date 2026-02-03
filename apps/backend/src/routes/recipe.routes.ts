import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ratingRouter from "./rating.route.js";
import commentRouter from "./comment.route.js";

const recipeRouter: Router = Router();

recipeRouter.get("/", RecipeController.getAllRecipes);
recipeRouter.get("/:recipeId", RecipeController.getRecipeById);

recipeRouter.post("/", authMiddleware, RecipeController.createRecipe);
recipeRouter.patch("/:recipeId", authMiddleware, RecipeController.updateRecipe);

recipeRouter.delete(
  "/:recipeId",
  authMiddleware,
  RecipeController.deleteRecipe,
);

recipeRouter.use("/:recipeId/rate", ratingRouter);
recipeRouter.use("/:recipeId/comment", commentRouter);

export default recipeRouter;
