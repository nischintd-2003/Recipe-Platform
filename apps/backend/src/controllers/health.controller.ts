import { Request, Response} from "express";
import { AppDataSource } from "../config/datasource.js";
import quicker from "../utils/quicker.js";

export class HealthController {
  static async getHealth(req: Request, res: Response) {
    try {
      // Check Database Connection
      if (!AppDataSource.isInitialized) {
        res.status(503).json({
          status: "error",
          message: "Database not initialized",
          timestamp: new Date(),
        });
        return;
      }

      // Gather System Metrics
      const systemHealth = quicker.getSystemHealth();
      const appHealth = quicker.getApplicationHealth();

      res.status(200).json({
        status: "ok",
        message: "Health check passed",
        timestamp: new Date(),
        data: {
          system: systemHealth,
          application: appHealth,
        },
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        message: "Service Unavailable",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date(),
      });
    }
  }
}
