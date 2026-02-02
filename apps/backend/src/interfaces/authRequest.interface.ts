import { Request } from "express";
import { JwtPayload } from "./jwtpayload.interface.js";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
