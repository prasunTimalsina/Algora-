import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { runCode, submitCode } from "../controllers/executeCode.controller.js";
const executeCodeRouter = express.Router();

executeCodeRouter.route("/").post(verifyJwt, runCode);
executeCodeRouter.route("/submit-code").post(verifyJwt, submitCode);

export default executeCodeRouter;
