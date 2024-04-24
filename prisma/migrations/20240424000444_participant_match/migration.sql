/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchToParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_matchId_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToParticipant" DROP CONSTRAINT "_MatchToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToParticipant" DROP CONSTRAINT "_MatchToParticipant_B_fkey";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "Participant";

-- DropTable
DROP TABLE "_MatchToParticipant";

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "seedNumber" INTEGER NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantMatch" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "ParticipantMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "matchID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "nextMatchId" INTEGER,
    "startTime" INTEGER,
    "state" "MatchState",
    "winner" TEXT,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_name_key" ON "participants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "matches_matchID_key" ON "matches"("matchID");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatch" ADD CONSTRAINT "ParticipantMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatch" ADD CONSTRAINT "ParticipantMatch_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
