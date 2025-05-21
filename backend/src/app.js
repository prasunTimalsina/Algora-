import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

////Routes
import problemRoutes from "./routes/problem.routes.js";
import authRoutes from "./routes/auth.routes.js";
import executeCodeRoutes from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

const router = express.Router();
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executeCodeRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
export default app;
