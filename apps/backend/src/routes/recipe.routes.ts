import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ratingRouter from "./rating.route.js";
import commentRouter from "./comment.route.js";
import favouriteRouter from "./favourite.route.js";
import { optionalAuthMiddleware } from "../middleware/optionalAuth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "../validation/recipe.validation.js";

const recipeRouter: Router = Router();

/**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes with search and filters
 *     tags: [Recipe]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by title or ingredients
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum average rating
 *       - in: query
 *         name: maxPrepTime
 *         schema:
 *           type: number
 *         description: Maximum preparation time
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, rating]
 *     responses:
 *       200:
 *         description: List of recipes
 */
recipeRouter.get("/", RecipeController.getAllRecipes);

/**
 * @swagger
 * /recipe/user:
 *   get:
 *     summary: Get all recipes created by the logged-in user
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: List of user recipes
 *       401:
 *         description: Unauthorized
 */
recipeRouter.get("/user", authMiddleware, RecipeController.getAllRecipesOfUser);

/**
 * @swagger
 * /recipe/{recipeId}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
recipeRouter.get(
  "/:recipeId",
  optionalAuthMiddleware,
  RecipeController.getRecipeById,
);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, ingredients, steps]
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               steps:
 *                 type: string
 *               prepTime:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *                 description: Image URL
 *     responses:
 *       201:
 *         description: Recipe created
 *       401:
 *         description: Unauthorized
 */
recipeRouter.post(
  "/",
  authMiddleware,
  validate(createRecipeSchema),
  RecipeController.createRecipe,
);

/**
 * @swagger
 * /recipe/{recipeId}:
 *   patch:
 *     summary: Update an existing recipe
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               steps:
 *                 type: string
 *               prepTime:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Recipe not found
 */
recipeRouter.patch(
  "/:recipeId",
  authMiddleware,
  validate(updateRecipeSchema),
  RecipeController.updateRecipe,
);

/**
 * @swagger
 * /recipe/{recipeId}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Recipe deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Recipe not found
 */
recipeRouter.delete(
  "/:recipeId",
  authMiddleware,
  RecipeController.deleteRecipe,
);

recipeRouter.use("/:recipeId/rate", ratingRouter);
recipeRouter.use("/:recipeId/comment", commentRouter);
recipeRouter.use("/:recipeId/favourite", favouriteRouter);

export default recipeRouter;
