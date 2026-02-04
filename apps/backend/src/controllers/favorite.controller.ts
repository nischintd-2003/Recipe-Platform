import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { FavoriteService } from "../service/favorite.service.js";

export class FavoriteController {
  static async addFavorite(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.recipeId);
    const userId = req.user!.userId;

    const favorite = await FavoriteService.addFavorite(recipeId, userId);
    res.status(201).json(favorite);
  }

  static async getUserFavorites(req: AuthRequest, res: Response) {
    const userId = req.user!.userId;

    const favorites = await FavoriteService.getUserFavorites(userId);
    res.status(200).json(favorites);
  }
}
