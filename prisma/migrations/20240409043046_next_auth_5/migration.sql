-- CreateEnum
CREATE TYPE "MatchState" AS ENUM ('DONE', 'SCHEDULED', 'ACTIVE');

-- CreateTable
CREATE TABLE "Pick" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "Pick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "seedNumber" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nextMatchId" INTEGER,
    "startTime" TIMESTAMP(3),
    "state" "MatchState" NOT NULL,
    "winner" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pick_matchId_key" ON "Pick"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchToParticipant_AB_unique" ON "_MatchToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchToParticipant_B_index" ON "_MatchToParticipant"("B");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToParticipant" ADD CONSTRAINT "_MatchToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToParticipant" ADD CONSTRAINT "_MatchToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
