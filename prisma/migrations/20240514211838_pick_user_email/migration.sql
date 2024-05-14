/*
  Warnings:

  - You are about to drop the column `userId` on the `Pick` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Pick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_userId_fkey";

-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
