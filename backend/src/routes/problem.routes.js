import express from "express";

import { isAdmin, verifyJwt } from "../middleware/auth.middleware.js";
import { createProblem } from "../controllers/problem.controller.js";
const problemRouter = express.Router();

problemRouter.route("/create-problem").post(verifyJwt, isAdmin, createProblem);

export default problemRouter;
