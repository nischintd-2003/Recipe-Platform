import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { RatingController } from "../controllers/rating.controller.js";

const ratingRouter: Router = Router({mergeParams:true});

ratingRouter.post("/", authMiddleware, RatingController.rateRecipe);

export default ratingRouter;
