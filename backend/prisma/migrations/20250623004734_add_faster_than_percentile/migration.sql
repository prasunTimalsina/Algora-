/*
  Warnings:

  - You are about to drop the column `avgMemory` on the `ProblemSolved` table. All the data in the column will be lost.
  - You are about to drop the column `avgTime` on the `ProblemSolved` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProblemSolved" DROP COLUMN "avgMemory",
DROP COLUMN "avgTime";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "fasterThanPercentile" DOUBLE PRECISION;
