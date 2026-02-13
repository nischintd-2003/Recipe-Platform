import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CommentController } from "../controllers/comment.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { commentParamsSchema, commentSchema } from "../validation/recipe.validation.js";

const commentRouter: Router = Router({ mergeParams: true });

/**
 * @swagger
 * /recipe/{recipeId}/comment:
 *   post:
 *     summary: Add a comment to a recipe
 *     tags: [Comment]
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
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
commentRouter.post(
  "/",
  authMiddleware,
  validate(commentSchema),
  CommentController.addComment,
);

/**
 * @swagger
 * /recipe/{recipeId}/comment:
 *   get:
 *     summary: Get all comments for a recipe
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Recipe not found
 */
commentRouter.get("/", CommentController.getComments);

/**
 * @swagger
 * /recipe/{recipeId}/comment/{commentId}:
 *   patch:
 *     summary: Update a comment on a recipe
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to update this comment
 *       404:
 *         description: Comment or recipe not found
 */
commentRouter.patch(
  "/:commentId",
  authMiddleware,
  validate(commentSchema),
  validate(commentParamsSchema),
  CommentController.updateComment,
);

/**
 * @swagger
 * /recipe/{recipeId}/comment/{commentId}:
 *   delete:
 *     summary: Delete a comment from a recipe
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to delete this comment
 *       404:
 *         description: Comment or recipe not found
 */
commentRouter.delete(
  "/:commentId",
  authMiddleware,
  validate(commentParamsSchema),
  CommentController.deleteComment,
);

export default commentRouter;
