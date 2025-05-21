import { db } from "../libs/db.js";
import { ApiError } from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import { asyncHandler } from "../utils/async.handler.js";

export const getAllSubmission = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const submission = await db.submission.findMany({
    where: {
      userId: userId,
    },
  });

  if (!submission) {
    throw new ApiError(404, "Submissions not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, submission, "Submission fetched successfully"));
});

export const getSubmissionForProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user.id;

  const submission = await db.submission.findMany({
    where: {
      userId: userId,
      problemId: problemId,
    },
  });

  if (!submission) {
    throw new ApiError(404, "Submissions not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, submission, "Submission fetched successfully"));
});

export const getAllSubmissionForProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;

  const submissionCount = await db.submission.count({
    where: {
      problemId: problemId,
    },
  });

  if (!submissionCount) {
    throw new ApiError(404, "Error reading submission count not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { submissionCount }, "Submission count successfully")
    );
});
