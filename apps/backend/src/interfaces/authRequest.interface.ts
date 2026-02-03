import { Request } from "express";
import { JwtPayload } from "./jwtPayload.interface.js";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
