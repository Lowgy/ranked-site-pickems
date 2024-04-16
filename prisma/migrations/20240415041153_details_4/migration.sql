/*
  Warnings:

  - You are about to drop the `UserDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "broadcaster_type" TEXT,
ADD COLUMN     "created_at" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "display_name" TEXT,
ADD COLUMN     "login" TEXT,
ADD COLUMN     "offline_image_url" TEXT,
ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "twitch_id" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "view_count" INTEGER;

-- DropTable
DROP TABLE "UserDetail";
