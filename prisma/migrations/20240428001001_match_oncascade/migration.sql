-- DropForeignKey
ALTER TABLE "ParticipantMatch" DROP CONSTRAINT "ParticipantMatch_matchId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantMatch" DROP CONSTRAINT "ParticipantMatch_participantId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipantMatch" ADD CONSTRAINT "ParticipantMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatch" ADD CONSTRAINT "ParticipantMatch_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
