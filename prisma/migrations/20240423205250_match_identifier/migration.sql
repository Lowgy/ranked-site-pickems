/*
  Warnings:

  - A unique constraint covering the columns `[matchId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Match_id_key";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "matchId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchId_key" ON "Match"("matchId");
