import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AuthRequest } from "../interfaces/authRequest.interface.js";
import { JwtPayload } from "../interfaces/jwtPayload.interface.js";

export const optionalAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token!, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
  }
  next();
};
