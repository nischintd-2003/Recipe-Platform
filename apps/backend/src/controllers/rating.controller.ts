import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { RatingService } from "../service/rating.service.js";

export class RatingController {
  static async rateRecipe(req: AuthRequest, res: Response) {
    const recipeId = Number(req.params.id);
    const userId = req.user!.userId;
    const { value } = req.body;

    const rating = await RatingService.rateRecipe(recipeId, userId, value);

    res.status(201).json(rating);
  }
}
