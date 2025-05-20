import { all } from "axios";
import { db } from "../libs/db.js";
import {
  submitBatch,
  pollBatchResults,
  getLanguageName,
} from "../libs/judge0.lib.js";
import { ApiError } from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import { asyncHandler } from "../utils/async.handler.js";

export const executeCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;

  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    throw new ApiError(400, "Invalid or Missing test cases");
  }

  const submissions = stdin.map((input) => {
    return {
      source_code,
      language_id,
      stdin: input,
    };
  });

  const submitResponse = await submitBatch(submissions);
  const tokens = submitResponse.map((res) => res.token);

  const results = await pollBatchResults(tokens);

  console.log("Results--------------", results);

  let allPassed = true;
  const detailResults = results.map((result, index) => {
    const stdout = result.stdout?.trim();
    const expected_output = expected_outputs[index]?.trim();
    const passed = stdout === expected_output;
    if (!passed) {
      allPassed = false;
    }

    return {
      testCase: index + 1,
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      status: result.status.description,
      compileOutput: result.compile_output || null,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  const submission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailResults.map((result) => result.stdout)),
      stderr: detailResults.some((result) => result.stderr)
        ? JSON.stringify(detailResults.map((result) => result.stderr))
        : null,
      compileOutput: detailResults.some((result) => result.compileOutput)
        ? JSON.stringify(detailResults.map((result) => result.compileOutput))
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailResults.some((result) => result.memory)
        ? JSON.stringify(detailResults.map((result) => result.memory))
        : null,
      time: detailResults.some((result) => result.time)
        ? JSON.stringify(detailResults.map((result) => result.time))
        : null,
    },
  });

  if (!submission) {
    throw new ApiError(400, "Failed to submit your progra");
  }

  // If all passed = true mark problem as solved for the user
  if (allPassed) {
    await db.problemSolved.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }

  const testCaseResults = detailResults.map((result) => {
    return {
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compileOutput,
      status: result.status,
      memory: result.memory,
      time: result.time,
    };
  });

  await db.testCaseResult.createMany({
    data: testCaseResults,
  });

  const submissionWithTestCases = await db.submission.findUnique({
    where: {
      id: submission.id,
    },
    include: {
      testCases: true,
    },
  });

  if (!submissionWithTestCases) {
    throw new ApiError(400, "Failed to fetch the submission with test cases");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        submissionWithTestCases,
        "Code executed successfully"
      )
    );
});
