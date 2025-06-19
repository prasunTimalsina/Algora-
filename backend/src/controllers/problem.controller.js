import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import {
  submitBatch,
  getJudge0LanguageId,
  pollBatchResults,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api.response.js";

export const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  for (const [language, code] of Object.entries(referenceSolutions)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      throw new ApiError(400, "Language not supported");
    }

    const submissions = testcases.map(({ input, output }) => ({
      source_code: code,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResults = await submitBatch(submissions);

    const tokens = submissionResults.map((res) => res.token);

    const results = await pollBatchResults(tokens);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      console.log("Result____", result);

      if (result.status.id !== 3) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              `Test ${i + 1} cases failed for language ${language} `
            )
          );
      }
    }
  }

  const newProblem = await db.problem.create({
    data: {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
      userId: req.user.id,
    },
  });

  if (!newProblem) {
    throw new ApiError(400, "Problem not  created : Error creating problem");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newProblem, "Problem created successfully"));
});

export const getAllProblem = asyncHandler(async (req, res) => {
  /*  const problems = await db.problem.findMany(); */

  //get queries
  const {
    page = 1,
    limit = 2,
    tags,
    difficulty,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;
  const where = {};

  //Coverting values
  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);
  const skip = (pageNumber - 1) * pageSize;

  //filtering tags
  if (tags) {
    const tagsArr = tags.split(",").map((t) => t.trim());
    where["tags"] = {
      hasSome: tagsArr,
    };
  }

  //filtering over difficulties
  if (difficulty) {
    where["difficulty"] = difficulty;
  }

  const problems = await db.problem.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: {
      [sortBy]: order,
    },
  });

  if (!problems) {
    throw new ApiError(400, "Error fetching Problems");
  }

  res
    .status(200)
    .json(new ApiResponse(200, problems, "Problems Fetched successfully"));
});

export const getProblemById = asyncHandler(async (req, res) => {
  const { problemId } = req.params;

  const problem = await db.problem.findUnique({
    where: {
      id: problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, problem, "Fetched Problem sucessfully"));
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;

  const problem = await db.problem.delete({
    where: {
      id: problemId,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  res.status(200).json(new ApiResponse(204, null, "Problem deleted"));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  let { testcases } = req.body;

  if (testcases || referenceSolutions) {
    if (!testcases) {
      const problem = await db.problem.findUnique({ where: { id: problemId } });
      testcases = problem.testcases;
    }

    for (const [language, code] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new ApiError(400, "Language not supported");
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: code,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result____", result);

        if (result.status.id !== 3) {
          return res
            .status(400)
            .json(
              new ApiError(
                400,
                `Test ${i + 1} cases failed for language ${language} `
              )
            );
        }
      }
    }
  }

  const problem = await db.problem.update({
    where: {
      id: problemId,
    },
    data: {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem updated successfully"));
});

export const getAllProblemSolvedByUser = asyncHandler(async (req, res) => {});
