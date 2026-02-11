import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: "fail",
          message: "Validation failed",
          errors: error.issues.map((e) => ({
            field: e.path[1],
            message: e.message,
          })),
        });
      }
      return next(error);
    }
  };
