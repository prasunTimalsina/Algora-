import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  getAllSubmission,
  getSubmissionForProblem,
  getAllSubmissionForProblem,
} from "../controllers/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Submission route working",
  });
});

submissionRouter.route("/get-all-submission").get(verifyJwt, getAllSubmission);

submissionRouter
  .route("/get-submission-for-problem/:problemId")
  .get(verifyJwt, getSubmissionForProblem);

submissionRouter
  .route("/get-submission-count/:problemId")
  .get(verifyJwt, getAllSubmissionForProblem);

export default submissionRouter;
