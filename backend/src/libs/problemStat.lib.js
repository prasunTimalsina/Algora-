import { ApiError } from "../utils/api.error.js";
import { db } from "../libs/db.js";
// used to update the avg time and avg memory of a problem
//using transaction to avoid race condition (if two user solve at same time)
const updateProblemStat = async (problemId, time, memory) => {
  return await db.$transaction(async (prisma) => {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      throw new ApiError(404, "Problem not found");
    }

    const submissionCount = await prisma.submission.count({
      where: {
        problemId,
        status: "Accepted",
      },
    });

    if (submissionCount === 0) {
      // Technically, this should never happen if this is being called after a successful submission.
      throw new ApiError(400, "No accepted submissions found");
    }

    const newAvgTime =
      //edge case for first submission
      submissionCount === 1
        ? time
        : (problem.avgTime * (submissionCount - 1) + time) / submissionCount;

    //calculate greater than percentile count

    const newAvgMemory =
      submissionCount === 1
        ? memory
        : (problem.avgMemory * (submissionCount - 1) + memory) /
          submissionCount;

    return await prisma.problem.update({
      where: { id: problemId },
      data: {
        avgTime: newAvgTime,
        avgMemory: newAvgMemory,
      },
    });
  });
};

const calculatePercentile = (submissionTimes, yourTime) => {
  if (submissionTimes.length === 0) return 100;

  const slowerUsers = submissionTimes.filter((t) => t > yourTime).length;

  const percentile = (slowerUsers / submissionTimes.length) * 100;
  return parseFloat(percentile.toFixed(2));
};

export { updateProblemStat, calculatePercentile };
