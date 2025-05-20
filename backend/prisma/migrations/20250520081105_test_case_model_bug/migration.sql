/*
  Warnings:

  - You are about to drop the column `testCaseId` on the `TestCaseResult` table. All the data in the column will be lost.
  - Added the required column `testCase` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "testCaseId",
ADD COLUMN     "testCase" INTEGER NOT NULL;
