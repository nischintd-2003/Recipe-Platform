import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { CommentService } from "../service/comment.service.js";

export class CommentController {
  static async addComment(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = req.user!.userId;
    const { content } = req.body;

    const comment = await CommentService.addComment(recipeId, userId, content);

    res.status(201).json(comment);
  }
  static async getComments(req: Request, res: Response) {
    const recipeId = Number(req.params.recipeId);

    const comments = await CommentService.getComments(recipeId);

    res.status(200).json(comments);
  }
  static async updateComment(req: AuthRequest, res: Response) {
    const { recipeId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user!.userId;

    const updated = await CommentService.updateComment(
      Number(recipeId),
      Number(commentId),
      userId,
      content,
    );

    res.status(200).json(updated);
  }
}
