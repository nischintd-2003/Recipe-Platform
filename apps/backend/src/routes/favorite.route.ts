import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { FavoriteController } from "../controllers/favorite.controller.js";

const favoriteRouter: Router = Router({ mergeParams: true });

favoriteRouter.post("/", authMiddleware, FavoriteController.addFavorite);

export default favoriteRouter;
