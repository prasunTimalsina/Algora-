import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import problemRouter from "./routes/problem.routes.js";
import authRouter from "./routes/auth.routes.js";
const router = express.Router();
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);

export default app;
