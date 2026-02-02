import express, { Application } from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", (_, res) => {
  res.json({ status: "ok" });
});

app.use(errorMiddleware);
export default app;
