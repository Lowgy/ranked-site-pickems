/*
  Warnings:

  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Details" DROP CONSTRAINT "Details_userId_fkey";

-- DropTable
DROP TABLE "Details";

-- CreateTable
CREATE TABLE "UserDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "broadcaster_type" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "twitch_id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "offline_image_url" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userId_key" ON "UserDetail"("userId");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
