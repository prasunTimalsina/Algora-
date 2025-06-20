/*
  Warnings:

  - You are about to drop the column `avgMemoryKb` on the `UserStats` table. All the data in the column will be lost.
  - You are about to drop the column `avgTimeMs` on the `UserStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "avgMemory" DOUBLE PRECISION,
ADD COLUMN     "avgTime" DOUBLE PRECISION,
ADD COLUMN     "totalAccepted" INTEGER;

-- AlterTable
ALTER TABLE "ProblemSolved" ADD COLUMN     "avgMemory" DOUBLE PRECISION,
ADD COLUMN     "avgTime" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UserStats" DROP COLUMN "avgMemoryKb",
DROP COLUMN "avgTimeMs";
