import express, { Application } from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import router from "./routes/routes.js";

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);
export default app;
