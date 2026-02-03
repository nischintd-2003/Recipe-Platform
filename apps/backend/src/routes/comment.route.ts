import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CommentController } from "../controllers/comment.controller.js";

const commentRouter: Router = Router({ mergeParams: true });

commentRouter.post("/", authMiddleware, CommentController.addComment);
commentRouter.get("/", CommentController.getComments);

export default commentRouter;
