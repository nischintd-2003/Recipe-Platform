import { Response} from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { CommentService } from "../service/comment.service.js";

export class CommentController {
  static async addComment(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.id);
    const userId = req.user!.userId;
    const { content } = req.body;

    const comment = await CommentService.addComment(recipeId, userId, content);

    res.status(201).json(comment);
  }
}
