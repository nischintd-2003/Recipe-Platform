import "reflect-metadata";
import { env } from "./config/env.js";
import app from "./app.js";
import { AppDataSource } from "./config/datasource.js";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection was successful");
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

startServer();
