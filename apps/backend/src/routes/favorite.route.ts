import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { FavoriteController } from "../controllers/favorite.controller.js";

const favoriteRouter: Router = Router({ mergeParams: true });

favoriteRouter.post("/", authMiddleware, FavoriteController.addFavorite);
favoriteRouter.get("/", authMiddleware, FavoriteController.getUserFavorites);

export default favoriteRouter;
