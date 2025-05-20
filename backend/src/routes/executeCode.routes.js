import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";
const executeCodeRouter = express.Router();

executeCodeRouter.route("/").post(verifyJwt, executeCode);

export default executeCodeRouter;
