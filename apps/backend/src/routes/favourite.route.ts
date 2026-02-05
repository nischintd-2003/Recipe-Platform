import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { FavouriteController } from "../controllers/favourite.controller.js";

const favouriteRouter: Router = Router({ mergeParams: true });

/**
 * @swagger
 * /recipe/{recipeId}/favourite:
 *   post:
 *     summary: Add recipe to favourites
 *     tags: [Favourite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: Recipe added to favourites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
favouriteRouter.post("/", authMiddleware, FavouriteController.addFavourite);

/**
 * @swagger
 * /favourites:
 *   get:
 *     summary: Get all favourite recipes of logged-in user
 *     tags: [Favourite]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favourite recipes
 *       401:
 *         description: Unauthorized
 */
favouriteRouter.get("/", authMiddleware, FavouriteController.getUserFavourites);

/**
 * @swagger
 * /recipe/{recipeId}/favourite:
 *   delete:
 *     summary: Remove recipe from favourites
 *     tags: [Favourite]
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
 *         description: Recipe removed from favourites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
favouriteRouter.delete(
  "/",
  authMiddleware,
  FavouriteController.removeFavourite,
);

export default favouriteRouter;
