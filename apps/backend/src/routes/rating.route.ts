import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { RatingController } from "../controllers/rating.controller.js";

const ratingRouter: Router = Router({ mergeParams: true });

/**
 * @swagger
 * /recipe/{recipeId}/rate:
 *   post:
 *     summary: Rate a recipe
 *     tags: [Rating]
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
 *             required: [value]
 *             properties:
 *               value:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Rating submitted
 *       400:
 *         description: Invalid rating value
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
ratingRouter.post("/", authMiddleware, RatingController.rateRecipe);

export default ratingRouter;
