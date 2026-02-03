import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CommentController } from "../controllers/comment.controller.js";

const commentRouter: Router = Router({ mergeParams: true });

commentRouter.post("/", authMiddleware, CommentController.addComment);

export default commentRouter;
