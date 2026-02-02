import { env } from "../config/env.js";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { AppError } from "../utils/app.error.js";
import { JwtPayload } from "../interfaces/jwtpayload.interface.js";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, env.JWT_SECRET) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
