/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Match_matchId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");
