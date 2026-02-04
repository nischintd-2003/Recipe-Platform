import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { FavouriteService } from "../service/favorite.service.js";

export class FavouriteController {
  static async addFavourite(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = req.user!.userId;

    const favourite = await FavouriteService.addFavourite(recipeId, userId);
    res.status(201).json(favourite);
  }

  static async getUserFavourites(req: AuthRequest, res: Response) {
    const userId = req.user!.userId;

    const favourites = await FavouriteService.getUserFavourites(userId);
    res.status(200).json(favourites);
  }

  static async removeFavourite(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = req.user!.userId;

    await FavouriteService.removeFavourite(recipeId, userId);
    res.status(204).send();
  }
}
