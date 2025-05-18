import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/log-in").post(login);
authRouter.route("/log-out").post(verifyJwt, logout);

export default authRouter;
