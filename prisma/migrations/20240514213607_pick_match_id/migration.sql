-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_matchId_fkey";

-- AlterTable
ALTER TABLE "Pick" ALTER COLUMN "matchId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("matchID") ON DELETE RESTRICT ON UPDATE CASCADE;
