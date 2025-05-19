import express from "express";

import { isAdmin, verifyJwt } from "../middleware/auth.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblem,
  getProblemById,
  updateProblem,
} from "../controllers/problem.controller.js";
const problemRouter = express.Router();

problemRouter.route("/create-problem").post(verifyJwt, isAdmin, createProblem);
problemRouter.route("/get-all-problem").get(verifyJwt, getAllProblem);
problemRouter.route("/get-problem/:problemId").get(verifyJwt, getProblemById);
problemRouter
  .route("/delete-problem/:problemId")
  .delete(verifyJwt, isAdmin, deleteProblem);
problemRouter.route("/update-problem/:problemId").put(verifyJwt, isAdmin,updateProblem);
export default problemRouter;
