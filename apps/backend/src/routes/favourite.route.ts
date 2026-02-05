import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { FavouriteController } from "../controllers/favourite.controller.js";

const favouriteRouter: Router = Router({ mergeParams: true });

favouriteRouter.post("/", authMiddleware, FavouriteController.addFavourite);
favouriteRouter.get("/", authMiddleware, FavouriteController.getUserFavourites);
favouriteRouter.delete(
  "/",
  authMiddleware,
  FavouriteController.removeFavourite,
);

export default favouriteRouter;
