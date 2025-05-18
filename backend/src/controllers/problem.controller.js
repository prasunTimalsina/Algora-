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
  console.log(Object.entries(referenceSolutions));
  for (const [language, code] of Object.entries(referenceSolutions)) {
    console.log(language, code);
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
