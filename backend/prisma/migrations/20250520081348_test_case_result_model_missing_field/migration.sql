/*
  Warnings:

  - Added the required column `passed` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCaseResult" ADD COLUMN     "passed" BOOLEAN NOT NULL;
